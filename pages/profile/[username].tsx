import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Estate, getEstateByUserId } from '../../database/newad';
import { getUserByUsername, User } from '../../database/users';

type Props = {
  user?: User;
  estate?: Estate;
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
        <h1>Your Profile</h1>
        id:{props.user.id} username: {props.user.username}
        <div css={cardItemStyles}>
          <Image
            src={`${props.estate?.images}`}
            alt="appartment"
            width="300"
            height="200"
            css={imgStyle}
          />

          <p css={priceStyle}>${props.estate?.price} </p>
          <p>
            {props.estate?.beds} bed {props.estate?.baths} baths{' '}
            {props.estate?.buildingSize} sqft
          </p>

          <p>{props.estate?.adress},</p>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const username = context.query.username as string;

  const user = await getUserByUsername(username.toLowerCase());
  if (!user) {
    context.res.statusCode = 404;
    console.log(context.req);
    return {
      props: {},
    };
  }
  const data = await getEstateByUserId(user.id);
  const estate = JSON.parse(JSON.stringify(data)) as Array<Estate>;
  console.log(estate);
  return {
    props: { user, estate },
  };
}
