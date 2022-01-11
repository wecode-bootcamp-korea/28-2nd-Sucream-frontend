import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isNavOn, setIsNavOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setIsNavOn(true);
        return;
      }
      setIsNavOn(false);
      return;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isNavOn };
};

export default useScroll;
