import React, { useState } from 'react';
import axios from 'axios';

const CommentPopup = ({ isOpen, onClose, onSubmit, target, targetid ,user }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        comment,
        rating,
        user,
        target,
        targetid,
      };

      await axios.post('/api/comments', payload);
      onSubmit(comment);
      setComment('');
      setRating(0);
      onClose();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className='w-full h-24 p-2 border border-gray-300 rounded'
          placeholder='Enter your comment here'
        />
        <input
          type='number'
          value={rating}
          onChange={handleRatingChange}
          className='w-full p-2 mt-4 border border-gray-300 rounded'
          placeholder='Enter your rating here (optional)'
        />
        <div className='flex justify-end mt-4'>
          <button
            className='mr-2 bg-gray-300 p-2 rounded'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white p-2 rounded'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
