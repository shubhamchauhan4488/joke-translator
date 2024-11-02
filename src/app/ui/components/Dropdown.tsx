'use client';

import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #555;
  border-radius: 10px;
  background-color: #006560;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #04b8af;
  }

  &:disabled {
    color: black;
    background-color: #ccc;
  }
`;

interface Option {
  key: string;
  value: string;
}

interface DropdownProps {
  id?: string;
  options: Option[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  disabled: boolean;
  ariaLabel: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange = () => { }, ariaLabel, id, value }) => {
  return (
    <StyledSelect
      onChange={onChange}
      aria-label={ariaLabel}
      id={id}
      value={value}
    >
      {options.map(({ key, value }) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Dropdown;
