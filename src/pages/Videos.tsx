import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Video, Star, Lock, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function Videos() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["public-videos"],
    queryFn: async () => {
      const { data } = await supabase
        .from("videos")
        .select("*, categories(name)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Business & Learning Videos</h1>
          <p className="text-muted-foreground mt-2">Premium video content for growth and learning</p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />)}
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {videos.map((video: any) => (
                <Link key={video.id} to={`/videos/${video.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      {video.thumbnail_url && <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                      {video.is_premium && !video.is_free && (
                        <span className="absolute top-2 right-2 badge-premium"><Lock className="h-3 w-3 mr-1" /> Premium</span>
                      )}
                      {video.is_free && <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">Free</span>}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{video.categories?.name || "General"}</p>
                      <h3 className="font-display font-semibold text-foreground mt-1 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">{Math.floor((video.duration_seconds || 0) / 60)} min</span>
                        <span className="font-bold text-foreground">{video.is_free ? "Free" : `$${video.price}`}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Video className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-display font-semibold text-foreground mt-4">No videos yet</h3>
              <p className="text-muted-foreground mt-1">Videos will appear here once they're published</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
