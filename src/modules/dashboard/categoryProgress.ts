import lessonsList from '../app_configuration/list_lessons';

interface Lesson {
  id: string;
  category: string;
}

export interface CategoryProgress {
  category: string;
  completed: number;
  pending: number;
  total: number;
}

export const getProgressByCategory = (): CategoryProgress[] => {
    const completedLessons: string[] = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const categories: string[] = lessonsList.map((lesson: Lesson) => lesson.category);
    const uniqueCategories: string[] = Array.from(new Set(categories));
    const progressByCategory: CategoryProgress[] = [];

    uniqueCategories.forEach((category: string) => {
      const completed: number = completedLessons.filter((lessonId: string) => {
        const lesson: Lesson | undefined = lessonsList.find((lesson: Lesson) => lesson.id.toString() === lessonId);
        return lesson && lesson.category === category;
      }).length;
      const total: number = lessonsList.filter((lesson: Lesson) => lesson.category === category).length;
      const pending: number = total - completed;

      progressByCategory.push({ category, completed, pending, total });
    });

    return progressByCategory;
};

export const getProgressByCategoryIn1000 = (): CategoryProgress[] => {
    const completedLessons: string[] = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    const categories: string[] = lessonsList.map((lesson: Lesson) => lesson.category);
    const uniqueCategories: string[] = Array.from(new Set(categories));
    const progressByCategory: CategoryProgress[] = [];

    uniqueCategories.forEach((category: string) => {
      const completed: number = completedLessons.filter((lessonId: string) => {
        const lesson: Lesson | undefined = lessonsList.find((lesson: Lesson) => lesson.id.toString() === lessonId);
        return lesson && lesson.category === category;
      }).length;

      const total: number = lessonsList.filter((lesson: Lesson) => lesson.category === category).length;
      const pending: number = total - completed;

      // XP pro Lektion berechnen
      const xpPerLesson = 1000 / total;

      // Hochrechnung auf 1000 XP
      const scaledCompleted = completed * xpPerLesson;
      const scaledTotal = total * xpPerLesson;
      const scaledPending = scaledTotal - scaledCompleted;

      progressByCategory.push({ 
        category, 
        completed: scaledCompleted, 
        pending: scaledPending, 
        total: scaledTotal 
      });
    });

    return progressByCategory;
};

export const xpValueOfCompletedLessonInCategory = (category: string): number => {
    const totalLessonsInCategory: number = lessonsList.filter((lesson: Lesson) => lesson.category === category).length;

    // XP pro Lektion berechnen
    const xpPerLesson = 1000 / totalLessonsInCategory;

    return xpPerLesson;
};


export const saveCompletedLesson = (lessonId: string) => (): void => {
    const progressSavingEnabled = localStorage.getItem('progress-saving-enabled') != null;
    console.log("Starte");

    if (progressSavingEnabled) {
      const completedLessons: string[] = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      );
      if (!completedLessons.includes(lessonId)) {
        console.log("nicht drin");
        completedLessons.push(lessonId);
        localStorage.setItem(
          "completedLessons",
          JSON.stringify(completedLessons)
        );
      }
    }
};
