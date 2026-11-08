import { useEffect, useRef, type ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * A small wrapper around the native <dialog> element so the site inherits
 * browser focus trapping, Escape handling and modal semantics for free.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  children,
  className,
  id,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open) {
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    return undefined;
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={labelledBy}
      className={['dialog-base', className].filter(Boolean).join(' ')}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {children}
    </dialog>
  );
}
