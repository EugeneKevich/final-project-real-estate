import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Estate } from '../database/newad';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
  // estate?: Estate;
};

const listingStyles = css`
  margin-top: 30px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  gap: 20px;
`;

const cardItemStyles = css`
  width: 300px;
  height: 350px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: auto;
  background-color: #fff;
  box-shadow: 3px 3px 25px #c2c2c2;

  :hover {
    box-shadow: 5px 5px 10px #c2c2c2;
  }

  p + p {
    margin: 20px;
    line-height: 5px;
  }
`;

const imgStyle = css`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const priceStyle = css`
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #4e6c50;

  ~ p {
    font-weight: 500;
  }
`;

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User profile" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Your Profile</title>
        <meta name="description" content="User profile" />
      </Head>
      <main>
        <h1>Profile</h1>
        <div css={listingStyles}>
          <h2>Your ads</h2>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  console.log(context.req.cookies);
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
