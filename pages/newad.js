import { css } from '@emotion/react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Head from 'next/head';
import { useState } from 'react';

const h1Style = css`
  text-align: center;
  padding: 50px;
`;

const formStyles = css`
  margin: auto;
  width: 45%;
  display: flex;
  justify-content: space-between;
`;

const inputStleColumnLeft = css`
  display: flex;
  flex-direction: column;

  input {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 5px;
    width: 300px;
    height: 45px;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 5px #c2c2c2;
  }
  input:focus {
    outline: none;
  }
`;

const inputStleColumnRight = css`
  display: flex;
  flex-direction: column;
  input {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 20px;
    width: 300px;
    height: 45px;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 5px #c2c2c2;
  }

  input:focus {
    outline: none;
    border: 1px solid #4e6c50;
  }
`;

const imageUploadStyle = css`
  margin: auto;
  width: 45%;

  align-items: center;

  input::file-selector-button {
    width: 120px;
    height: 45px;
    margin: 10px;
    border: 1px solid #4e6c50;
    border-radius: 10px;
    background-color: #f0ebce;
    color: #4e6c50;
    font-size: large;

    :hover {
      width: 120px;
      height: 45px;

      border: none;
      border-radius: 10px;
      background-color: #4e6c50;
      color: #f0ebce;
      font-size: large;
    }
  }

  img {
    width: 200px;
    height: 150px;
    margin: 20px;
  }

  button {
    width: 180px;
    height: 45px;
    margin: 10px;
    margin-left: 195px;
    border: 1px solid #4e6c50;
    border-radius: 10px;
    background-color: #f0ebce;
    color: #4e6c50;
    font-size: large;

    :hover {
      width: 180px;
      height: 45px;
      border: none;
      border-radius: 10px;
      background-color: #4e6c50;
      color: #f0ebce;
      font-size: large;
    }
  }
`;

const buttonStyle = css`
  width: 25%;
  height: 45px;
  margin: 20px 38%;
  border: none;
  border-radius: 10px;
  background-color: #4e6c50;
  color: #fff;
  font-size: large;

  :hover {
    width: 25%;
    height: 45px;
    margin: 20px 38%;
    border: none;
    border-radius: 10px;
    background-color: #f0ebce;
    border: 1px solid #4e6c50;
    color: #4e6c50;
    font-size: large;
  }
`;

export default function New() {
  const [status, setStatus] = useState('');
  const [yearBuilt, setYearBuilt] = useState(0);
  const [baths, setBaths] = useState(0);
  const [beds, setBeds] = useState(0);
  const [buildingSize, setBuildingSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [adress, setAdress] = useState('');
  const [garage, setGarage] = useState(0);
  const [imageLink, setImageLink] = useState();
  const [image, setImage] = useState();

  async function createAdHandler() {
    const createAdResponse = await fetch('/api/newad', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        status,
        yearBuilt,
        baths,
        beds,
        buildingSize,
        price,
        adress,
        garage,
        imageLink,
      }),
    });
    const createAdResponseBody = await createAdResponse.json();
  }

  const uploadImages = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'nseenkxw');

    await axios
      .post('https://api.cloudinary.com/v1_1/dl6zxylrj/image/upload', formData)
      .then((response) => {
        setImageLink(response.data.url);
      });
  };

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = await event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );
    const formData = new FormData();
  }

  return (
    <>
      <Head>
        <title>New Advert</title>
        <meta name="description" content="create a new advert" />
      </Head>
      <main>
        <h1 css={h1Style}>Create a new advert</h1>

        <form onSubmit={handleOnSubmit}>
          <div css={formStyles}>
            <div css={inputStleColumnLeft}>
              <label htmlFor="type">Type</label>
              <input
                id="type"
                value={status}
                onChange={(event) => {
                  setStatus(event.currentTarget.value);
                }}
                placeholder="Apartment, House, Office"
              />

              <label htmlFor="yearBuilt">Built in</label>
              <input
                id="yearBuilt"
                value={yearBuilt}
                onChange={(event) => {
                  setYearBuilt(event.currentTarget.value);
                }}
                placeholder="1990"
              />

              <label htmlFor="baths">Baths</label>
              <input
                id="baths"
                value={baths}
                onChange={(event) => {
                  setBaths(event.currentTarget.value);
                }}
                placeholder="Baths"
              />

              <label htmlFor="beds">Beds</label>
              <input
                id="beds"
                value={beds}
                onChange={(event) => {
                  setBeds(event.currentTarget.value);
                }}
                placeholder="Beds"
              />
            </div>
            <div css={inputStleColumnRight}>
              <label htmlFor="adress">Address</label>
              <input
                id="adress"
                value={adress}
                onChange={(event) => {
                  setAdress(event.currentTarget.value);
                }}
                placeholder="street, house number, district, postal code, city"
              />

              <label htmlFor="buildingSize">Building Size</label>
              <input
                id="buildingSize"
                value={buildingSize}
                onChange={(event) => {
                  setBuildingSize(event.currentTarget.value);
                }}
              />

              <label htmlFor="Price">Price</label>
              <input
                id="Price"
                value={price}
                onChange={(event) => {
                  setPrice(event.currentTarget.value);
                }}
                placeholder="$"
              />

              <label htmlFor="Garage">Garage</label>
              <input
                id="Garage"
                value={garage}
                onChange={(event) => {
                  setGarage(event.currentTarget.value);
                }}
                placeholder="Garage"
              />
            </div>
          </div>
          <div css={imageUploadStyle}>
            <input
              type="file"
              name="file"
              onChange={handleOnChange}
              placeholder=" images"
            />

            <button onClick={uploadImages}>upload images</button>
            <Image
              src={image}
              onLoad={(event) => (event.target.style.display = 'inline-block')}
            />
          </div>

          <button onClick={createAdHandler} css={buttonStyle}>
            Create new ad
          </button>
        </form>
      </main>
    </>
  );
}
