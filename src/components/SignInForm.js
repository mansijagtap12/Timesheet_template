import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  // Mock credentials for validation
  const validEmail = 'test@vkraft.com';
  const validPassword = '123';

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address.');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    // Check if email and password match the credentials
    if (email === validEmail && password === validPassword) {
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      // Show error message for invalid credentials
      setErrorMessage('Email or password is invalid.');
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: '100vh' }}>
        {/* Left Section - Image */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#ffffff',
          }}
        >
          <div
            style={{
              backgroundImage: `url('/assets/images/bg1.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '60%',
              height: '60%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          ></div>
        </div>

        {/* Right Section - Login Form */}
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: '#f8f9fa',
          }}
        >
          <div className="auth-form-light text-left p-5 w-75">
            <div className="brand-logo text-center">
              <img
                src="../../assets/images/VK1.png"
                alt="logo"
                style={{ maxWidth: '200px' }}
              />
            </div>

            <p className="font-weight-light text-center">Sign in to continue.</p>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Username"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="floatingInput">Username</label>
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
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
    </div>
  );
}
