"use client";
import { useState, FormEvent } from "react";
import styles from "./styles.module.css";

const FeedbackForm: React.FC = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [sentiment, setSentiment] = useState<number | null>(null);

  const getSentimentText = (value: number): string => {
    if (value > 0.5) return "Very Positive";
    if (value > 0) return "Positive";
    if (value === 0) return "Neutral";
    if (value > -0.5) return "Negative";
    return "Very Negative";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    if (!text.trim()) {
      setMessage("Feedback cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const result = await response.json();
      setSentiment(result.sentiment);
      setMessage("Feedback submitted successfully!");

      // Reset form
      setName("");
      setText("");
    } catch {
      setMessage("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContain}>
      <div className={styles.colOne}></div>
      <form onSubmit={handleSubmit} className={styles.colTwo}>
        <h2>Sentiment Analysis Tool</h2>
        <input
          type="text"
          placeholder="Enter your full name..."
          className={styles.nameForm}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your feedback here..."
          maxLength={1000}
          className={styles.textArea}
        />
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
        {message && <p className={styles.msgText}>{message}</p>}
        {sentiment !== null && (
          <div className={styles.msgText}>
            <p>Sentiment Score: {sentiment.toFixed(2)}</p>
            <p>Analysis: {getSentimentText(sentiment)}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
