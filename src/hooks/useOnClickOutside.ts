import React from 'react';

const useOnClickOutside = (handler: () => void) => {
  const ref = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      handler();
    };

    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [ref, handler]);

  return ref;
};

export default useOnClickOutside;
