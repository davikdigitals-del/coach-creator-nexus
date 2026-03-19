import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Courses() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["public-courses"],
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("*, categories(name)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Explore Courses</h1>
          <p className="text-muted-foreground mt-2">Browse expert-led courses across all categories</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories?.map((cat: any) => (
              <span key={cat.id} className="badge-category cursor-pointer">{cat.icon} {cat.name}</span>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />)}
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {courses.map((course: any) => (
                <Link key={course.id} to={`/courses/${course.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      {course.thumbnail_url && <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />}
                      {course.is_free && <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">Free</span>}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{course.categories?.name || "General"}</p>
                      <h3 className="font-display font-semibold text-foreground mt-1 line-clamp-2">{course.title}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          <span className="text-foreground">{course.rating_avg || 0}</span>
                          <span className="text-muted-foreground">({course.enrollment_count})</span>
                        </div>
                        <span className="font-bold text-foreground">{course.is_free ? "Free" : `$${course.price}`}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-display font-semibold text-foreground mt-4">No courses yet</h3>
              <p className="text-muted-foreground mt-1">Courses will appear here once creators publish them</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
