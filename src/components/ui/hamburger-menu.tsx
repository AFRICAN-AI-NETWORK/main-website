import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerMenu = forwardRef<HTMLButtonElement, HamburgerMenuProps>(
  ({ isOpen, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn('w-6 h-6 relative focus:outline-none', className)}
        onClick={onClick}
      >
        <span className="sr-only">Toggle menu</span>
        <div className="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span
            className={cn(
              'block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out',
              isOpen ? 'rotate-45' : '-translate-y-2'
            )}
          />
          <span
            className={cn(
              'block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out',
              isOpen ? 'opacity-0' : 'opacity-100'
            )}
          />
          <span
            className={cn(
              'block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out',
              isOpen ? '-rotate-45' : 'translate-y-2'
            )}
          />
        </div>
      </button>
    );
  }
);

HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;
