import { css } from '@emotion/react';

const footerStyles = css`
  border-top: 2px solid #ccc;
  background-color: #fff;
  padding: 20px;
`;

export default function Footer() {
  return <p css={footerStyles}>footer</p>;
}
