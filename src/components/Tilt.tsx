import { useEffect, useRef, HTMLAttributes } from 'react';
import VanillaTilt from 'vanilla-tilt';

declare global {
    interface HTMLDivElement {
        vanillaTilt?: {
            destroy: () => void;
        };
    }
}

type VanillaTiltOptions = Parameters<typeof VanillaTilt.init>[1];

interface TiltProps extends HTMLAttributes<HTMLDivElement> {
    options: VanillaTiltOptions;
}

const Tilt: React.FC<TiltProps> = ({ options, children, ...props }) => {
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

    return (
        <div ref={tiltRef} {...props}>
            {children}
        </div>
    );
};

export default Tilt;
