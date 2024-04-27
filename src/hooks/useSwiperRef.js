import { useState, useRef, useEffect } from 'react';

const useSwiperRef = (initialValue = null) => {
  const [element, setElement] = useState(initialValue);
  const elementRef = useRef(initialValue);

  useEffect(() => {
    setElement(elementRef.current);
  }, []);

  return [element, elementRef];
};

export default useSwiperRef;
