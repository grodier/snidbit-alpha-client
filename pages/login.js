import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import Navbar from '../components/Navbar';
import { onError } from '../libs/errorLib';
import { useFormFields } from '../libs/hooksLib';
import { LabelAndInput, SubmitButton } from '../components/FormComponents';
import { ContentContainer } from '../components/Containers';

function Login() {
  const { authStatus, redirectHome } = useAppContext();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      redirectHome();
    }
  }, [authStatus]);

  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

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
      {authStatus === 'unauthenticated' && (
        <>
          <Navbar />
          <ContentContainer>
            <div className="flex flex-col py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Welcome back to <span className="font-logo">SnidBit</span>
                </h2>
              </div>

              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 sm:px-10">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <LabelAndInput
                        id="email"
                        label="Email"
                        type="email"
                        value={fields.email}
                        placeholder="bobby.jean@springsteen.com"
                        onChangeHandler={handleFieldChange}
                        autofocus
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
                      <SubmitButton>Sign In</SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ContentContainer>
        </>
      )}
    </div>
  );
}

export default Login;
