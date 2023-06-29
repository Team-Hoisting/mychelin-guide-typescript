import { useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounce = (callback: (...args: any) => any, ms: number) => useCallback(debounce(callback, ms), []);

export default useDebounce;
