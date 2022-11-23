import Head from 'next/head';
import Image from 'next/image';

export default function BuyId(props) {
  return (
    <>
      <Head>
        <title>Houses and Appartments for Sell</title>
        <meta
          name="description"
          content="Find real estate and homes for sale"
        />
      </Head>
      <main>
        <div>
          <Image
            src={props.singleEstate.thumbnail}
            alt="appartment"
            width="300"
            height="200"
          />

          <p>${props.singleEstate.price} </p>
          <p>
            {props.singleEstate.beds} bed {props.singleEstate.baths} baths{' '}
            {props.singleEstate.building_size.size} sqft
          </p>

          <p>{props.singleEstate.line}</p>
          <p>
            {props.singleEstate.neighborhood_name},{' '}
            {props.singleEstate.state_code} {props.singleEstate.postal_code}
          </p>
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
  const singleEstate = properties.find((res) => {
    const estate = res.listing_id === single;
    return estate;
  });

  return {
    props: { singleEstate },
  };
}
