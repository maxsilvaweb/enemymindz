import { Calendar } from "@/components/calendar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Event Calendar</h1>
        <Link 
          href="/book" 
          className={cn(
            buttonVariants({ variant: "default" }),
            "font-semibold"
          )}
        >
          Book an Event
        </Link>
      </div>
      <Calendar />
    </div>
  );
}