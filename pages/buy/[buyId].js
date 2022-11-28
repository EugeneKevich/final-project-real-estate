import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getEstateById } from '../../database/newad';
import baths from '../../public/bath.svg';
import beds from '../../public/beds.svg';
import loc from '../../public/loc.svg';
import map from '../../public/map.jpg';
import size from '../../public/size.svg';

const mainStyle = css`
  width: 100%;
`;
const contentStyle = css`
  width: 1200px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;

  div {
    display: flex;
  }
`;

const formStyles = css`
  padding: 50px;
  width: 350px;
  height: 550px;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  input {
    margin: 10px;
    height: 45px;
    border: none;
    border-radius: 10px;
    box-shadow: 3px 3px 10px 3px #c2c2c2;
  }
  input:nth-child(4) {
    height: 65px;
  }
  input:focus {
    outline: none;
    border: 1px solid #4e6c50;
  }
  button {
    margin: 10px;
    margin-top: 20px;
    height: 65px;
    border: none;
    border-radius: 10px;
    background-color: #4e6c50;
    color: #fff;
    font-size: large;

    a {
      color: #f2f2f2;
    }
  }
`;
const imageStyle = css`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const priceStyle = css`
  color: #4e6c50;
  font-size: 42px;
  margin-left: 25px;
`;
const propertiesStyle = css`
  margin-left: 25px;

  p {
    margin-left: 10px;
    margin-right: 30px;
    font-size: 24px;
  }
`;

const propertiesStyle2 = css`
  margin-left: 25px;

  p {
    font-size: 32px;
    margin-left: 20px;
    margin-right: 50px;
  }
`;

export default function BuyId(props) {
  if (!props.estate) {
    return (
      <>
        <Head>
          <title>Houses and Appartments for Sell</title>
          <meta
            name="description"
            content="Find real estate and homes for sale"
          />
        </Head>
        <main css={mainStyle}>
          <div css={contentStyle}>
            <div>
              <Image
                src={props.realApi.thumbnail}
                alt="appartment"
                width="850px"
                height="500px"
                css={imageStyle}
              />
              <form css={formStyles}>
                <input id="fullName" placeholder="Full Name" />
                <input id="Email" placeholder="Email" />
                <input id="Phone" placeholder="Phone" />
                <input
                  id="Message"
                  placeholder="I'm interested in this offer"
                />
                <button>
                  <Link href="mailto:eugene.kevich@gmail.com">
                    <a>Send E-mail</a>
                  </Link>
                </button>
              </form>
            </div>
            <div css={priceStyle}>
              <p>${props.realApi.price} </p>
            </div>
            <div css={propertiesStyle}>
              <Image alt="iconBed" src={beds} width="35px" height="35px" />
              <p>{props.realApi.beds}</p>{' '}
              <Image alt="iconBath" width="40px" height="40px" src={baths} />
              <p>beds {props.realApi.baths} baths </p>
            </div>
            <div css={propertiesStyle2}>
              {' '}
              <Image alt="iconSize" src={size} width="35px" height="35px" />
              <p>{props.realApi.building_size.size} sqft</p>
              <Image alt="iconAddress" src={loc} width="35px" height="35px" />
              <p>
                {props.realApi.address.line}
                {props.realApi.address.neighborhood_name},{' '}
                {props.realApi.address.state_code}{' '}
                {props.realApi.address.postal_code}
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Houses and Appartments for Sell</title>
        <meta
          name="description"
          content="Find real estate and homes for sale"
        />
      </Head>
      <main css={mainStyle}>
        <div css={contentStyle}>
          <div>
            <Image
              src={props.estate.images}
              alt="appartment"
              width="850px"
              height="500px"
              css={imageStyle}
            />
            <form css={formStyles}>
              <input id="fullName" placeholder="Full Name" />
              <input id="Email" placeholder="Email" />
              <input id="Phone" placeholder="Phone" />
              <input id="Message" placeholder="I'm interested in this offer" />

              <button>
                <Link href="mailto:eugene.kevich@gmail.com">Send E-mail</Link>
              </button>
            </form>
          </div>

          <p css={priceStyle}>${props.estate.price} </p>

          <div css={propertiesStyle}>
            <Image alt="iconBed" src={beds} width="35px" height="35px" />

            <p>{props.estate.beds} bed</p>
            <Image alt="iconBath" width="40px" height="40px" src={baths} />
            <p>{props.estate.baths} baths </p>
          </div>

          <div css={propertiesStyle2}>
            <Image alt="iconSize" src={size} width="35px" height="35px" />
            <p>{props.estate.buildingSize} sqft</p>
            <Image alt="iconAddress" src={loc} width="35px" height="35px" />
            <p>{props.estate.adress}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const fetch = await require('node-fetch');

  const url =
    'https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=New%20York%20City&state_code=NY&offset=0&limit=16&sort=photos';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com',
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();

  const single = context.query.buyId;
  const properties = data.properties;

  const realApi = properties.find((resp) => {
    const tempEstate = resp.listing_id === single;
    return tempEstate;
  });

  if (single < 200) {
    const estate = await getEstateById(single);
    return {
      props: { estate },
    };
  }

  return {
    props: { realApi },
  };
}
