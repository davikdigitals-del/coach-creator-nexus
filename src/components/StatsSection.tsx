import { Users, BookOpen, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "25K+", label: "Active Learners" },
  { icon: BookOpen, value: "1,235", label: "Total Courses" },
  { icon: Award, value: "580+", label: "Expert Coaches" },
  { icon: Globe, value: "120+", label: "Countries" },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-primary-foreground">
              <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
              <p className="font-display text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
