import React from 'react';
import SessionForm from './SessionForm';

const SessionPage = () => {
  return (
    <div className='session-page-container'>
      <SessionForm />
      <div className='session-info-container'>
        <p>Pinterest helps you find ideas to try.</p>
        <button type='button' className='info-btn'>How it works</button>
      </div>
    </div>
  );
};

export default SessionPage;
