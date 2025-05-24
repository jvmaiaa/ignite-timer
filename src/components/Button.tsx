import { ButtonContainer, type ButtonVariant } from './styles';

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = ({variant}: ButtonProps) => {
  return (
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  );
};