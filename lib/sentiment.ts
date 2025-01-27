// lib/sentiment.ts
export function analyzeSentiment(text: string): number {
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "fantastic",
    "awesome",
    "happy",
    "love",
  ];
  const negativeWords = [
    "bad",
    "terrible",
    "awful",
    "horrible",
    "poor",
    "sad",
    "hate",
  ];

  const words = text.toLowerCase().split(/\s+/);

  const positiveCount = words.filter((word) =>
    positiveWords.includes(word)
  ).length;
  const negativeCount = words.filter((word) =>
    negativeWords.includes(word)
  ).length;

  // Return a number between -1 and 1
  return (positiveCount - negativeCount) / Math.max(words.length, 1);
}
