'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';
import styles from './styles.module.css'

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage('Feedback cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/feedback', { text: feedback });
      setMessage('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      setMessage('Error submitting feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContain}>
        <div className={styles.colOne}></div>
    <form onSubmit={handleSubmit} className={styles.colTwo}>
        <h2>Sentiment Analysis Tool</h2>
        <input type="text" placeholder='Enter your full name...' className={styles.nameForm} />
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
        maxLength={1000}
        className={styles.textArea}
      />
      <button
        type="submit"
        disabled={loading}
        className={styles.submitBtn}
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {message && <p className={styles.msgText}>{message}</p>}
    </form>
    </div>
  );
};

export default FeedbackForm;
