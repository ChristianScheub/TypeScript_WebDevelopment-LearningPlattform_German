import React from 'react';
import { Route,Routes  } from 'react-router-dom';
import Lesson from './lessonDetail';
import LessonOverview from './lessonOverview';
import lessonsList from '../app_configuration/list_lessons';

const LessonsRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                {lessonsList.map((lesson) => (
                    <Route key={lesson.id} path={`/${lesson.id}`} element={<Lesson lesson={lesson} />} />
                ))}
                {lessonsList.map((lesson) => {
                    const { id, category } = lesson;
                    return (
                        <Route
                            key={id}
                            path={`/${category.toLowerCase().replace(/ /g, '-')}`}
                            element={<LessonOverview title={category} lessons={lessonsList.filter((item) => item.category === category)} />}
                        />
                    );
                })}
            </Routes>
        </>
    );
};

export default LessonsRoutes;
