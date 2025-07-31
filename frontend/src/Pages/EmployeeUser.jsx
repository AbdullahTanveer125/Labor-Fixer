import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeUser.css';
import { useNavigate } from 'react-router-dom';

const EmployeeUser = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    jobCategory: [],
    availability: '',
    hourlyRate: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  const jobCategories = [
    'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Cleaning',
    'Landscaping', 'HVAC', 'Roofing', 'Masonry', 'General Labor'
  ];

  const availabilityOptions = [
    'Full-time', 'Part-time', 'Weekends only', 'Evenings only', 'On-call'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'jobCategory') {
        const updatedCategories = checked
          ? [...formData.jobCategory, value]
          : formData.jobCategory.filter(cat => cat !== value);
        setFormData(prev => ({ ...prev, jobCategory: updatedCategories }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.jobCategory.length === 0) newErrors.jobCategory = 'At least one job category is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    console.log('Validation errors:', newErrors);
    console.log('Form data:', formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log("Form validation result:", isValid);
    console.log("Current errors state:", errors);

    if (!isValid) {
      console.log("Form validation failed, errors:", errors);
      return;
    }

    console.log("After formData");
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/employee/signup', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profileImage: formData.profileImage,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        jobCategory: formData.jobCategory,
        availability: formData.availability,
        hourlyRate: parseFloat(formData.hourlyRate),
        description: formData.description
      });

      setUserId(response.data.userId);
      setShowVerification(true);
      setMessage('Please check your email for verification code.');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim()) {
      setMessage('Please enter verification code');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/employee/verify-email', {
        userId: userId,
        verificationCode: verificationCode
      });

      setMessage('Email verified successfully! You can now login.');
      setShowVerification(false);
      setFormData({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
        profileImage: '', gender: '', dateOfBirth: '', address: '',
        jobCategory: [], availability: '', hourlyRate: '', description: ''
      });
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:5000/employee/resend-verification', {
        email: formData.email
      });
      setMessage('New verification code sent to your email.');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to resend code.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="employee-signup-container">
        <div className="signup-form">
          <h2>Email Verification</h2>
          <p>Please enter the verification code sent to your email.</p>

          <form onSubmit={handleVerification}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength="6"
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>

            <button type="button" onClick={handleResendCode} disabled={isLoading}>
              Resend Code
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="employee-signup-container">
      <div className="signup-form">
        <h2>Employee Signup</h2>
        <p>Join our platform as a service provider</p>

        <form onSubmit={handleSubmit}>
          {/* Debug: Show all errors */}
          {Object.keys(errors).length > 0 && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ef5350'
            }}>
              <strong>Please fix the following errors:</strong>
              <ul style={{ margin: '5px 0 0 20px' }}>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password (at least 6 characters)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
              {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label>Hourly Rate ($) *</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="Enter hourly rate"
                min="0"
                step="0.01"
              />
              {errors.hourlyRate && <span className="error">{errors.hourlyRate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              type="url"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleInputChange}
              placeholder="Enter profile image URL (optional)"
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full address"
              rows="3"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Job Categories *</label>
            <div className="checkbox-group">
              {jobCategories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="jobCategory"
                    value={category}
                    checked={formData.jobCategory.includes(category)}
                    onChange={handleInputChange}
                  />
                  {category}
                </label>
              ))}
            </div>
            {errors.jobCategory && <span className="error">{errors.jobCategory}</span>}
          </div>

          <div className="form-group">
            <label>Availability *</label>
            <select name="availability" value={formData.availability} onChange={handleInputChange}>
              <option value="">Select availability</option>
              {availabilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.availability && <span className="error">{errors.availability}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your skills and experience"
              rows="4"
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default EmployeeUser; 