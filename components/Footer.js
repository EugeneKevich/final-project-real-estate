import { css } from '@emotion/react';

const footerStyles = css`
  border-top: 2px solid #ccc;
  background-color: #fff;
  width: 100%;
  padding: 10px;
  position: static;
  bottom: 0;
  left: 0;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <p>footer</p>
    </footer>
  );
}
