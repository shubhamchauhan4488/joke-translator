import { PropsWithChildren } from "react";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

interface BoxProps {
  isTabletOrMobile: boolean;
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
  background-color: #333;
  border-radius: 8px;
  width: ${({ isTabletOrMobile }) => isTabletOrMobile ? '100%' : '400px'};
  max-width: ${({ isTabletOrMobile }) => isTabletOrMobile ? '100%' : 'none'};
  height: 300px;
  box-shadow: 0px 4px 20px rgba(0, 101, 96, 0.5);
  overflow-wrap: break-word;
`;

const Card: React.FC<PropsWithChildren> = ({ children, ...rest }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Box isTabletOrMobile={isTabletOrMobile} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
