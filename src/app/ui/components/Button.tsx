// components/Button.tsx
'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const buttonStyles = {
  primary: css`
    background-color: #006560;
    color: white;

    &:hover {
      background-color: #04b8af;
    }

    &:disabled {
      background-color: #ccc;
      color: black;
    }
  `,
  secondary: css`
    background-color: #555;
    color: white;

    &:hover {
      background-color: #777;
    }

    &:disabled {
      background-color: #ccc;
      color: black;
    }
  `,
};

const sizes = {
  small: css`
    padding: 5px 10px;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 10px 15px;
    font-size: 1rem;
  `,
  large: css`
    padding: 15px 20px;
    font-size: 1.25rem;
  `,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${({ variant }) => (variant ? buttonStyles[variant] : buttonStyles.primary)}
  ${({ size }) => (size ? sizes[size] : sizes.medium)}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 2px solid #ccc;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled || loading} variant={variant} size={size}>
      {loading && <Spinner />}
      {children}
    </StyledButton>
  );
};
