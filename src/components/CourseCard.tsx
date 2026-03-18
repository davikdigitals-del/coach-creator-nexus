import { Star, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  image: string;
  title: string;
  instructor: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  duration: string;
  lectures: number;
  isFree?: boolean;
}

const CourseCard = ({
  image,
  title,
  instructor,
  category,
  price,
  originalPrice,
  rating,
  duration,
  lectures,
  isFree,
}: CourseCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-150 group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {instructor.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{instructor}</span>
          </div>
          <span className="badge-category">{category}</span>
        </div>

        <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {lectures} Lectures
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          {isFree ? (
            <span className="text-secondary font-bold text-lg">Free</span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-muted-foreground text-sm line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-foreground">{rating}</span>
            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
