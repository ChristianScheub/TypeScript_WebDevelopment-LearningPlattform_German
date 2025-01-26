import showAdInterstitial from "./AdInterstial";

export const incrementLessonCounterAds = (): void => {
    let lessonCounterAds = parseInt(localStorage.getItem('lessonCounterAds') || '0', 10);
  
    lessonCounterAds++;
  
    if (lessonCounterAds >= 5) {
      lessonCounterAds = 0;
      showAdInterstitial();
    }
    localStorage.setItem('lessonCounterAds', lessonCounterAds.toString());
  };