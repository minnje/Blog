import { useEffect, useRef, HTMLAttributes } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltProps extends HTMLAttributes<HTMLDivElement> {
   options: VanillaTilt.Options;
}

const Tilt: React.FC<TiltProps> = ({ options, ...props }) => {
   const tiltRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (tiltRef.current) {
         VanillaTilt.init(tiltRef.current, options);
      }

      return () => {
         if (tiltRef.current && tiltRef.current.vanillaTilt) {
            tiltRef.current.vanillaTilt.destroy();
         }
      };
   }, [options]);

   return <div ref={tiltRef} {...props} />;
};

export default Tilt;
