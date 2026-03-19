
-- =============================================
-- COURSEVIA DATABASE SCHEMA
-- =============================================

-- ENUMS
CREATE TYPE public.app_role AS ENUM ('learner', 'coach', 'creator', 'admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'approved', 'rejected', 'resubmit');
CREATE TYPE public.booking_status AS ENUM ('pending', 'paid', 'confirmed', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.payment_type AS ENUM ('course', 'video', 'subscription', 'booking');
CREATE TYPE public.transaction_type AS ENUM ('credit', 'debit', 'commission', 'withdrawal', 'refund');
CREATE TYPE public.content_type AS ENUM ('course', 'video');
CREATE TYPE public.subscription_plan AS ENUM ('free', 'premium');
CREATE TYPE public.withdrawal_status AS ENUM ('pending', 'approved', 'rejected', 'completed');
CREATE TYPE public.owner_role AS ENUM ('creator', 'coach', 'admin');

-- TIMESTAMP TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 1. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  country TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  is_suspended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 4. COURSES
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  thumbnail_url TEXT,
  preview_video_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  category_id UUID REFERENCES public.categories(id),
  level TEXT DEFAULT 'beginner',
  language TEXT DEFAULT 'English',
  is_published BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  enrollment_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 5. COURSE SECTIONS
CREATE TABLE public.course_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;

-- 6. COURSE LESSONS
CREATE TABLE public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

-- 7. VIDEOS
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner_role owner_role NOT NULL DEFAULT 'creator',
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT TRUE,
  category_id UUID REFERENCES public.categories(id),
  is_published BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- 8. COACH PROFILES
CREATE TABLE public.coach_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  headline TEXT,
  intro_video_url TEXT,
  expertise TEXT[],
  languages TEXT[] DEFAULT ARRAY['English'],
  hourly_rate DECIMAL(10,2),
  country TEXT,
  timezone TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.coach_profiles ENABLE ROW LEVEL SECURITY;

-- 9. COACH SERVICES
CREATE TABLE public.coach_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coach_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.coach_services ENABLE ROW LEVEL SECURITY;

-- 10. COACH AVAILABILITY
CREATE TABLE public.coach_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.coach_profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
ALTER TABLE public.coach_availability ENABLE ROW LEVEL SECURITY;

-- 11. VERIFICATION REQUESTS
CREATE TABLE public.verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  status verification_status DEFAULT 'pending',
  country TEXT,
  id_document_url TEXT,
  selfie_url TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  business_name TEXT,
  business_document_url TEXT,
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- 12. BOOKINGS
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES auth.users(id),
  coach_id UUID NOT NULL REFERENCES auth.users(id),
  service_id UUID REFERENCES public.coach_services(id),
  status booking_status DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  price DECIMAL(10,2) NOT NULL,
  meeting_url TEXT,
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 13. PAYMENTS
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  payment_type payment_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2) DEFAULT 0,
  status payment_status DEFAULT 'pending',
  reference_id UUID,
  payment_method TEXT DEFAULT 'manual',
  receipt_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 14. TRANSACTIONS
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  payment_id UUID REFERENCES public.payments(id),
  transaction_type transaction_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 15. WALLETS
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(10,2) DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  total_withdrawn DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- 16. WALLET LEDGER
CREATE TABLE public.wallet_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  transaction_type transaction_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.wallet_ledger ENABLE ROW LEVEL SECURITY;

-- 17. WITHDRAWAL REQUESTS
CREATE TABLE public.withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id),
  amount DECIMAL(10,2) NOT NULL,
  status withdrawal_status DEFAULT 'pending',
  bank_details JSONB,
  admin_notes TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- 18. SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan subscription_plan DEFAULT 'free',
  is_active BOOLEAN DEFAULT TRUE,
  starts_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 19. CONTENT ACCESS
CREATE TABLE public.content_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type content_type NOT NULL,
  content_id UUID NOT NULL,
  granted_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);
ALTER TABLE public.content_access ENABLE ROW LEVEL SECURITY;

