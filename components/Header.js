import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';

const headerStyles = css`
  width: 100%;
  border: 2px solid #395144;
  display: flex;
  background-color: #fff;
`;

const headerContainer = css`
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1400px;
  height: 70px;
`;

const logotype = css`
  width: 190px;
  height: 20px;
  margin-bottom: 15px;
`;

const navStyles = css`
  a {
    font-size: 18px;
    font-weight: 700;
    color: #4e6c50;
  }

  a + a {
    padding-left: 50px;
  }
`;

const loginStyles = css`
  div:last-child {
    width: 120px;
    height: 35px;
    background-color: #4e6c50;
    border: 1px solid #395144;
    border-radius: 20px;
    color: #f0ebce;
    font-size: 18px;
    font-weight: 700;
  }
`;

const anchorStyle = css`
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  height: 70px;
  text-align: center;
  background-color: #4e6c50;
  display: flex;

  a {
    text-align: center;
    margin-left: 15px;
    color: #f0ebce;
    font-size: 18px;
    font-weight: 700;
    margin: 10px;
  }
`;

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <nav css={headerContainer}>
        <div css={logotype}>
          <Link href="/">
            <Image src={logo} width="190px" height="35px" />
          </Link>
        </div>
        <div css={navStyles}>
          <Link href="/buy">
            <a>BUY</a>
          </Link>
          <Link href="/rent">
            <a>RENT</a>
          </Link>
          <Link href="/sell">
            <a>SELL</a>
          </Link>
        </div>

        {props.user ? (
          <Anchor>
            <div css={anchorStyle}>
              <Link href={`/profile/${props.user.username}`}>
                <a>Profile</a>
              </Link>
              <Link href="/newad">
                <a>Create new ad</a>
              </Link>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </div>
          </Anchor>
        ) : (
          <div css={anchorStyle}>
            <Link href="/register">
              <a>Sign Up</a>
            </Link>

            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
