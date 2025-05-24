import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  border-radius: 8px;
  margin: 1rem;
  background-color: ${({ theme }) => theme['green-500']};

  /* ${variant => {
      return css`
        background-color: ${buttonVariants[variant.variant]};
      `
  }} */
`;