import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Estate,
  getEstateByUserId,
  updateEstateByid,
} from '../../database/newad';
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

const style = css`
  width: 100%;
  margin: 20px 38%;
  margin-top: 200px;
`;

const buttonStyle = css`
  width: 80;
  height: 25px;
  margin-top: 20px;
  margin: auto;
  margin-left: 20px;
  border: none;
  border-radius: 10px;
  background-color: #4e6c50;
  font-size: 18px;
  color: #f0ebce;

  :hover {
    width: 80;
    height: 25px;

    margin-left: 20px;
    border: none;
    border-radius: 10px;
    background-color: #f0ebce;
    border: 1px solid #4e6c50;
    color: #4e6c50;
    font-size: large;
  }
`;

const h1Style = css`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;

  p {
    font-size: 24px;
  }
`;
export default function UserProfile(props: Props) {
  const [statusOnEditInput, setStatusOnEditInput] = useState('');
  const [bathsOnEditInput, setBathsOnEditInput] = useState('');
  const [bedsOnEditInput, setBedsOnEditInput] = useState('');
  const [buildingSizeOnEditInput, setBuildingSizeOnEditInput] = useState('');
  const [priceOnEditInput, setPriceOnEditInput] = useState('');
  const [adressEditInput, setAdressOnEditInput] = useState('');

  const [onEditId, setOnEditId] = useState<number | undefined>();

  async function updateEstateById(id: number) {
    const response = await fetch(`api/newad.ts/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        status: statusOnEditInput,
        baths: bathsOnEditInput,
        beds: bedsOnEditInput,
        building_size: buildingSizeOnEditInput,
        price: priceOnEditInput,
        adress: adressEditInput,
      }),
    });
    const updatedEstate = (await response.json()) as Estate;
  }
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

  if (!props.estate) {
    return (
      <>
        <Head>
          <title>You don't have any ads</title>
          <meta name="description" content="User profile" />
        </Head>
        <div css={h1Style}>
          <h1>You don't have any ads yet</h1>
          <button css={buttonStyle}>
            <Link href="/newad">Create new ad</Link>
          </button>
        </div>
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
        <div css={h1Style}>
          <h1>Your Profile</h1>
          <p>username: {props.user.username}</p>
        </div>
        <div css={cardItemStyles}>
          {props.estate.map((res) => {
            return (
              <div key={res.id} css={cardItemStyles}>
                <Link href={`/${props.user?.username}/${res.id}`}>
                  <Image
                    src={`${res.images}`}
                    alt="appartment"
                    width="300"
                    height="200"
                    css={imgStyle}
                  />
                </Link>
                <p css={priceStyle}>${res.price} </p>
                <p>
                  {res.beds} bed {res.baths} baths {res.buildingSize} sqft
                </p>

                <p>{res.adress}</p>

                <button css={buttonStyle}>
                  <a>Delete</a>
                </button>
                <button css={buttonStyle}>
                  <a>Edit</a>
                </button>
              </div>
            );
          })}
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

  const estate = await getEstateByUserId(user.id);

  if (estate !== undefined) {
    return {
      props: { user, estate },
    };
  }

  return {
    props: { user },
  };
}
