import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';
import * as reactResponsive from 'react-responsive';
import { vi } from 'vitest';

describe('Card Component', () => {
  const mockUseMediaQuery = vi.spyOn(reactResponsive, 'useMediaQuery');

  it('should render children correctly', () => {
    mockUseMediaQuery.mockReturnValue(false);
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should use full width when isTabletOrMobile is true', () => {
    mockUseMediaQuery.mockReturnValue(true);
    render(
      <Card>
        <p>Responsive Content</p>
      </Card>
    );

    const cardElement = screen.getByText('Responsive Content').parentElement;
    expect(cardElement).toHaveStyle('width: 100%');
  });

  it('should use fixed width when isTabletOrMobile is false', () => {
    mockUseMediaQuery.mockReturnValue(false);
    render(
      <Card>
        <p>Non-Responsive Content</p>
      </Card>
    );

    const cardElement = screen.getByText('Non-Responsive Content').parentElement;
    expect(cardElement).toHaveStyle('width: 400px');
  });
});
