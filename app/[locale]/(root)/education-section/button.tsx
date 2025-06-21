import React from 'react';
import classNames from 'classnames';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export default function Button({ className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        'bg-violet-700 hover:bg-violet-800 text-white font-medium px-4 py-2 rounded transition',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
