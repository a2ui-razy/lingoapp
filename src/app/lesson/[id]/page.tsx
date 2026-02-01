import { lessons } from '@/data/lessons';
import LessonClient from './LessonClient';

export function generateStaticParams() {
    return lessons.map((lesson) => ({
        id: lesson.id.toString(),
    }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <LessonClient params={params} />;
}
