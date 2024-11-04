import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from '../Text';
import * as reactResponsive from 'react-responsive';
import { vi } from 'vitest';


describe('Text Component', () => {
  const mockUseMediaQuery = vi.spyOn(reactResponsive, 'useMediaQuery');

  it('should render children correctly', () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(
      <Text>
        <p>Test Text Content</p>
      </Text>
    );

    expect(screen.getByText('Test Text Content')).toBeInTheDocument();
  });

  it('should use full width when isTabletOrMobile is true', () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(
      <Text>
        <p>Responsive Text Content</p>
      </Text>
    );

    const textElement = screen.getByText('Responsive Text Content').parentElement;
    expect(textElement).toHaveStyle('max-width: 100%');
    expect(textElement).toHaveStyle('font-size: 1rem');
  });

  it('should use different styles when isTabletOrMobile is false', () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(
      <Text>
        <p>Non-Responsive Text Content</p>
      </Text>
    );

    const textElement = screen.getByText('Non-Responsive Text Content').parentElement;
    expect(textElement).toHaveStyle('max-width: none');
    expect(textElement).toHaveStyle('font-size: 1.125rem');
  });
});
