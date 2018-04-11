import React from 'react';

const Session = () => {
  return (
    <div className='session-container'>
      <button type="button" className="session-login-btn">Log in</button>

      <div className="session-form-container">
        <img alt="logo"></img>
        <h2>Welcome to Pinterest</h2>
        <h4>Find new ideas to try</h4>

        <form>
          <input type='email' placeholder='Email'></input>
          <input type='password' placeholder='Create a password'></input>
          <input type='number' placeholder='Age'></input>
          <input type='submit' value='Continue'></input>
        </form>

        <p>Or</p>

        <button type='button' className='session-login-fb-btn'></button>
        <button type='button' className='session-login-google-btn'></button>
        <p>By continuing, you agree to Pinterest's Terms of Service, Privacy
        Policy
        </p>
        <div className="session-info-container">
          <p>Pinterest helps you find ideas to try.</p>
          <button type='button' className='session-info-btn'>
          How it works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;
