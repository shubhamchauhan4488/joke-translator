import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Dropdown from '../Dropdown';

const sampleOptions = [
  { key: 'option1', value: 'Option 1' },
  { key: 'option2', value: 'Option 2' },
  { key: 'option3', value: 'Option 3' },
];

describe('Dropdown Component', () => {
  it('renders correctly with given props', () => {
    render(
      <Dropdown
        options={sampleOptions}
        onChange={() => {}}
        ariaLabel="Test Dropdown"
        value="option1"
        disabled={false}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: 'Test Dropdown' });
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('option1');
  });

  it('renders options correctly', () => {
    render(
      <Dropdown
        options={sampleOptions}
        onChange={() => {}}
        ariaLabel="Test Dropdown"
        value="option1"
        disabled={false}
      />
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveTextContent('Option 2');
    expect(options[2]).toHaveTextContent('Option 3');
  });

  it('calls onChange handler when a new option is selected', () => {
    const handleChange = vi.fn();
    render(
      <Dropdown
        options={sampleOptions}
        onChange={handleChange}
        ariaLabel="Test Dropdown"
        value="option1"
        disabled={false}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: 'Test Dropdown' });
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    render(
      <Dropdown
        options={sampleOptions}
        onChange={() => {}}
        ariaLabel="Test Dropdown"
        value="option1"
        disabled={true}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: 'Test Dropdown' });
    expect(selectElement).toBeDisabled();
  });

  it('has the correct aria-label attribute', () => {
    render(
      <Dropdown
        options={sampleOptions}
        onChange={() => {}}
        ariaLabel="Accessible Dropdown"
        value="option1"
        disabled={false}
      />
    );

    const selectElement = screen.getByRole('combobox', { name: 'Accessible Dropdown' });
    expect(selectElement).toHaveAttribute('aria-label', 'Accessible Dropdown');
  });
});
