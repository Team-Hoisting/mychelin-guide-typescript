import { useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounce = (callback, ms) => useCallback(debounce(callback, ms), []);

export default useDebounce;
