export interface Question {
  id: number;
  text: string;
  options: { answer: string; isCorrect: boolean }[];
}

const quizData: Question[] = [
  {
    id: 97,
    text: "Question 1: How much water should you drink each day?",
    options: [
      { answer: "8 glasses", isCorrect: true },
      { answer: "2 cups", isCorrect: false },
    ],
  },
  {
    id: 98,
    text: "Question 2: What are the benefits of regular exercise?",
    options: [
      { answer: "Improve heart health", isCorrect: true },
      { answer: "Rapid weight gain", isCorrect: false },
    ],
  },
  {
    id: 99,
    text: "Question 3: What foods help improve mood ?",
    options: [
      { answer: "Chocolate", isCorrect: true },
      { answer: "Cookie", isCorrect: false },
    ],
  },
  {
    id: 100,
    text: "Question 4: What is a good sleep habit?",
    options: [
      { answer: "Sleep at least 7-8 hours every night", isCorrect: true },
      { answer: "Sleep for 4 hours", isCorrect: false },
    ],
  },
  {
    id: 101,
    text: "Question 5: What is an effective way to reduce stress?",
    options: [
      { answer: "Meditation", isCorrect: true },
      { answer: "Watch TV constantly", isCorrect: false },
    ],
  },
  {
    id: 1,
    text: "How much water should you drink each day?",
    options: [
      { answer: "8 ly", isCorrect: true },
      { answer: "2 ly", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "How to improve your sleep?",
    options: [
      { answer: "Using electronic devices before bed", isCorrect: false },
      { answer: "Practice a good sleep routine regular", isCorrect: true },
    ],
  },
  {
    id: 3,
    text: "What is the most important thing when exercising?",
    options: [
      { answer: "Proper technique", isCorrect: true },
      { answer: "Work out as long as possible", isCorrect: false },
    ],
  },
  {
    id: 4,
    text:
      "How much time do you need to work out at the gym each week to stay healthy?",
    options: [
      { answer: "At least 150 minutes", isCorrect: true },
      { answer: "30 minutes a day", isCorrect: false },
    ],
  },
  {
    id: 5,
    text: "What can yoga exercises help improve?",
    options: [
      { answer: "Flexibility and strength", isCorrect: true },
      { answer: "Increased endurance", isCorrect: false },
    ],
  },
  {
    id: 6,
    text: "What should not be done before going to bed?",
    options: [
      { answer: "Drink coffee", isCorrect: true },
      { answer: " Read books", isCorrect: false },
    ],
  },
  {
    id: 7,
    text:
      "To have a healthy lifestyle, how many types of food should you eat each day?",
    options: [
      { answer: "Many food type", isCorrect: true },
      { answer: "Only protein-rich foods", isCorrect: false },
    ],
  },
  {
    id: 8,
    text: "When exercising, the muscles abs, what should you pay attention to?",
    options: [
      { answer: "Focus on the abs", isCorrect: true },
      { answer: "Only do leg exercises", isCorrect: false },
    ],
  },
  {
    id: 9,
    text: "How many hours of sleep do you need each night to stay healthy?",
    options: [
      { answer: "7-9 hours", isCorrect: true },
      { answer: "5 -6 hours", isCorrect: false },
    ],
  },
  {
    id: 10,
    text: "When is the best time to exercise?",
    options: [
      { answer: "Morning", isCorrect: true },
      { answer: "Before going to bed", isCorrect: false },
    ],
  },
  {
    id: 11,
    text: "Exercise can help reduce the risk of disease what?",
    options: [
      { answer: "Cardiovascular disease", isCorrect: true },
      { answer: "Common cold", isCorrect: false },
    ],
  },
  {
    id: 12,
    text: "What is not should be done when practicing yoga?",
    options: [
      { answer: "Overtraining", isCorrect: true },
      { answer: "Focus on breathing", isCorrect: false },
    ],
  },
  {
    id: 13,
    text: "To have a healthy lifestyle, what should you avoid?",
    options: [
      { answer: "Staying up late", isCorrect: true },
      { answer: "Drink water", isCorrect: false },
    ],
  },
  {
    id: 14,
    text: "What exercises help improve arm strength?",
    options: [
      { answer: "Exercise weight", isCorrect: true },
      { answer: "Running", isCorrect: false },
    ],
  },
  {
    id: 15,
    text: "How do you stay motivated when working out?",
    options: [
      { answer: "Set clear goals", isCorrect: true },
      { answer: "Only practice when you have free time", isCorrect: false },
    ],
  },
  {
    id: 16,
    text: "When doing yoga exercises, what is the most important thing?",
    options: [
      { answer: "Precision in movements", isCorrect: true },
      { answer: "Number of exercises", isCorrect: false },
    ],
  },
  {
    id: 17,
    text: "What not to do before going to the gym?",
    options: [
      { answer: "Eat a heavy meal", isCorrect: true },
      { answer: "Drink water", isCorrect: false },
    ],
  },
  {
    id: 18,
    text:
      "Regular exercise can help you improve your What can yoga do to improve your health?",
    options: [
      { answer: "Mood", isCorrect: true },
      { answer: "Bad sleeping habits", isCorrect: false },
    ],
  },
  {
    id: 19,
    text: "What can yoga do to improve your health?",
    options: [
      { answer: "Flexibility", isCorrect: true },
      { answer: "Cardiovascular endurance", isCorrect: false },
    ],
  },
  {
    id: 20,
    text: "What is necessary when exercising to avoid injury?",
    options: [
      { answer: "Warm up thoroughly", isCorrect: true },
      { answer: "Exercise continuously without rest", isCorrect: false },
    ],
  },
  {
    id: 21,
    text:
      "Which of the following statements is true about a healthy diet? strong?",
    options: [
      { answer: "Eat more vegetables and fruits", isCorrect: true },
      { answer: "Eat more processed foods", isCorrect: false },
    ],
  },
  {
    id: 22,
    text: "What exercises help strengthen the legs?",
    options: [
      { answer: "Squat", isCorrect: true },
      { answer: "Running", isCorrect: false },
    ],
  },
  {
    id: 23,
    text: "What is important when doing cardio?",
    options: [
      { answer: "Maintain a stable heart rate", isCorrect: true },
      { answer: "Work out at a low intensity", isCorrect: false },
    ],
  },
  {
    id: 24,
    text: "What should be avoided when doing exercise?",
    options: [
      { answer: "Doing the exercise incorrectly", isCorrect: true },
      { answer: "Using the right exercise equipment", isCorrect: false },
    ],
  },
  {
    id: 25,
    text: "Which of the following foods are good for heart health?",
    options: [
      { answer: "Fish rich in omega-3", isCorrect: true },
      { answer: "Fried foods", isCorrect: false },
    ],
  },
  {
    id: 26,
    text: "What is important when practicing yoga to avoid injury?",
    options: [
      { answer: "Listen to your body", isCorrect: true },
      { answer: "Overtraining", isCorrect: false },
    ],
  },
  {
    id: 27,
    text: "When is the best time to do stretching exercises? muscles?",
    options: [
      { answer: "After exercise", isCorrect: true },
      { answer: "Before exercise", isCorrect: false },
    ],
  },
  {
    id: 28,
    text: "What should you not do when exercising to get the best results?",
    options: [
      { answer: "Skip the warm-up", isCorrect: true },
      { answer: "Exercise at a moderate level", isCorrect: false },
    ],
  },
  {
    id: 29,
    text: "What abilities can exercise help improve?",
    options: [
      { answer: "Ability to concentrate", isCorrect: true },
      { answer: "Laziness", isCorrect: false },
    ],
  },
  {
    id: 30,
    text: "What should you not eat before exercise?",
    options: [
      { answer: "Heavy and hard-to-digest foods", isCorrect: true },
      { answer: "Fresh fruit", isCorrect: false },
    ],
  },
  {
    id: 31,
    text: "When exercising, what role does drinking water play?",
    options: [
      { answer: "Helps maintain hydration", isCorrect: true },
      { answer: "Reduces exercise effectiveness", isCorrect: false },
    ],
  },
  {
    id: 32,
    text: "Which of the following exercises helps improve flexibility?",
    options: [
      { answer: "Stretching", isCorrect: true },
      { answer: "Weight training", isCorrect: false },
    ],
  },
  {
    id: 33,
    text: "What should you pay attention to when doing yoga exercises?",
    options: [
      { answer: "Breathing and concentration", isCorrect: true },
      { answer: "Number of movements", isCorrect: false },
    ],
  },
  {
    id: 34,
    text: "What should you not do when you want to lose weight?",
    options: [
      { answer: "Eating too many calories", isCorrect: true },
      { answer: "Exercise regularly", isCorrect: false },
    ],
  },
  {
    id: 35,
    text: "Which of the following foods are good for muscle health?",
    options: [
      { answer: "Chicken and fish", isCorrect: true },
      { answer: "Foods high in sugar", isCorrect: false },
    ],
  },
  {
    id: 36,
    text: "What is necessary when exercising to achieve the best results?",
    options: [
      { answer: "Train regularly and properly", isCorrect: true },
      { answer: "Train without a plan", isCorrect: false },
    ],
  },
  {
    id: 37,
    text:
      "Which of the following statements is true about resting between workouts?",
    options: [
      {
        answer: "Getting enough rest helps your muscles recover",
        isCorrect: true,
      },
      { answer: "Unnecessary rest", isCorrect: false },
    ],
  },
  {
    id: 38,
    text: "When should you do strength training?",
    options: [
      { answer: "When your body has warmed up", isCorrect: true },
      { answer: "Before warming up", isCorrect: false },
    ],
  },
  {
    id: 39,
    text:
      "What is important when you want to improve your heart health circuit?",
    options: [
      { answer: "Do regular cardio exercise", isCorrect: true },
      { answer: "Muscle training", isCorrect: false },
    ],
  },
  {
    id: 40,
    text: "Which of the following foods are unhealthy?",
    options: [
      { answer: "Processed and sugary foods", isCorrect: true },
      { answer: "Fruits and vegetables", isCorrect: false },
    ],
  },
  {
    id: 41,
    text:
      "What is necessary for yoga practice to achieve the highest efficiency?",
    options: [
      { answer: "Focus on balance and breathing", isCorrect: true },
      { answer: "Practice at a fast pace", isCorrect: false },
    ],
  },
  {
    id: 42,
    text: "When is the best time to do resistance training?",
    options: [
      { answer: "After cardio", isCorrect: true },
      { answer: "Before cardio", isCorrect: false },
    ],
  },
  {
    id: 43,
    text: "What should you not do after exercise to avoid injury?",
    options: [
      { answer: "Skip stretching", isCorrect: true },
      { answer: "Drink water and rest", isCorrect: false },
    ],
  },
  {
    id: 44,
    text: "What should you not skip when doing exercise?",
    options: [
      { answer: "Warm up and stretch", isCorrect: true },
      { answer: "Workout without rest", isCorrect: false },
    ],
  },
  {
    id: 45,
    text: "How much rest should you have between muscle training sessions?",
    options: [
      { answer: "About 48 hours", isCorrect: true },
      { answer: "About 1 hour", isCorrect: false },
    ],
  },
  {
    id: 46,
    text: "What exercises help improve balance?",
    options: [
      { answer: "Yoga", isCorrect: true },
      { answer: "Heavy weight training", isCorrect: false },
    ],
  },
  {
    id: 47,
    text: "What should you not eat before exercising?",
    options: [
      { answer: "Foods high in fat and sugar", isCorrect: true },
      { answer: "Fresh fruit", isCorrect: false },
    ],
  },
  {
    id: 48,
    text: "What can regular exercise help you improve?",
    options: [
      { answer: "Mental health and physical", isCorrect: true },
      { answer: "Physical health only", isCorrect: false },
    ],
  },
  {
    id: 49,
    text: "How long does it take to see results from exercise?",
    options: [
      { answer: "A few weeks", isCorrect: true },
      { answer: "Immediately", isCorrect: false },
    ],
  },
  {
    id: 50,
    text: "What is needed to maintain a healthy diet?",
    options: [
      {
        answer: "Eat a variety of foods and keep regular eating habits",
        isCorrect: true,
      },
      {
        answer: "Eat less and focus on one type of food",
        isCorrect: false,
      },
    ],
  },
  {
    id: 51,
    text: "Practicing yoga can help you improve what?",
    options: [
      { answer: "Flexibility and stress reduction", isCorrect: true },
      { answer: "Great muscle strength", isCorrect: false },
    ],
  },
  {
    id: 52,
    text: "When exercising, what is important to get the most out of it?",
    options: [
      { answer: "Patience and consistency", isCorrect: true },
      { answer: "Unplanned exercise", isCorrect: false },
    ],
  },
  {
    id: 53,
    text: "Which of the following exercises improves endurance?",
    options: [
      { answer: "Running", isCorrect: true },
      { answer: "Weight training", isCorrect: false },
    ],
  },
  {
    id: 54,
    text: "Exercise can help you improve anything other than physical health?",
    options: [
      { answer: "Confidence and spirit", isCorrect: true },
      { answer: "Physical health only", isCorrect: false },
    ],
  },
  {
    id: 55,
    text: "What should not be done when practicing to avoid injury?",
    options: [
      { answer: "Training with too much weight", isCorrect: true },
      { answer: "Training with correct technique", isCorrect: false },
    ],
  },
  {
    id: 56,
    text:
      "When practicing yoga, what is important to perform the postures effectively?",
    options: [
      { answer: "Precision and technique", isCorrect: true },
      { answer: "Number of movements", isCorrect: false },
    ],
  },
  {
    id: 57,
    text:
      "When exercising, what should you pay attention to to get the best results?",
    options: [
      { answer: "Maintain correct technique and posture", isCorrect: true },
      { answer: "Work out quickly and take little rest", isCorrect: false },
    ],
  },
  {
    id: 58,
    text: "When should you do cardio exercises?",
    options: [
      { answer: "Before muscle training", isCorrect: true },
      { answer: "After muscle training", isCorrect: false },
    ],
  },
  {
    id: 59,
    text: "What should you not do when doing exercises at home?",
    options: [
      { answer: "Lack of space and necessary equipment", isCorrect: true },
      { answer: "Use the right exercise equipment", isCorrect: false },
    ],
  },
  {
    id: 60,
    text: "When is the best time to practice yoga to get the best results?",
    options: [
      { answer: "In the morning", isCorrect: true },
      { answer: "In the evening before going to bed", isCorrect: false },
    ],
  },
  {
    id: 61,
    text: "Which of the following foods is good for muscle recovery?",
    options: [
      { answer: "Chicken and yogurt", isCorrect: true },
      { answer: "Foods high in sugar and salt", isCorrect: false },
    ],
  },
  {
    id: 62,
    text: "What should you not do when practicing yoga to avoid injury?",
    options: [
      {
        answer: "Performing postures beyond your ability",
        isCorrect: true,
      },
      { answer: "Focus on accuracy and technique", isCorrect: false },
    ],
  },
  {
    id: 63,
    text:
      "When performing physical exercises, what role does resting between sets play?",
    options: [
      {
        answer: "Helps muscles recover and regenerate energy",
        isCorrect: true,
      },
      { answer: "Reduces training effectiveness", isCorrect: false },
    ],
  },
  {
    id: 64,
    text: "Which of the following exercises helps increase muscle strength?",
    options: [
      { answer: "Weight training", isCorrect: true },
      { answer: "Light walking", isCorrect: false },
    ],
  },
  {
    id: 65,
    text: "When exercising, what should not be ignored to avoid injury?",
    options: [
      { answer: "Warm-up and stretch", isCorrect: true },
      { answer: "Exercising at too high a level right away", isCorrect: false },
    ],
  },
  {
    id: 66,
    text: "What is necessary when planning a workout regimen?",
    options: [
      { answer: "Define clear and appropriate goals", isCorrect: true },
      { answer: "Exercise by inspiration", isCorrect: false },
    ],
  },
  {
    id: 67,
    text: "When is the best time to do yoga exercises for beginners?",
    options: [
      { answer: "In the morning or evening", isCorrect: true },
      { answer: "Immediately before going to bed", isCorrect: false },
    ],
  },
  {
    id: 68,
    text: "What is necessary to maintain a healthy lifestyle?",
    options: [
      {
        answer: "Combine a healthy diet with regular exercise",
        isCorrect: true,
      },
      {
        answer: "Exercise alone without paying attention to diet",
        isCorrect: false,
      },
    ],
  },
  {
    id: 69,
    text: "Which exercises help improve cardiovascular health?",
    options: [
      { answer: "Running and swimming", isCorrect: true },
      { answer: "Muscle training with weights", isCorrect: false },
    ],
  },
  {
    id: 70,
    text:
      "When practicing yoga, what should be avoided to ensure effectiveness and safety?",
    options: [
      { answer: "Performing postures incorrectly", isCorrect: true },
      { answer: "Focus on breathing and posture correct", isCorrect: false },
    ],
  },
  {
    id: 71,
    text: "What is needed to ensure you reach your weight loss goals?",
    options: [
      {
        answer: "Combine a balanced diet and regular exercise",
        isCorrect: true,
      },
      {
        answer: "Exercise alone without changing your diet",
        isCorrect: false,
      },
    ],
  },
  {
    id: 72,
    text: "When is the best time of day to exercise?",
    options: [
      { answer: "When you feel energetic", isCorrect: true },
      { answer: "When you feel tired", isCorrect: false },
    ],
  },
  {
    id: 73,
    text: "What is not to do when you want to build muscle?",
    options: [
      { answer: "No provide enough protein and calories", isCorrect: true },
      {
        answer: "Train regularly and with the right technique",
        isCorrect: false,
      },
    ],
  },
  {
    id: 74,
    text:
      "When performing cardio exercises, what is important to maximize the benefits?",
    options: [
      { answer: "Maintain an optimal heart rate", isCorrect: true },
      { answer: "Train at a low intensity and regularly", isCorrect: false },
    ],
  },
  {
    id: 75,
    text:
      "Which of the following exercises is best for improving back strength?",
    options: [
      { answer: "Pull-ups", isCorrect: true },
      { answer: "Running", isCorrect: false },
    ],
  },
  {
    id: 76,
    text:
      "What is important when performing cardio exercises exercise to avoid injury?",
    options: [
      { answer: "Train with high volume immediately", isCorrect: false },
      {
        answer:
          "Gradually increase the volume of training to let the body adapt",
        isCorrect: true,
      },
    ],
  },
  {
    id: 77,
    text: "What should you not do when you want to improve your mental health?",
    options: [
      {
        answer: "Stay away from relaxing and stress-relieving activities",
        isCorrect: true,
      },
      {
        answer: "Do stress-relieving activities like meditation and yoga",
        isCorrect: false,
      },
    ],
  },
  {
    id: 78,
    text:
      "When exercising, what movements should you do to increase endurance?",
    options: [
      {
        answer: "HIIT (High-Intensity Interval Training)",
        isCorrect: true,
      },
      { answer: "Low weight training", isCorrect: false },
    ],
  },
  {
    id: 79,
    text:
      "What is important when you do yoga exercises to ensure effectiveness?",
    options: [
      { answer: "Keep breathing steady and control stress", isCorrect: true },
      { answer: "Do the movements quickly", isCorrect: false },
    ],
  },
  {
    id: 80,
    text:
      "What should you not do when you are trying to maintain your ideal weight?",
    options: [
      {
        answer: "Eating too many processed and sugary foods",
        isCorrect: true,
      },
      { answer: "Eating fresh and balanced foods", isCorrect: false },
    ],
  },
  {
    id: 81,
    text: "What is important to build a sustainable exercise routine?",
    options: [
      {
        answer: "Plan clearly and set specific goals",
        isCorrect: true,
      },
      { answer: "Working out without a plan", isCorrect: false },
    ],
  },
  {
    id: 82,
    text: "When exercising, what is necessary for the best recovery?",
    options: [
      { answer: "Get enough sleep and eat properly", isCorrect: true },
      { answer: "Working out continuously without rest", isCorrect: false },
    ],
  },
  {
    id: 83,
    text: "Why is it important to warm up before exercise?",
    options: [
      {
        answer: "To warm up your muscles and reduce the risk of injury",
        isCorrect: true,
      },
      { answer: "To save time", isCorrect: false },
    ],
  },
  {
    id: 84,
    text: "When should you do stretching exercises?",
    options: [
      { answer: "After exercise to help muscles recover", isCorrect: true },
      { answer: "Before exercise", isCorrect: false },
    ],
  },
  {
    id: 85,
    text: "What should you not do to keep your body healthy?",
    options: [
      {
        answer: "Lack of sleep and not taking care of your mental health",
        isCorrect: true,
      },
      { answer: "Get enough sleep and eat healthy", isCorrect: false },
    ],
  },
  {
    id: 86,
    text: "What exercises help improve body flexibility?",
    options: [
      { answer: "Practice yoga", isCorrect: true },
      { answer: "Weight training", isCorrect: false },
    ],
  },
  {
    id: 87,
    text: "What is necessary when you want to increase muscle strength?",
    options: [
      {
        answer: "Exercise with heavy weights and correct technique",
        isCorrect: true,
      },
      {
        answer: "Exercise with light weights and many repetitions",
        isCorrect: false,
      },
    ],
  },
  {
    id: 88,
    text: "When doing physical exercises, what should you do to avoid injury?",
    options: [
      {
        answer:
          "Warm up your muscles before exercise and practice with the right technique",
        isCorrect: true,
      },
      { answer: "Exercise without warming up", isCorrect: false },
    ],
  },
  {
    id: 89,
    text: "Why is it important to drink water during exercise?",
    options: [
      {
        answer: "To maintain hydration levels and improve performance",
        isCorrect: true,
      },
      { answer: "To feel full and not hungry", isCorrect: false },
    ],
  },
  {
    id: 90,
    text: "When is the best time to do strength training exercises?",
    options: [
      { answer: "After the body has been fully warmed up", isCorrect: true },
      { answer: "Right after waking up in the morning", isCorrect: false },
    ],
  },
  {
    id: 91,
    text:
      "What are the things you should not do when you are on a healthy diet?",
    options: [
      {
        answer: "Eating too much processed food and sweets",
        isCorrect: true,
      },
      {
        answer: "Eating lots of fruits and vegetables and whole foods",
        isCorrect: false,
      },
    ],
  },
  {
    id: 92,
    text: "What is important when exercising to maintain long-term health?",
    options: [
      {
        answer:
          "Maintaining consistency and adjusting your workout plan as needed",
        isCorrect: true,
      },
      {
        answer: "Exercising irregularly and without a specific plan",
        isCorrect: false,
      },
    ],
  },
  {
    id: 93,
    text: "When exercising, what is necessary to maintain effectiveness?",
    options: [
      {
        answer: "Track your progress and adjust your workout plan",
        isCorrect: true,
      },
      { answer: "Practice without tracking results", isCorrect: false },
    ],
  },
  {
    id: 94,
    text: "What is needed to get the most out of your yoga practice?",
    options: [
      {
        answer: "Practice regularly and focus on correct technique",
        isCorrect: true,
      },
      { answer: "Only do it when you have free time", isCorrect: false },
    ],
  },
  {
    id: 95,
    text: "What is important when planning a diet to support your workout?",
    options: [
      {
        answer: "Get enough protein, carbohydrates, and healthy fats",
        isCorrect: true,
      },
      {
        answer: "Eat only foods high in carbohydrates and low in protein",
        isCorrect: false,
      },
    ],
  },

  {
    id: 96,
    text: "What is essential to stay motivated when exercising?",
    options: [
      {
        answer: "Set clear goals and track progress",
        isCorrect: true,
      },
      { answer: "Exercise only when you feel like it", isCorrect: false },
    ],
  },
];

export default quizData;
