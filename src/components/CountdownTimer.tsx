
import React, { useState, useEffect } from "react";
import { useTimerStore } from "@/stores/timerStore";
import { Atom, Radiation } from "lucide-react";

const CountdownTimer = () => {
  const { timeRemaining, isRunning, setTimeRemaining } = useTimerStore();
  const [displayTime, setDisplayTime] = useState({ hours: 0, minutes: 0, seconds: 0, centiseconds: 0 });

  useEffect(() => {
    // Définir le temps restant jusqu'à 17h00
    const setTimeUntil5PM = () => {
      const now = new Date();
      const target = new Date(now);
      target.setHours(17, 0, 0, 0);
      
      // Si on est déjà passé 17h, on vise le lendemain
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      setTimeRemaining(diff);
    };

    setTimeUntil5PM();
  }, [setTimeRemaining]);

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return Math.max(0, prev - 10);
        });
      }, 10);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, setTimeRemaining]);

  useEffect(() => {
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((timeRemaining % 1000) / 10);
    
    setDisplayTime({ hours, minutes, seconds, centiseconds });
  }, [timeRemaining]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="w-full bg-black/80 py-4 border-y border-gray-700 relative">
      <div className="flex items-center justify-center">
        <Radiation className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mr-4 ${isRunning ? 'text-red-500 animate-pulse' : 'text-green-500'}`} strokeWidth={1.5} />
        
        <div className={`text-6xl md:text-7xl lg:text-8xl text-center lcd-display ${isRunning ? 'text-red-500' : 'text-green-500'}`}>
          <span>{formatTime(displayTime.hours)}</span>
          <span className="animate-blink">:</span>
          <span>{formatTime(displayTime.minutes)}</span>
          <span className="animate-blink">:</span>
          <span>{formatTime(displayTime.seconds)}</span>
          <span className="animate-blink">.</span>
          <span>{formatTime(displayTime.centiseconds)}</span>
        </div>
        
        <Atom className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 ml-4 ${isRunning ? 'text-red-500 animate-pulse' : 'text-green-500'}`} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default CountdownTimer;
