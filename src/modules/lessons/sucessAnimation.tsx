import React, { useState, useEffect } from "react";
import {
  getProgressByCategoryIn1000,
  CategoryProgress,
  xpValueOfCompletedLessonInCategory,
} from "../dashboard/categoryProgress";

interface CongratulationsOverlayProps {
  lessonCategory: string;
  closeOverlay: () => void;
}

const CongratulationsOverlay: React.FC<CongratulationsOverlayProps> = ({
  lessonCategory,
  closeOverlay,
}) => {

  const currentCategoryProgress: CategoryProgress | undefined =
    getProgressByCategoryIn1000().find(
      (progress) => progress.category === lessonCategory
    );

  const currentCompletedXP: number = currentCategoryProgress
    ? currentCategoryProgress.completed
    : 0;
  const currentTotalXP: number = currentCategoryProgress
    ? currentCategoryProgress.total
    : 0;


  const targetXP = xpValueOfCompletedLessonInCategory(lessonCategory);

  const [animatedXP, setAnimatedXP] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (animatedXP < targetXP) {
        setAnimatedXP((prevXP) => prevXP + 1);
      } else {
        clearInterval(timer);
      }
    }, 5);

    return () => clearInterval(timer);
  }, [animatedXP, targetXP]);



  return (
    <div className="overlay">
      <div className="congratulationAnimation">
        <h1>Gratulation!</h1>
        <div className="rocketAnimation">🚀</div>
        <p>+ {animatedXP} XP</p>
        <p>
          {`${currentCompletedXP}/${currentTotalXP} XP schon erreicht in dem Kapitel ${lessonCategory}!`}
        </p>
        <button className="closeButton" onClick={closeOverlay}>
          x
        </button>
      </div>
    </div>
  );
}

export default CongratulationsOverlay;