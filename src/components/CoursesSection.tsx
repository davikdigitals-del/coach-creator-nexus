import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import courseDataScience from "@/assets/course-data-science.jpg";
import courseUxDesign from "@/assets/course-ux-design.jpg";
import courseLeadership from "@/assets/course-leadership.jpg";
import courseFinance from "@/assets/course-finance.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseGraphicDesign from "@/assets/course-graphic-design.jpg";

const categories = [
  "All",
  "UI/UX Design",
  "Development",
  "Data Science",
  "Business",
  "Financial",
  "Marketing",
];

const courses = [
  {
    image: courseDataScience,
    title: "Data Science and Machine Learning with Python - Hands On!",
    instructor: "Jason Williams",
    category: "Science",
    price: 385.0,
    originalPrice: 440.0,
    rating: 4.9,
    duration: "08 hr 15 mins",
    lectures: 29,
  },
  {
    image: courseUxDesign,
    title: "Create Amazing Color Schemes for Your UX Design Projects",
    instructor: "Pamela Foster",
    category: "Science",
    price: 420.0,
    rating: 4.9,
    duration: "08 hr 15 mins",
    lectures: 29,
  },
  {
    image: courseLeadership,
    title: "Culture & Leadership: Strategies for a Successful Culture",
    instructor: "Rose Simmons",
    category: "Science",
    price: 295.0,
    originalPrice: 340.0,
    rating: 4.9,
    duration: "08 hr 15 mins",
    lectures: 29,
  },
  {
    image: courseFinance,
    title: "Finance Series: Learn to Budget and Calculate your Net Worth",
    instructor: "Jason Williams",
    category: "Finance",
    price: 0,
    rating: 4.9,
    duration: "08 hr 15 mins",
    lectures: 29,
    isFree: true,
  },
  {
    image: courseMarketing,
    title: "Build Brand Into Marketing: Tackling the New Marketing Landscape",
    instructor: "Jason Williams",
    category: "Marketing",
    price: 136.0,
    rating: 4.9,
    duration: "08 hr 15 mins",
    lectures: 29,
  },
  {
    image: courseGraphicDesign,
    title: "Graphic Design: Illustrating Badges and Icons with Geometric Shapes",
    instructor: "Jason Williams",
    category: "Design",
    price: 237.0,
    rating: 4.9,
    duration: "08 hr 16 mins",
    lectures: 29,
  },
];

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            All Courses of{" "}
            <span className="text-primary">SkillBridge</span>
          </h2>
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search your course"
              className="w-full bg-card border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-150"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-1.5 rounded-md">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors duration-150">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {cat}
            </button>
          ))}
          <button className="p-2 rounded-full border border-border hover:bg-muted transition-colors duration-150">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Other Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
