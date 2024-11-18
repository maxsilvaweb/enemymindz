"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addDays, format } from "date-fns";

export function Calendar() {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4 col-span-full">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Select Date Range</h2>
        </div>
        <DatePickerWithRange date={date} setDate={setDate} />
      </Card>
      
      <ScrollArea className="col-span-full h-[600px] rounded-md border p-4">
        <div className="space-y-4">
          {/* Events will be mapped here */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-semibold">Sample Event</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(), "PPP")} at {format(new Date(), "p")}
              </p>
              <p className="text-sm">Location: Conference Room A</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}