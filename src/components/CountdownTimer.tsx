
import React, { useState, useEffect } from "react";
import { useTimerStore } from "@/stores/timerStore";

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
    <div className="w-full bg-black/80 py-4 border-y border-gray-700">
      <div className={`lcd-display text-6xl md:text-7xl lg:text-8xl text-center font-mono tracking-wider digit-container ${isRunning ? 'text-timer-DEFAULT' : 'text-timer-stopped'}`}>
        <span>{formatTime(displayTime.hours)}</span>
        <span className="animate-blink">:</span>
        <span>{formatTime(displayTime.minutes)}</span>
        <span className="animate-blink">:</span>
        <span>{formatTime(displayTime.seconds)}</span>
        <span className="animate-blink">.</span>
        <span>{formatTime(displayTime.centiseconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
