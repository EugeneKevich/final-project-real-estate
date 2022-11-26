import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import banner from '../public/banner2.jpg';
import sell5 from '../public/sel5.svg';
import sell1 from '../public/sell1.svg';
import sell2 from '../public/sell2.svg';
import sell3 from '../public/sell3.svg';
import sell4 from '../public/sell4.svg';
import sell6 from '../public/sell6.svg';
import sell7 from '../public/sell7.svg';

const containerStyles = css`
  width: 1200px;
  margin: auto;
  margin-top: 50px;
`;

const firstBlock = css`
  display: flex;
  justify-content: space-between;

  div:nth-child(1) {
    h3 {
      margin-top: 30px;
    }
    button {
      margin-top: 20px;
    }
  }

  div:nth-child(2) {
    button {
      margin-top: 40px;
    }
  }

  div:nth-child(3) {
    h3 {
      margin-top: 30px;
    }
  }

  div {
    width: 385px;
    border: 1px solid #4e6c50;
    margin-bottom: 50px;
    padding: 25px;
    text-align: center;
    background-color: #f2f2f2;
    bottom: 0;

    h3 {
      color: #4e6c50;
      margin-top: 20px;
    }

    button {
      height: 30px;
      border-radius: 10px;
      border: 2px solid #4e6c50;
      background-color: #fff;
      font-size: 16px;
      font-weight: 550;

      a {
        color: #4e6c50;
      }
    }
  }
`;

const secondBlock = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

  div {
    width: 285px;
    border: 1px solid #4e6c50;
    padding: 20px;
    text-align: center;

    p {
      width: 30px;
      height: 30px;
      padding: 5px;
      border: 1px solid #4e6c50;
      background-color: #fff;
      border-radius: 50%;
      font-weight: 500;
      color: #4e6c50;
      margin: auto;
      margin-top: 15px;
    }

    h3 {
      color: #4e6c50;
    }
  }
`;

export default function Sell() {
  return (
    <>
      <Head>
        <title>Sell my House</title>
        <meta name="description" content="Learn how to sell your home" />
      </Head>

      <main>
        <div>
          <Image src={banner} alt="houses" />
        </div>

        <div css={containerStyles}>
          <h1>Let's find the right selling option for you</h1>
          <div css={firstBlock}>
            <div>
              <Image alt="guide" src={sell1} />
              <h3>Get offers for your home</h3>
              <p>
                Visit Seller’s Marketplace to find out how you can sell without
                listing or stay in your home while you finance the purchase of
                your next one.
              </p>
              <button>
                <Link href="/sell">
                  <a>Visit Seller's Marketplace</a>
                </Link>
              </button>
            </div>
            <div>
              <Image alt="guide" src={sell2} />
              <h3>Pick the right agent for you</h3>

              <p>
                Answer a few questions and get a list of top agents in your
                area. Compare their costs and services, and choose the right
                agent for you
              </p>
              <button>
                <Link href="/sell">
                  <a>Get Started</a>
                </Link>
              </button>
            </div>
            <div>
              <Image alt="guide" src={sell3} />
              <h3>Find out how much home equity you can use</h3>
              <p>
                If you're looking to fund a home renovation project or a down
                payment on a new place, the equity in your home could help.
                Connect with a lender to see if you qualify.
              </p>
              <button>
                <Link href="/sell">
                  <a>Connect with a lender</a>
                </Link>
              </button>
            </div>
          </div>
          <div css={secondBlock}>
            <div>
              <Link href="/sell">
                <Image alt="sell2" src={sell4} />
              </Link>
              <p>1</p>

              <h3>Should I sell my home now?</h3>
            </div>
            <div>
              <Link href="/sell">
                <Image alt="sell2" src={sell5} />
              </Link>
              <p>2</p>

              <h3>How much is my home worth?</h3>
            </div>
            <div>
              <Link href="/sell">
                <Image alt="sell2" src={sell6} />
              </Link>
              <p>3</p>

              <h3>How should I sell my home?</h3>
            </div>
            <div>
              <Link href="/sell">
                <Image alt="sell2" src={sell7} />
              </Link>
              <p>4</p>

              <h3>How to prepare my home for sale</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
