import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { User } from '../database/users';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
  user?: User;
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
`;
const usernameStyle = css`
  width: 100%;
  height: 45px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px #c2c2c2;

  :focus {
    outline: none;
    border: 1px solid #4e6c50;
  }
`;

const passwordStyle = css`
  width: 100%;
  height: 45px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px #c2c2c2;

  :focus {
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

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;
    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }
    await props.refreshUserProfile();
    await router.push(`/profile`);
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login new user" />
      </Head>
      <main>
        <h1 css={h1Style}>Login</h1>

        <form css={formStyle}>
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
            placeholder="Username"
            css={usernameStyle}
          />
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
            placeholder="Password"
            css={passwordStyle}
          />
          <button
            onClick={async () => {
              await loginHandler();
            }}
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/profile',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
