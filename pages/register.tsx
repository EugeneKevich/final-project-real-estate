import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

const h1Style = css`
  text-align: center;
  padding: 50px;
`;

const formStyle = css`
  width: 300px;
  height: 500px;
  margin: auto;
  margin-top: 50px;

  input {
    width: 100%;
    height: 45px;
    margin: 20px 0;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 5px #c2c2c2;
  }
  input:focus {
    outline: none;
    border: 1px solid #4e6c50;
  }
`;

const buttonStyle = css`
  width: 50%;
  height: 45px;
  margin: 20px 25%;
  border: none;
  border-radius: 10px;
  background-color: #4e6c50;
  color: #fff;
  font-size: large;
`;

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function sighnInHandler() {
    const registerResponse = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }
    await props.refreshUserProfile();
    await router.push(`/profile`);
  }
  return (
    <>
      <Head>
        <title>Register Form</title>
        <meta name="description" content="Register new users" />
      </Head>
      <main>
        <h1 css={h1Style}>Registration Form</h1>
        <form css={formStyle}>
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            placeholder="Password"
          />

          <button
            onClick={async () => {
              await sighnInHandler();
            }}
            css={buttonStyle}
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  console.log('token', token);
  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
