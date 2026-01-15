'use client';
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 138px;
  background-color: black;
  font-family: var(--font-manrope), sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
export default function Footer() {
    return (
        <FooterContainer>
            Copyright ©  2025 - Les Petits Plats
        </FooterContainer>
    );
}