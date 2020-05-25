import React from 'react';
import { Auth } from 'aws-amplify';
import Navbar from '../components/Navbar';
import { onError } from '../libs/errorLib';
import { useFormFields } from '../libs/hooksLib';

function Login() {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
    } catch (e) {
      onError(e);
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            autoFocus
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
        <button disabled={!validateForm()} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
