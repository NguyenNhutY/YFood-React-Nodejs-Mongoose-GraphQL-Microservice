import React from "react";
import { useTimeObservable } from "../../services/services/timeObservable.ts";
import {
  formatTime,
  isDiscountTime,
  isWeekday,
} from "../../utils/timeUtils.ts";
import "./promotionBarClock.scss"; // CSS file

const PromotionBar: React.FC = () => {
  const currentTime = useTimeObservable(1000); // Update every second

  const promotionPeriod: string = "Promotion from Monday to Friday";
  const promotionTime: string =
    "10% discount for orders outside of the time slots 10:00 - 12:30 and 18:00 - 20:30";
  return (
    <div className='promotion-bar'>
      <div className='promotion-bar-content'>
        <div className='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div className='promotion-period'>{promotionPeriod}</div>
        <div className='discount-message'>{promotionTime}</div>
        <div className='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div className='promotion-period'>{promotionPeriod}</div>
        <div className='discount-message'>{promotionTime}</div>
        <div className='current-time'>
          {`Current time: ${formatTime(currentTime)}`}
        </div>
        <div className='promotion-period'>{promotionPeriod}</div>
        <div className='discount-message'>{promotionTime}</div>
      </div>
    </div>
  );
};

export default PromotionBar;
