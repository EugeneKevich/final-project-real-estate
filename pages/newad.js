import axios from 'axios';
import { Image } from 'cloudinary-react';
import Head from 'next/head';
import { useState } from 'react';

export default function New() {
  const [status, setStatus] = useState('');
  const [yearBuilt, setYearBuilt] = useState(0);
  const [baths, setBaths] = useState(0);
  const [beds, setBeds] = useState(0);
  const [buildingSize, setBuildingSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [adress, setAdress] = useState('');
  const [garage, setGarage] = useState(0);
  const [imageSrc, setImageSrc] = useState();
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
        imageSrc,
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
        setImageSrc(response.data.url);
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
      <h1>Create a new advert</h1>
      <div>
        <form onSubmit={handleOnSubmit}>
          <label>
            type
            <input
              value={status}
              onChange={(event) => {
                setStatus(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            yearBuilt
            <input
              type="number"
              value={yearBuilt}
              onChange={(event) => {
                setYearBuilt(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            baths
            <input
              type="number"
              value={baths}
              onChange={(event) => {
                setBaths(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            beds
            <input
              type="number"
              value={beds}
              onChange={(event) => {
                setBeds(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            buildingSize
            <input
              type="number"
              value={buildingSize}
              onChange={(event) => {
                setBuildingSize(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            price
            <input
              type="number"
              value={price}
              onChange={(event) => {
                setPrice(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            adress
            <input
              value={adress}
              onChange={(event) => {
                setAdress(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            garage
            <input
              type="number"
              value={garage}
              onChange={(event) => {
                setGarage(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            images
            <input type="file" name="file" onChange={handleOnChange} />
          </label>
          <Image src={image} alt="sdf" width="300px" height="300px" />

          <button onClick={uploadImages}>upload images</button>

          <button onClick={createAdHandler}>Create new ad</button>
        </form>
      </div>
    </>
  );
}
