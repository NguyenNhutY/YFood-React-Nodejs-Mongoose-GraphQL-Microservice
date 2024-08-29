// services/utils/timeUtils.ts

export const formatTime = (time: Date): string => {
    return time.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  
  export const isDiscountTime = (time: Date): boolean => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    // Discount times: 10:00 - 12:30 and 18:00 - 20:30
    return !(
      (hour > 9 && hour < 12) ||
      (hour === 12 && minute <= 30) ||
      (hour > 16 && hour < 21) ||
      (hour === 20 && minute <= 30)
    );
  };
  
  export const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    // Monday = 1, ..., Friday = 5
    return day >= 1 && day <= 5;
  };
  