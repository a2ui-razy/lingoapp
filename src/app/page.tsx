"use client";

import Link from 'next/link';
import { lessons } from '@/data/lessons';
import { useEffect, useState } from 'react';

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    // Load progress from local storage
    const saved = localStorage.getItem('lingo_progress');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container">
      <header className="flex items-center justify-center mb-4" style={{ padding: '20px 0' }}>
        <h1 style={{ color: 'var(--color-green)', margin: 0 }}>LingoApp</h1>
      </header>

      <div className="path-container">
        {lessons.map((lesson, index) => {
          // Simple logic to create a winding path visual
          const offset = index % 2 === 0 ? -50 : 50;
          const isCheckPoint = lesson.id % 5 === 0; // Every 5 is special

          return (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              index={index}
              offset={offset}
              isCheckPoint={isCheckPoint}
              completedLessons={completedLessons}
            />
          );
        })}
      </div>

      <div className="text-center" style={{ marginTop: '100px', color: '#ccc' }}>
        もっとレッスンを追加予定！
      </div>
    </div>
  );
}

function LessonNode({ lesson, index, offset, isCheckPoint, completedLessons }: any) {
  const isCompleted = completedLessons.includes(lesson.id);
  const isNext = !isCompleted && (index === 0 || completedLessons.includes(lessons[index - 1].id));
  const isLocked = !isCompleted && !isNext;

  return (
    <div
      className="path-row"
      style={{ transform: `translateX(${index === 0 ? 0 : offset}px)` }}
    >
      <Link href={`/lesson/${lesson.id}`} style={{ textDecoration: 'none', pointerEvents: isLocked ? 'none' : 'auto' }}>
        <div
          className="level-node"
          style={{
            backgroundColor: isCompleted ? 'var(--color-gold)' : (isLocked ? '#e5e5e5' : lesson.color),
            width: isCheckPoint ? '100px' : '80px',
            height: isCheckPoint ? '100px' : '80px',
            opacity: isLocked ? 0.5 : 1,
            cursor: isLocked ? 'default' : 'pointer'
          }}
        >
          <span className="level-icon">
            {isCompleted ? '✓' : (isCheckPoint ? '🏆' : '★')}
          </span>

          {/* Floating Label */}
          <div style={{
            position: 'absolute',
            top: '110%',
            width: '200px',
            textAlign: 'center',
            color: '#afafaf',
            fontSize: '14px',
            fontWeight: 'bold',
            pointerEvents: 'none'
          }}>
            {lesson.title}
          </div>
        </div>
      </Link>
    </div>
  )
}
