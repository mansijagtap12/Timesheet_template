import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigate function

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleKeepSignedInChange = (e) => setKeepSignedIn(e.target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login logic (Replace with actual API call)
    if (email === 'test@vkraft.com' && password === '123') {
      navigate('/dashboard'); // Navigate to the dashboard on success
    } else {
      setErrorMessage('Invalid username or password'); // Show error message
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa', // Optional: Set a background color for the page
      }}
    >
      {/* Logo in the top-right corner */}
      <div
        style={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          zIndex: '10',
        }}
      >
        <img
          src="../../assets/images/logo/SUBMARK-2.png"
          alt="logo"
          style={{ maxWidth: '100px' }}
        />
      </div>

      <div
        className="col-md-6 d-flex align-items-center justify-content-center"
      >
        <div className="auth-form-light text-center p-5 w-75">
          <div className="brand-logo text-center">
            <img
              src="../../assets/images/logo/VK1.png"
              alt="logo"
              style={{ maxWidth: '250px' }}
            />
          </div>
  
          <p className="font-weight-light text-center">Sign in to continue.</p>
          {errorMessage && (
            <div
              className="alert alert-danger text-center"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
  
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
  
            <div className="mt-3 d-grid gap-2">
              <button
                type="submit"
                className="btn btn-block btn-lg font-weight-medium auth-form-btn"
                style={{
                  background: 'linear-gradient(to right, #fb2727, #ffbc55)',
                  border: 'none',
                  color: 'white',
                }}
              >
                SIGN IN
              </button>
            </div>
            <div className="my-2 d-flex justify-content-between align-items-center">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={keepSignedIn}
                    onChange={handleKeepSignedInChange}
                  />{' '}
                  Keep me signed in
                </label>
              </div>
              <a
                href="#"
                className="auth-link"
                style={{
                  color: '#fb2727',
                }}
              >
                Forgot password?
              </a>
            </div>
            <div className="text-center mt-4 font-weight-light">
              Don't have an account?{' '}
              <a
                href="register.html"
                style={{
                  color: '#fb2727',
                }}
              >
                Create
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default SignInForm;
