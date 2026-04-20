import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function usePersistence<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }, [key, value]);

  return [value, setValue];
}
