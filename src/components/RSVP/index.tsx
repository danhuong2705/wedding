// Import các hàm của Firebase
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../../styles/rsvp.module.scss';

import { db } from '@/constants/firebase';

import { PrettyRsvpIcon } from './PrettyRsvpIcon'; // Import hình ảnh vừa tạo

type AttendanceStatus = 'attending' | 'not_attending' | null;
type TransportationStatus = 'personal' | 'shared';
// Định nghĩa trạng thái tham dự
const VNM_PHONE_REGEX = /^(0(3|5|7|8|9)\d{8})$/;


const RsvpSection: React.FC = () => {
  // --- STATE CHO FORM ---
  const [name, setName] = useState<string>('');
  const [attendance, setAttendance] = useState<AttendanceStatus>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [transportation, setTransportation] = useState<TransportationStatus>('personal');
  const [phone, setPhone] = useState<string>('');

  // --- STATE CHO UI ---
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- HÀM XỬ LÝ SUBMIT ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.dismiss(); // Xóa toast cũ (nếu có)

    // --- Validation ---
    if (name.trim() === '') {
      const msg = 'Please enter your name.';
      setError(msg);
      toast.error(msg);
      return;
    }
    if (attendance === null) {
      const msg = 'Please select your attendance status.';
      setError(msg);
      toast.error(msg);
      return;
    }
    // --- (THAY ĐỔI 2) Logic validation SĐT mới ---
    if (attendance === 'attending' && transportation === 'shared') {
      if (phone.trim() === '') {
        const msg = 'Please enter your phone number to register for the bus.';
        setError(msg);
        toast.error(msg);
        return;
      }

      // Kiểm tra SĐT bằng Regex
      if (!VNM_PHONE_REGEX.test(phone)) {
        const msg = 'Please enter a valid 10-digit Vietnamese phone number (e.g., 09x...).';
        setError(msg);
        toast.error(msg);
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // --- Chuẩn bị dữ liệu ---
      const rsvpData = {
        name: name,
        attending: attendance === 'attending',
        guestCount: attendance === 'attending' ? guestCount : 0,
        transportation: attendance === 'attending' ? transportation : null,
        phone: (attendance === 'attending' && transportation === 'shared') ? phone : null,
        submittedAt: serverTimestamp(),
      };

      // --- Gửi lên Firebase ---
      await addDoc(collection(db, 'rsvps'), rsvpData);

      // --- Thành công ---
      toast.success('Thank you! Your response has been received.');

      // --- Clear form ---
      setName('');
      setAttendance(null);
      setGuestCount(1);
      setTransportation('personal');
      setPhone('');

    } catch (err) {
      // --- Xử lý lỗi ---
      console.error("Error adding RSVP: ", err);
      const msg = 'Failed to send response. Please try again.';
      setError(msg);
      toast.error(msg);
    }

    setIsSubmitting(false);
  };

  // --- HÀM XỬ LÝ CLICK CHỌN THAM DỰ ---
  const handleAttendanceClick = (status: AttendanceStatus) => {
    setAttendance(status);
    // Reset các trường con khi thay đổi lựa chọn
    if (status === 'attending') {
      setGuestCount(1);
      setTransportation('personal');
      setPhone('');
    }
    if (error) setError(null); // Xóa lỗi nếu có
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Chỉ giữ lại số
    setPhone(numericValue);
  };
  // --- RENDER COMPONENT ---
  return (
    <section className={styles.rsvpSection}>
      <h2 className={styles.sectionTitle} data-aos="flip-up">Confirm Your Attendance</h2>
      <p className={styles.sectionDescription} data-aos="flip-up">
        Please RSVP by November 20th so we can make preparations.
      </p>

      <div className={styles.container}>
        {/* --- CỘT HÌNH ẢNH --- */}
        <div className={styles.imageContent}>
          <PrettyRsvpIcon className={styles.rsvpIcon} />
        </div>

        {/* --- CỘT FORM --- */}
        <div className={styles.formContent}>
          <form className={styles.rsvpForm} onSubmit={handleSubmit}>

            {/* Hiển thị lỗi (nếu có) */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* Input Tên */}
            <div className={styles.inputGroup}>
              <label htmlFor="guestName">Your Full Name</label>
              <input
                id="guestName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Rosie Nguyen"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Nút chọn tham dự */}
            <div className={styles.inputGroup}>
              <label>Will you be attending?</label>
              <div className={styles.attendanceButtons}>
                <button
                  type="button"
                  className={`${styles.attendanceButton} ${attendance === 'attending' ? styles.activeAttending : ''
                    }`}
                  onClick={() => handleAttendanceClick('attending')}
                  disabled={isSubmitting}
                >
                  Will Attend
                </button>
                <button
                  type="button"
                  className={`${styles.attendanceButton} ${attendance === 'not_attending' ? styles.activeNotAttending : ''
                    }`}
                  onClick={() => handleAttendanceClick('not_attending')}
                  disabled={isSubmitting}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Khối hiển thị có điều kiện */}
            {attendance === 'attending' && (
              <>
                {/* HÀNG 2 CỘT (MỚI) */}
                <div className={styles.formRow}>
                  {/* Select box số người */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="guestCount">Number of Guests</label>
                    <select
                      id="guestCount"
                      className={styles.guestSelect}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      disabled={isSubmitting}
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                    </select>
                  </div>

                  {/* Select box phương tiện */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="transportation">Transportation</label>
                    <select
                      id="transportation"
                      className={styles.guestSelect}
                      value={transportation}
                      onChange={(e) => setTransportation(e.target.value as TransportationStatus)}
                      disabled={isSubmitting}
                    >
                      <option value="personal">Personal Transport</option>
                      <option value="shared">Shared Bus</option>
                    </select>
                  </div>
                </div>

                {/* Input SĐT (chỉ hiện khi chọn xe chung) */}
                {transportation === 'shared' && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="guestPhone">Your Phone Number</label>
                    <input
                      id="guestPhone"
                      type="tel" // <-- Tốt cho mobile
                      inputMode="numeric" // <-- Hiển thị bàn phím số
                      value={phone}
                      onChange={handlePhoneChange} // <-- Dùng hàm lọc
                      placeholder="E.g., 0912345678" // <-- Placeholder mới
                      maxLength={10} // <-- Giới hạn 10 số
                      required // <-- (Vẫn giữ)
                      disabled={isSubmitting}
                    />
                    <div className={styles.note}>
                      * Departure time and meeting point: 7:00 AM, Nov 30 at Gold Tower, 275 Nguyen Trai, Thanh Xuan, Ha Noi.
                    </div>
                  </div>

                )}
              </>
            )}

            {/* Nút Gửi */}
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Response'}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;