export type Question = {
    id: string;
    type: 'multiple-choice' | 'translate';
    question: string;
    options?: string[]; // For multiple choice
    correctAnswer: string;
};

export type Lesson = {
    id: number;
    title: string;
    description: string;
    color: string; // Hex code or CSS variable
    questions: Question[];
};

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "ユニット 1: 基本的な文",
        description: "挨拶と自己紹介を学びましょう。",
        color: "var(--color-green)",
        questions: [
            {
                id: "q1_1",
                type: "multiple-choice",
                question: "「Hello」の正しい意味を選んでください",
                options: ["さようなら", "こんにちは", "りんご", "猫"],
                correctAnswer: "こんにちは"
            },
            {
                id: "q1_2",
                type: "translate",
                question: "「私は少年です」を英語にしてください / I am a boy.",
                options: ["I", "am", "a", "boy", "girl", "is"],
                correctAnswer: "I am a boy"
            },
            {
                id: "q1_3",
                type: "multiple-choice",
                question: "空欄を埋めてください: _____ am a student. (私は学生です)",
                options: ["I", "You", "He", "She"],
                correctAnswer: "I"
            }
        ]
    },
    {
        id: 2,
        title: "ユニット 2: 複数形",
        description: "複数のものについて話しましょう。",
        color: "var(--color-blue)",
        questions: [
            {
                id: "q2_1",
                type: "multiple-choice",
                question: "「Cat (猫)」の複数形は？",
                options: ["Cats", "Cates", "Cat", "Kittens"],
                correctAnswer: "Cats"
            },
            {
                id: "q2_2",
                type: "translate",
                question: "「3匹の犬」 / Three dogs.",
                options: ["Three", "dogs", "dog", "Two", "Four"],
                correctAnswer: "Three dogs"
            }
        ]
    },
    {
        id: 3,
        title: "ユニット 3: よく使うフレーズ",
        description: "日常生活で役立つフレーズ。",
        color: "var(--color-purple)",
        questions: [
            {
                id: "q3_1",
                type: "multiple-choice",
                question: "「ありがとう」は英語で？",
                options: ["No", "Please", "Thank you", "Sorry"],
                correctAnswer: "Thank you"
            },
            {
                id: "q3_2",
                type: "multiple-choice",
                question: "「おはよう」を選んでください",
                options: ["Good night", "Good morning", "Goodbye"],
                correctAnswer: "Good morning"
            }
        ]
    },
    {
        id: 4,
        title: "ユニット 4: 食べ物",
        description: "食事について話しましょう。",
        color: "var(--color-orange)",
        questions: [
            {
                id: "q4_1",
                type: "translate",
                question: "「私はりんごを食べます」 / I eat an apple.",
                options: ["I", "eat", "an", "apple", "drink", "water"],
                correctAnswer: "I eat an apple"
            },
            {
                id: "q4_2",
                type: "multiple-choice",
                question: "パンはどれですか？",
                options: ["Bread", "Water", "Milk"],
                correctAnswer: "Bread"
            }
        ]
    },
    {
        id: 5,
        title: "ユニット 5: 動物",
        description: "ペットや野生動物について。",
        color: "var(--color-red)",
        questions: [
            {
                id: "q5_1",
                type: "multiple-choice",
                question: "「ミャオ」と鳴く動物は？",
                options: ["Dog", "Cat", "Cow", "Horse"],
                correctAnswer: "Cat"
            },
            {
                id: "q5_2",
                type: "translate",
                question: "「その馬は走ります」 / The horse runs.",
                options: ["The", "horse", "runs", "sleeps", "cat"],
                correctAnswer: "The horse runs"
            }
        ]
    },
    {
        id: 6,
        title: "ユニット 6: 形容詞",
        description: "色や大きさで説明しましょう。",
        color: "var(--color-green)",
        questions: [
            {
                id: "q6_1",
                type: "multiple-choice",
                question: "「大きな家」を選んでください",
                options: ["A small house", "A big house", "A red house"],
                correctAnswer: "A big house"
            },
            {
                id: "q6_2",
                type: "translate",
                question: "「その車は赤いです」 / The car is red.",
                options: ["The", "car", "is", "red", "blue", "fast"],
                correctAnswer: "The car is red"
            }
        ]
    },
    {
        id: 7,
        title: "ユニット 7: 現在形の動詞",
        description: "今の動作について。",
        color: "var(--color-blue)",
        questions: [
            {
                id: "q7_1",
                type: "multiple-choice",
                question: "「彼は学校へ行きます」: He _____ to school.",
                options: ["go", "goes", "going"],
                correctAnswer: "goes"
            },
            {
                id: "q7_2",
                type: "translate",
                question: "「彼らはサッカーをします」 / They play soccer.",
                options: ["They", "play", "soccer", "tennis", "plays"],
                correctAnswer: "They play soccer"
            }
        ]
    },
    {
        id: 8,
        title: "ユニット 8: 質問",
        description: "情報を尋ねてみましょう。",
        color: "var(--color-purple)",
        questions: [
            {
                id: "q8_1",
                type: "multiple-choice",
                question: "「あなたの名前は何ですか？」: _____ is your name?",
                options: ["What", "Where", "When"],
                correctAnswer: "What"
            },
            {
                id: "q8_2",
                type: "translate",
                question: "「あなたはどこにいますか？」 / Where are you?",
                options: ["Where", "are", "you", "is", "he"],
                correctAnswer: "Where are you"
            }
        ]
    },
    {
        id: 9,
        title: "ユニット 9: 家族",
        description: "家族や関係について。",
        color: "var(--color-orange)",
        questions: [
            {
                id: "q9_1",
                type: "multiple-choice",
                question: "Mother(母) と Father(父) は合わせて...",
                options: ["Parents(両親)", "Siblings(きょうだい)", "Cousins(いとこ)"],
                correctAnswer: "Parents(両親)"
            },
            {
                id: "q9_2",
                type: "translate",
                question: "「私の姉は背が高いです」 / My sister is tall.",
                options: ["My", "sister", "is", "tall", "short", "brother"],
                correctAnswer: "My sister is tall"
            }
        ]
    },
    {
        id: 10,
        title: "ユニット 10: チェックポイント",
        description: "これまでの復習です。",
        color: "var(--color-gold)",
        questions: [
            {
                id: "q10_1",
                type: "multiple-choice",
                question: "復習: 「Man (男性)」の複数形は？",
                options: ["Mans", "Men", "Man"],
                correctAnswer: "Men"
            },
            {
                id: "q10_2",
                type: "translate",
                question: "「私は幸せです」 / I am happy.",
                options: ["I", "am", "happy", "sad", "you"],
                correctAnswer: "I am happy"
            },
            {
                id: "q10_3",
                type: "multiple-choice",
                question: "「彼女は水を飲みます」: She _____ water.",
                options: ["drink", "drinks", "drinking"],
                correctAnswer: "drinks"
            }
        ]
    }
];
