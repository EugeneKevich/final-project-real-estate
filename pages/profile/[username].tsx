import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserByUsername, User } from '../../database/users';

type Props = {
  user?: User;
};

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
      <h1>Your Profile</h1>
      id:{props.user.id} username: {props.user.username}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const username = context.query.username as string;

  const user = await getUserByUsername(username.toLowerCase());
  if (!user) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }
  return {
    props: { user },
  };
}
