// 1. Import các hàm của Firebase
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp, // Rất quan trọng: dùng thời gian của server
  Timestamp,
} from 'firebase/firestore';
import React, { FormEvent, useEffect, useState } from 'react';
import { FaFeatherAlt } from 'react-icons/fa'; // Icon cây bút (cần cài react-icons)

import styles from '../../styles/guest-books.module.scss';

import WishList from '@/components/GuestBooks/WishList';

import { db } from '@/constants/firebase';



interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: Timestamp;
}

const Guestbook: React.FC = () => {
  // State cho form
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State cho danh sách lời chúc
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const wishesCollectionRef = collection(db, 'wishes');

  useEffect(() => {
    const getWishes = async () => {
      setIsLoading(true);
      try {
        const q = query(wishesCollectionRef, orderBy('createdAt', 'desc'));
        const data = await getDocs(q);
        const fetchedWishes = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Wish[];
        setWishes(fetchedWishes);
      } catch (err) {
        console.error("Error fetching wishes: ", err);
        setError('Could not load wishes.');
      }
      setIsLoading(false);
    };

    getWishes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || message.trim() === '') {
      setError('Please enter your name and wish!');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newWishData = {
        name: name,
        message: message,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(wishesCollectionRef, newWishData);

      const newWishForState: Wish = {
        id: docRef.id,
        name: name,
        message: message,
        createdAt: Timestamp.now(),
      };
      setWishes([newWishForState, ...wishes]);

      setName('');
      setMessage('');
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to send wish. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <section className={styles.guestbookSection}>
      <h2 className={styles.sectionTitle} data-aos="flip-up">
        <FaFeatherAlt />
        Send Your Wishes
      </h2>
      <p className={styles.sectionDescription} data-aos="flip-up">
        Please leave your warm wishes for the Bride and Groom!
      </p>

      {/* --- FORM GỬI LỜI CHÚC (Giữ nguyên) --- */}
      <form className={styles.wishForm} onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="guestName">Your Name</label>
          <input
            id="guestName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Friend of the Groom..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="guestMessage">Your Wish</label>
          <textarea
            id="guestMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Wishing you a lifetime of happiness..."
            rows={5}
            required
            maxLength={1000}
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Wish'}
        </button>
      </form>

      {/* --- DANH SÁCH LỜI CHÚC (Đã được thay thế) --- */}
      <WishList wishes={wishes} isLoading={isLoading} />

    </section>
  );
};

export default Guestbook;
