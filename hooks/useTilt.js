import { useState, useRef, useCallback } from 'react';

export const useTilt = (intensity = 15) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [transition, setTransition] = useState('all 0.3s ease');
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    
    setTransform({ rotateX, rotateY });
    setTransition('all 0.1s ease');
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setTransition('all 0.5s ease');
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
    transition
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
};