-- 20. ENROLLMENTS
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  progress_percent DECIMAL(5,2) DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- 21. COURSE PROGRESS
CREATE TABLE public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  last_position_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- 22. VIDEO PROGRESS
CREATE TABLE public.video_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  last_position_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, video_id)
);
ALTER TABLE public.video_progress ENABLE ROW LEVEL SECURITY;

-- 23. WISHLISTS
CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type content_type NOT NULL,
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 24. REVIEWS
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 25. MESSAGES
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  receiver_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  is_blocked BOOLEAN DEFAULT FALSE,
  block_reason TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 26. NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 27. REPORTS
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id),
  reported_user_id UUID REFERENCES auth.users(id),
  content_type TEXT,
  content_id UUID,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 28. ADMIN LOGS
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- TRIGGERS
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coach_profiles_updated_at BEFORE UPDATE ON public.coach_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_verification_requests_updated_at BEFORE UPDATE ON public.verification_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- AUTO-CREATE PROFILE + WALLET ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  INSERT INTO public.wallets (user_id) VALUES (NEW.id);
  INSERT INTO public.subscriptions (user_id, plan) VALUES (NEW.id, 'free');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- RLS POLICIES

-- PROFILES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- USER ROLES
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- CATEGORIES
CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- COURSES
CREATE POLICY "Published courses are public" ON public.courses FOR SELECT USING (is_published = true OR auth.uid() = creator_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Creators can insert courses" ON public.courses FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update own courses" ON public.courses FOR UPDATE TO authenticated USING (auth.uid() = creator_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete courses" ON public.courses FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- COURSE SECTIONS
CREATE POLICY "Sections viewable" ON public.course_sections FOR SELECT USING (true);
CREATE POLICY "Creators manage sections" ON public.course_sections FOR ALL TO authenticated USING (EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND creator_id = auth.uid()));

-- COURSE LESSONS
CREATE POLICY "Lessons viewable" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Creators manage lessons" ON public.course_lessons FOR ALL TO authenticated USING (EXISTS(SELECT 1 FROM public.courses WHERE id = course_id AND creator_id = auth.uid()));

-- VIDEOS
CREATE POLICY "Published videos are public" ON public.videos FOR SELECT USING (is_published = true OR auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Owners can insert videos" ON public.videos FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own videos" ON public.videos FOR UPDATE TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete videos" ON public.videos FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- COACH PROFILES
CREATE POLICY "Coach profiles are public" ON public.coach_profiles FOR SELECT USING (true);
CREATE POLICY "Coaches insert own profile" ON public.coach_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Coaches update own profile" ON public.coach_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- COACH SERVICES
CREATE POLICY "Coach services are public" ON public.coach_services FOR SELECT USING (true);
CREATE POLICY "Coaches manage services" ON public.coach_services FOR ALL TO authenticated USING (EXISTS(SELECT 1 FROM public.coach_profiles WHERE id = coach_id AND user_id = auth.uid()));

-- COACH AVAILABILITY
CREATE POLICY "Coach availability is public" ON public.coach_availability FOR SELECT USING (true);
CREATE POLICY "Coaches manage availability" ON public.coach_availability FOR ALL TO authenticated USING (EXISTS(SELECT 1 FROM public.coach_profiles WHERE id = coach_id AND user_id = auth.uid()));

-- VERIFICATION REQUESTS
CREATE POLICY "Users view own verification" ON public.verification_requests FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users submit verification" ON public.verification_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update verification" ON public.verification_requests FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- BOOKINGS
CREATE POLICY "View own bookings" ON public.bookings FOR SELECT TO authenticated USING (auth.uid() = learner_id OR auth.uid() = coach_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Learners create bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = learner_id);
CREATE POLICY "Update bookings" ON public.bookings FOR UPDATE TO authenticated USING (auth.uid() = learner_id OR auth.uid() = coach_id OR public.has_role(auth.uid(), 'admin'));

-- PAYMENTS
CREATE POLICY "View own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Create payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin update payments" ON public.payments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- TRANSACTIONS
CREATE POLICY "View own transactions" ON public.transactions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Insert transactions" ON public.transactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- WALLETS
CREATE POLICY "View own wallet" ON public.wallets FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Update wallet" ON public.wallets FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Insert wallet" ON public.wallets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- WALLET LEDGER
CREATE POLICY "View own ledger" ON public.wallet_ledger FOR SELECT TO authenticated USING (EXISTS(SELECT 1 FROM public.wallets WHERE id = wallet_id AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Insert ledger" ON public.wallet_ledger FOR INSERT TO authenticated WITH CHECK (true);

-- WITHDRAWAL REQUESTS
CREATE POLICY "View own withdrawals" ON public.withdrawal_requests FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Request withdrawals" ON public.withdrawal_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin update withdrawals" ON public.withdrawal_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SUBSCRIPTIONS
CREATE POLICY "View own subscription" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Update own subscription" ON public.subscriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Insert subscription" ON public.subscriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- CONTENT ACCESS
CREATE POLICY "View own access" ON public.content_access FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Grant access" ON public.content_access FOR INSERT TO authenticated WITH CHECK (true);

-- ENROLLMENTS
CREATE POLICY "View own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Enroll" ON public.enrollments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update enrollment" ON public.enrollments FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- COURSE PROGRESS
CREATE POLICY "View own course progress" ON public.course_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Track course progress" ON public.course_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update course progress" ON public.course_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- VIDEO PROGRESS
CREATE POLICY "View own video progress" ON public.video_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Track video progress" ON public.video_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update video progress" ON public.video_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- WISHLISTS
CREATE POLICY "View own wishlist" ON public.wishlists FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Add to wishlist" ON public.wishlists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Remove from wishlist" ON public.wishlists FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- REVIEWS
CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update own reviews" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin delete reviews" ON public.reviews FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- MESSAGES
CREATE POLICY "View own messages" ON public.messages FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = receiver_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Send messages" ON public.messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Update messages read" ON public.messages FOR UPDATE TO authenticated USING (auth.uid() = receiver_id);

-- NOTIFICATIONS
CREATE POLICY "View own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Create notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- REPORTS
CREATE POLICY "View own reports" ON public.reports FOR SELECT TO authenticated USING (auth.uid() = reporter_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Create reports" ON public.reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admin update reports" ON public.reports FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ADMIN LOGS
CREATE POLICY "Admin view logs" ON public.admin_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin create logs" ON public.admin_logs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- INDEXES
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_courses_creator_id ON public.courses(creator_id);
CREATE INDEX idx_courses_category_id ON public.courses(category_id);
CREATE INDEX idx_videos_owner_id ON public.videos(owner_id);
CREATE INDEX idx_bookings_learner_id ON public.bookings(learner_id);
CREATE INDEX idx_bookings_coach_id ON public.bookings(coach_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX idx_content_access_user_id ON public.content_access(user_id);

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('course-assets', 'course-assets', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('video-assets', 'video-assets', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('verification-docs', 'verification-docs', false);

-- Storage policies
CREATE POLICY "Avatar images are public" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Course assets are public" ON storage.objects FOR SELECT USING (bucket_id = 'course-assets');
CREATE POLICY "Creators can upload course assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'course-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Creators can update course assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'course-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Authenticated can view video assets" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'video-assets');
CREATE POLICY "Owners can upload video assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'video-assets' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own verification docs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can upload verification docs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'verification-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Seed categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Data Science', 'data-science', 'Learn data analysis, machine learning, and AI', '📊'),
  ('UX Design', 'ux-design', 'Master user experience and interface design', '🎨'),
  ('Leadership', 'leadership', 'Develop leadership and management skills', '👔'),
  ('Finance', 'finance', 'Financial planning, investing, and accounting', '💰'),
  ('Marketing', 'marketing', 'Digital marketing, SEO, and growth strategies', '📈'),
  ('Graphic Design', 'graphic-design', 'Visual design, branding, and creative tools', '🖌️'),
  ('Programming', 'programming', 'Web development, mobile apps, and software', '💻'),
  ('Business Strategy', 'business-strategy', 'Business planning and growth strategies', '🏢'),
  ('Communication', 'communication', 'Public speaking, writing, and networking', '🗣️'),
  ('Personal Development', 'personal-development', 'Productivity, mindset, and self-improvement', '🧠');
