import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('triggers onClick event when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>Click Me</Button>);
    const spinner = screen.getByRole('button').querySelector('[data-testid="spinner"]');
expect(spinner).not.toBeNull();
        
  });

  it('applies correct size styles', () => {
    render(<Button size="small">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveStyle({ padding: '5px 10px' });
  });

  it('applies disabled styles when disabled', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveStyle({ backgroundColor: '#ccc', color: 'rgb(0, 0, 0)' });
  });
});