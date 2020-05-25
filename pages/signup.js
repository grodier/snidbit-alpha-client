import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Navbar from '../components/Navbar';
import { useFormFields } from '../libs/hooksLib';
import { onError } from '../libs/errorLib';

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });

  const [newUser, setNewUser] = useState(null);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const newUser = await Auth.signUp({
        username: fields.username,
        password: fields.password,
        attributes: {
          email: fields.email,
        },
      });
      setNewUser(newUser);
    } catch (e) {
      onError(e);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(fields.username, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
    } catch (e) {
      onError(e);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <div>
          <label htmlFor="confirmationCode">Confirmation Code</label>
          <input
            autoFocus
            type="tel"
            id="confirmationCode"
            value={fields.confirmationCode}
            onChange={handleFieldChange}
          />
          <p>Please check your email for the code.</p>
        </div>
        <button type="submit" disabled={!validateConfirmationForm()}>
          Verify
        </button>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            type="text"
            id="username"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </div>
        <button type="submit" disabled={!validateForm()}>
          Signup
        </button>
      </form>
    );
  }

  return (
    <div>
      <Navbar />
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
