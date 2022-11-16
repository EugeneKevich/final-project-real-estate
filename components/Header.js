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
  height: 35px;
`;

const navStyles = css`
  a {
    font-size: 18px;
    font-weight: 700;
    color: #261d16;
  }

  a + a {
    padding-left: 50px;
  }
`;

const loginStyles = css`
  a {
    font-size: 18px;
    font-weight: 700;
    color: #261d16;
    padding-right: 20px;
  }

  button {
    width: 80px;
    height: 35px;
    background-color: #4e6c50;
    border: 1px solid #395144;
    border-radius: 20px;
    color: #f0ebce;
    font-size: 18px;
    font-weight: 500;
  }
`;

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <div css={headerContainer}>
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
          <Link href="/">
            <a>SOLD</a>
          </Link>
        </div>

        {props.user && props.user.username}
        {props.user ? (
          <Anchor
            css={css`
              margin-left: 10px;
            `}
            href="/logout"
          >
            Logout
          </Anchor>
        ) : (
          <div css={loginStyles}>
            <Link href="/register">Sign Up</Link>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
