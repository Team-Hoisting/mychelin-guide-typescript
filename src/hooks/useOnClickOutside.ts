import React from 'react';

const useOnClickOutside = handler => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) return;

      handler(e);
    };

    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [ref, handler]);

  return ref;
};

export default useOnClickOutside;
