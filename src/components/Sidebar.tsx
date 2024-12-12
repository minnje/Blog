import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Tilt from './Tilt';
import Loading from './Loading';

export const basicVar = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2,
        },
    },
};

export const slideVar = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        y: [-10, 0],
        transition: {
            type: 'spring',
        },
    },
};

function Sidebar() {
    const { isLoading, error, data } = useQuery('profile', getProfile);

    const navItems = [
        { to: '/memo', label: 'Memo' },
        { to: '/troubleshooting', label: 'Trouble shooting' },
    ];

    const MotionNav = motion(NavLink);

    const options = {
        max: 25,
        scale: 1.1,
        speed: 3500,
        transition: true,
        glare: true,
        'max-glare': 0.8,
    };

    return (
        <motion.div
            variants={basicVar}
            initial="initial"
            animate="animate"
            className="flex h-fit min-w-44 flex-col gap-5 rounded-xl"
        >
            {isLoading ? <Loading width={35} /> : null}
            {error ? <span role="alert">error!</span> : null}
            {data?.map((data) => (
                <figure key={data.id} className="mb-1 flex flex-col gap-2 p-1">
                    <Tilt options={options}>
                        <img
                            className="rounded-xl"
                            src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                            alt="프로필 사진"
                            width={180}
                        />
                    </Tilt>
                    <div className="flex flex-col space-y-1 bg-transparent p-2">
                        <motion.figcaption
                            variants={slideVar}
                            className="bg-transparent font-medium"
                        >
                            {data.name}
                        </motion.figcaption>
                        <motion.figcaption
                            variants={slideVar}
                            className="bg-transparent text-xs"
                        >
                            {data.email}
                        </motion.figcaption>
                    </div>
                </figure>
            ))}
            <nav>
                <ul className="flex flex-col gap-2 px-1 py-2 text-xs">
                    {navItems.map(({ to, label }) => (
                        <motion.li key={to} variants={slideVar} tabIndex={-1}>
                            <MotionNav
                                to={to}
                                whileHover={{ backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.95 }}
                                className={({ isActive }) =>
                                    `focus-custom block rounded-2xl px-2 py-[.375rem] ${
                                        isActive
                                            ? 'font-medium shadow-xl ring-2 ring-main'
                                            : ''
                                    }`
                                }
                            >
                                {label}
                            </MotionNav>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </motion.div>
    );
}

export default Sidebar;
