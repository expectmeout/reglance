"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

// This component renders absolutely nothing on server and only shows date on client
export function ClientDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string>("");
  
  useEffect(() => {
    setMounted(true);
    
    try {
      const normalizedDateString = dateString.includes('T') 
        ? dateString 
        : `${dateString}T00:00:00Z`;
        
      const date = new Date(normalizedDateString);
      
      if (isNaN(date.getTime())) {
        setFormattedDate("Invalid date");
      } else {
        setFormattedDate(format(date, 'MMM d, yyyy'));
      }
    } catch (error) {
      setFormattedDate("Error");
    }
  }, [dateString]);
  
  // During SSR or before hydration, render nothing (not even a placeholder)
  if (!mounted) {
    return null;
  }
  
  // After client-side hydration, show the date
  return <span>{formattedDate}</span>;
}