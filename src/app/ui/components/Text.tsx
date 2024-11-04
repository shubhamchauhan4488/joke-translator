import { PropsWithChildren } from "react";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

interface TextBoxProps {
  isTabletOrMobile: boolean;
}

const TextBox = styled.div<TextBoxProps>`
  max-width: ${({ isTabletOrMobile }) => isTabletOrMobile ? '100%' : 'none'};
  font-size: ${({ isTabletOrMobile }) => isTabletOrMobile ? '1rem' : '1.125rem'};
  font-weight: bold;
  margin-bottom: 16px;
  color: #bbb;
`;

const Text: React.FC<PropsWithChildren> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <TextBox isTabletOrMobile={isTabletOrMobile}>
      {children}
    </TextBox>
  );
};

export default Text;
