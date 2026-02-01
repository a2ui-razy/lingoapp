"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { lessons, Lesson, Question } from '@/data/lessons';

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const router = useRouter();

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | string[] | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Find lesson by ID
        const foundLesson = lessons.find(l => l.id.toString() === unwrappedParams.id);
        if (foundLesson) {
            setLesson(foundLesson);
        }
    }, [unwrappedParams.id]);

    if (!lesson) return <div className="container flex items-center justify-center">読み込み中...</div>;

    const currentQuestion = lesson.questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex) / lesson.questions.length) * 100;

    const handleCheck = () => {
        if (!selectedOption) return;

        let userAnswer = selectedOption;
        if (Array.isArray(selectedOption)) {
            userAnswer = selectedOption.join(' ');
        }

        if (userAnswer === currentQuestion.correctAnswer) {
            setStatus('correct');
            // Play sound effect here if we had one
        } else {
            setStatus('wrong');
        }
    };

    const handleContinue = () => {
        if (status === 'wrong') {
            // Ideally we might repeat the question later, for now just move on or stay
            // Simple version: just move on but acknowledge it was wrong
        }

        if (currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setStatus('idle');
        } else {
            // Save Progress
            const saved = localStorage.getItem('lingo_progress');
            const progress = saved ? JSON.parse(saved) : [];
            if (!progress.includes(lesson.id)) {
                progress.push(lesson.id);
                localStorage.setItem('lingo_progress', JSON.stringify(progress));
            }

            setCompleted(true);
        }
    };

    // Completion Screen
    if (completed) {
        return (
            <div className="container flex-col items-center justify-center text-center">
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-gold)' }}>レッスン完了！</h2>
                <p><strong>{lesson.title}</strong> をクリアしました</p>

                <div className="flex gap-4 mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push('/')}
                        style={{ width: '200px' }}
                    >
                        続ける
                    </button>
                </div>
            </div>
        );
    }

    // Quiz Screen
    return (
        <div className="container" style={{ paddingBottom: '140px' }}>
            {/* Header */}
            <div className="progress-header">
                <Link href="/">
                    <button className="close-btn">✕</button>
                </Link>
                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Question */}
            <div className="flex-col animate-in">
                <h2 className="question-title">
                    {currentQuestion.type === 'translate' ? 'この文を訳してください' : '正解を選んでください'}
                </h2>

                {/* Content Area based on Type */}
                {currentQuestion.type === 'translate' ? (
                    /* Sentence Builder Interface */
                    <div className="flex-col gap-4">
                        {/* Source Sentence */}
                        <div style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#666' }}>
                            {currentQuestion.question.split('/')[0]}
                        </div>

                        {/* Built Sentence Display */}
                        <div style={{
                            minHeight: '60px',
                            borderBottom: '2px solid #e5e5e5',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            alignItems: 'center',
                            marginBottom: '40px',
                            padding: '10px'
                        }}>
                            {/* @ts-ignore - simplistic state for now */}
                            {selectedOption && Array.isArray(selectedOption) && selectedOption.map((word: string, idx: number) => (
                                <button
                                    key={idx}
                                    className="card"
                                    onClick={() => {
                                        if (status !== 'idle') return;
                                        // Remove word logic would go here, for simplicity we just clear or complex state needed
                                        // For this quick impl, let's just use string building or simple array
                                        const newSelection = [...(selectedOption as string[])];
                                        newSelection.splice(idx, 1);
                                        setSelectedOption(newSelection.length > 0 ? newSelection : null);
                                    }}
                                    style={{ padding: '8px 16px', fontSize: '1rem', borderBottomWidth: '4px' }}
                                >
                                    {word}
                                </button>
                            ))}
                        </div>

                        {/* Word Bank */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {currentQuestion.options?.map((word, idx) => {
                                const isSelected = Array.isArray(selectedOption) && selectedOption.includes(word);
                                // Simple logic: if word used, hide it or gray it. 
                                // Ideally we track indices to allow duplicate words if needed, but for now simple includes check
                                // Actually for true duplications we need to track indices of usage. 
                                // Let's keep it simple: count occurences in selection vs options
                                const selectionCount = Array.isArray(selectedOption) ? selectedOption.filter(w => w === word).length : 0;
                                const totalCount = currentQuestion.options!.filter(w => w === word).length;
                                const isFullyUsed = selectionCount >= totalCount;

                                return (
                                    <button
                                        key={idx}
                                        className={`card ${isFullyUsed ? 'invisible' : ''}`} // visually hide but keep layout
                                        style={{
                                            opacity: isFullyUsed ? 0 : 1,
                                            padding: '10px 20px',
                                            fontSize: '1rem'
                                        }}
                                        onClick={() => {
                                            if (status !== 'idle' || isFullyUsed) return;
                                            const current = Array.isArray(selectedOption) ? [...selectedOption] : [];
                                            current.push(word);
                                            setSelectedOption(current);
                                        }}
                                        disabled={isFullyUsed}
                                    >
                                        {word}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    /* Multiple Choice Interface */
                    <div className="flex-col gap-4">
                        <div style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
                            {currentQuestion.question}
                        </div>
                        <div className="options-grid">
                            {currentQuestion.options?.map((option, idx) => (
                                <div
                                    key={idx}
                                    className={`card ${selectedOption === option ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (status === 'idle') setSelectedOption(option);
                                    }}
                                    style={{ pointerEvents: status !== 'idle' ? 'none' : 'auto' }}
                                >
                                    <div style={{
                                        width: '30px',
                                        height: '30px',
                                        border: '2px solid #e5e5e5',
                                        borderRadius: '8px',
                                        marginRight: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        borderColor: selectedOption === option ? 'var(--color-blue)' : '#e5e5e5',
                                        color: selectedOption === option ? 'var(--color-blue)' : '#ccc',
                                    }}>
                                        {idx + 1}
                                    </div>
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Area */}
            <div className="footer-bar flex-col" style={{
                borderTopColor: status === 'correct' ? '#b4f08a' : (status === 'wrong' ? '#ffc1c1' : '#e5e5e5'),
                backgroundColor: status === 'correct' ? '#d7ffb8' : (status === 'wrong' ? '#ffdfe0' : 'white'),
            }}>

                {status === 'correct' && (
                    <div className="w-full mb-4 flex items-center gap-4" style={{ color: '#58a700' }}>
                        <div style={{ fontSize: '30px', background: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
                        <div>
                            <div className="feedback-title">正解！</div>
                        </div>
                    </div>
                )}

                {status === 'wrong' && (
                    <div className="w-full mb-4 flex items-center gap-4" style={{ color: '#ea2b2b' }}>
                        <div style={{ fontSize: '30px', background: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</div>
                        <div>
                            <div className="feedback-title">正解はこちら:</div>
                            <div>{currentQuestion.correctAnswer}</div>
                        </div>
                    </div>
                )}

                <button
                    className={`btn ${status === 'wrong' ? 'btn-danger' : (status === 'correct' ? 'btn-primary' : 'btn-check')}`}
                    style={{
                        width: '100%',
                        backgroundColor: status === 'wrong' ? '#ff4b4b' : (status === 'correct' ? '#58cc02' : undefined),
                        borderBottomColor: status === 'wrong' ? '#d43636' : (status === 'correct' ? '#46a302' : undefined),
                        color: 'white'
                    }}
                    onClick={status === 'idle' ? handleCheck : handleContinue}
                    disabled={(
                        status === 'idle' &&
                        (!selectedOption || (Array.isArray(selectedOption) && selectedOption.length === 0))
                    )}
                >
                    {status === 'idle' ? '確認する' : '次へ'}
                </button>
            </div>
        </div>
    );
}
