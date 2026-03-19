
-- Fix overly permissive RLS policies
DROP POLICY "Grant access" ON public.content_access;
CREATE POLICY "Grant access" ON public.content_access FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Create notifications" ON public.notifications;
CREATE POLICY "Create notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Insert ledger" ON public.wallet_ledger;
CREATE POLICY "Insert ledger" ON public.wallet_ledger FOR INSERT TO authenticated WITH CHECK (EXISTS(SELECT 1 FROM public.wallets WHERE id = wallet_id AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
