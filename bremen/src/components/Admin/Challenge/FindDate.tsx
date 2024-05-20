/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './FindDate.module.scss';

interface FindDateProps {
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onValidationChange: (isValid: boolean) => void; // Callback to handle the date validation state
}

export default function FindDate({
  onStartDateChange,
  onEndDateChange,
  onValidationChange,
}: FindDateProps) {
  const [startDate, setStartDate] = useState<Date | null>(null); // Initial value set to null
  const [endDate, setEndDate] = useState<Date | null>(null); // Initial value set to null
  const [dateInvalid, setDateInvalid] = useState(false); // State to track if the date range is invalid

  const validateDates = (start: Date | null, end: Date | null) => {
    const isValid = !(start && end && end < start);
    setDateInvalid(!isValid);
    onValidationChange(isValid); // Notify the parent component about the validation status
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    setStartDate(date);
    validateDates(date, endDate); // Validate after updating startDate
    onStartDateChange(date ? new Date(date.getTime()) : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(23, 59, 59, 999);
    }
    setEndDate(date);
    validateDates(startDate, date); // Validate after updating endDate
    onEndDateChange(date ? new Date(date.getTime()) : null);
  };

  return (
    <>
      <div className={styles.finddatearea}>
        <div className={styles.date}>챌린지 기간</div>
        <div className={styles.searchbox}>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            className={`input ${styles.popper}`}
            placeholderText="Select a start date"
          />
        </div>
        <span className={styles.wave}>~</span>
        <div className={styles.searchbox}>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            className={`input ${styles.popper}`}
            placeholderText="Select an end date"
          />
        </div>
      </div>
      <span className={styles.ex}>날짜/시간 입력예시 : 2024-05-06</span>
    </>
  );
}
