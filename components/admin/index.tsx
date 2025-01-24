'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css'

interface Feedback {
  text: string;
  sentiment: string;
}

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get<Feedback[]>('/api/feedback', {
          headers: { Authorization: 'Bearer YOUR_ADMIN_TOKEN' },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div className={styles.pgContain}>
      <h2>Customer Feedback</h2>
      <ul>
        {feedbacks.map((fb, index) => (
          <li key={index} >
            <p>{fb.text}</p>
            <p>Sentiment: {fb.sentiment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
