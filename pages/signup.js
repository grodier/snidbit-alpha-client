import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Navbar from '../components/Navbar';
import { LabelAndInput, SubmitButton } from '../components/FormComponents';
import { useFormFields } from '../libs/hooksLib';
import { onError } from '../libs/errorLib';
import { ContentContainer } from '../components/Containers';

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
      <>
        <div className="flex flex-col py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Almost there!
            </h2>
            <p className="text-gray-900 font-bold mt-1 text-center">
              Please check your email for the code.
            </p>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:px-10">
              <form onSubmit={handleConfirmationSubmit}>
                <div>
                  <LabelAndInput
                    id="confirmationCode"
                    label="Confirmation Code"
                    type="tel"
                    value={fields.confirmationCode}
                    onChangeHandler={handleFieldChange}
                    isRequired={true}
                    autofocus={true}
                    placeholder="123456"
                  />
                </div>

                <div className="mt-6">
                  <SubmitButton>Verify</SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderForm() {
    return (
      <>
        <div className="flex flex-col py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Sign up for <span className="font-logo">SnidBit</span>
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 sm:px-10">
              <form onSubmit={handleSubmit}>
                <div>
                  <LabelAndInput
                    id="username"
                    label="Username"
                    type="text"
                    value={fields.username}
                    onChangeHandler={handleFieldChange}
                    isRequired={true}
                    autofocus={true}
                    placeholder="Bobby Jean"
                  />
                </div>

                <div className="mt-6">
                  <LabelAndInput
                    id="email"
                    label="Email"
                    type="email"
                    value={fields.email}
                    placeholder="bobby.jean@springsteen.com"
                    onChangeHandler={handleFieldChange}
                    isRequired={true}
                  />
                </div>

                <div className="mt-6">
                  <LabelAndInput
                    id="password"
                    label="Password"
                    type="password"
                    value={fields.password}
                    placeholder="Sup3rS3cret!"
                    onChangeHandler={handleFieldChange}
                    isRequired={true}
                  />
                </div>

                <div className="mt-6">
                  <LabelAndInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={fields.confirmPassword}
                    onChangeHandler={handleFieldChange}
                    placeholder="Sup3rS3cret!"
                    isRequired={true}
                  />
                </div>

                <div className="mt-6">
                  <SubmitButton disabled={!validateForm()}>
                    Sign Up
                  </SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <ContentContainer>
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </ContentContainer>
    </div>
  );
}
