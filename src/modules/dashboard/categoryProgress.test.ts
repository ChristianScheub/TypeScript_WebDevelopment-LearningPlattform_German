import { getProgressByCategory, getProgressByCategoryIn1000, xpValueOfCompletedLessonInCategory, saveCompletedLesson } from './categoryProgress';

jest.mock('../app_configuration/list_lessons', () => ({
    __esModule: true,
    default: [
        { id: '1', category: 'Math' },
        { id: '2', category: 'Math' },
        { id: '3', category: 'Science' },
    ],
}));

describe('Progress Functions', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should calculate progress by category', () => {
        localStorage.setItem('completedLessons', JSON.stringify(['1', '2']));
        const progress = getProgressByCategory();
        expect(progress).toEqual([
            { category: 'Math', completed: 2, pending: 0, total: 2 },
            { category: 'Science', completed: 0, pending: 1, total: 1 },
        ]);
    });

    it('should calculate progress by category scaled to 1000', () => {
        localStorage.setItem('completedLessons', JSON.stringify(['1', '2']));
        const progress = getProgressByCategoryIn1000();
        expect(progress).toEqual([
            { category: 'Math', completed: 1000, pending: 0, total: 1000 },
            { category: 'Science', completed: 0, pending: 1000, total: 1000 },
        ]);
    });

    it('should calculate xp value of completed lesson in category', () => {
        const xpValue = xpValueOfCompletedLessonInCategory('Math');
        expect(xpValue).toBe(500);
    });

    it('should save completed lesson', () => {
        localStorage.setItem('progress-saving-enabled', 'true');
        const saveFunction = saveCompletedLesson('1'); 
        saveFunction();
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        expect(completedLessons).toContain('1');
    });
});
