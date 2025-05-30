'use client';

import { clsx } from 'clsx';
import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { FieldError } from '@/vibes/soul/form/field-error';
import { Label } from '@/vibes/soul/form/label';

export const NumberInput = React.forwardRef<
  React.ComponentRef<'input'>,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & {
    label?: string;
    errors?: string[];
    decrementLabel?: string;
    incrementLabel?: string;
  }
>(
  (
    {
      label,
      className,
      required,
      errors,
      decrementLabel,
      incrementLabel,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const id = React.useId();

    return (
      <div className={clsx('space-y-2', className)}>
        {label != null && label !== '' && <Label htmlFor={id}>{label}</Label>}
        <div className="inline-flex items-center rounded-lg border">
          <button
            aria-label={decrementLabel}
            className={clsx(
              'group rounded-l-lg p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              !disabled && 'hover:bg-contrast-100/50',
              disabled && 'cursor-not-allowed opacity-30',
            )}
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();

              const input = e.currentTarget.parentElement?.querySelector('input');

              input?.stepDown();
              input?.dispatchEvent(new InputEvent('change', { bubbles: true, cancelable: true }));
            }}
          >
            <Minus
              className={clsx(
                'text-contrast-300 transition-colors duration-300',
                !disabled && 'group-hover:text-foreground',
              )}
              size={18}
              strokeWidth={1.5}
            />
          </button>
          <input
            {...rest}
            className={clsx(
              'w-8 flex-1 select-none justify-center text-center [appearance:textfield] focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              disabled && 'cursor-not-allowed opacity-30',
            )}
            disabled={disabled}
            id={id}
            ref={ref}
            type="number"
          />
          <button
            aria-label={incrementLabel}
            className={clsx(
              'group rounded-r-lg p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              !disabled && 'hover:bg-contrast-100/50',
              disabled && 'cursor-not-allowed opacity-30',
            )}
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();

              const input = e.currentTarget.parentElement?.querySelector('input');

              input?.stepUp();
              input?.dispatchEvent(new InputEvent('change', { bubbles: true, cancelable: true }));
            }}
          >
            <Plus
              className={clsx(
                'text-contrast-300 transition-colors duration-300',
                !disabled && 'group-hover:text-foreground',
              )}
              size={18}
              strokeWidth={1.5}
            />
          </button>
        </div>
        {errors?.map((error) => <FieldError key={error}>{error}</FieldError>)}
      </div>
    );
  },
);

NumberInput.displayName = 'NumberInput';
