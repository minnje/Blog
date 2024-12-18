import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getProfile } from '../utils/api';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Tilt from '../components/Tilt';
import Loading from '../components/Loading';

const basicVar = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.3,
        },
    },
};

const slideVar = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        y: [-15, 0],
        transition: {
            type: 'spring',
        },
    },
};

function Home() {
    const { isLoading, error, data } = useQuery('profile', getProfile);

    const MotionNavLink = motion(NavLink);

    const options = {
        max: 25,
        scale: 1.1,
        speed: 3500,
        transition: true,
        glare: true,
        'max-glare': 0.8,
    };

    return (
        <>
            <Helmet>
                <title>minje blog</title>
                <script type="text/javascript" src="vanilla-tilt.js"></script>
            </Helmet>
            <div className="flex flex-col items-center">
                <header className="my-4 mb-10 flex items-center justify-center">
                    <Link to={'/'} className="focus-custom rounded-2xl">
                        <motion.img
                            className="bg-transparent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            src={`${import.meta.env.BASE_URL}assets/mainLogo.svg`}
                            width="43"
                            alt="블로그 로고"
                            tabIndex={-1}
                        />
                    </Link>
                </header>

                <motion.main
                    variants={basicVar}
                    initial="initial"
                    animate="animate"
                    className="flex max-w-96 flex-col gap-2 rounded-xl bg-gradient-to-tr from-neutral-200 to-neutral-100 p-4"
                >
                    {isLoading ? <Loading width={40} /> : null}
                    {error ? <span role="alert">error!</span> : null}
                    {data?.map((data) => (
                        <figure
                            key={data.id}
                            className="mb-3 flex flex-col gap-2 p-1"
                        >
                            <motion.div className="flex justify-center">
                                <Tilt options={options}>
                                    <img
                                        className="rounded-xl shadow-2xl"
                                        src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                                        alt="프로필 사진"
                                        width="300"
                                    />
                                </Tilt>
                            </motion.div>

                            <motion.figcaption
                                variants={slideVar}
                                className="mx-2 my-5 bg-transparent text-2xl font-extralight"
                            >
                                {data.name}
                            </motion.figcaption>
                        </figure>
                    ))}

                    <nav>
                        <ul className="flex flex-col space-y-1 p-2 text-xs">
                            <motion.li variants={slideVar} tabIndex={-1}>
                                <MotionNavLink
                                    to="/memo"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={({ isActive }) =>
                                        `focus-custom block rounded-2xl px-2 py-1 ${
                                            isActive
                                                ? 'bg-sub font-medium shadow-xl ring-2 ring-main'
                                                : ''
                                        }`
                                    }
                                >
                                    Memo
                                </MotionNavLink>
                            </motion.li>
                            <motion.li variants={slideVar} tabIndex={-1}>
                                <MotionNavLink
                                    to="/troubleshooting"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={({ isActive }) =>
                                        `focus-custom block rounded-2xl px-2 py-1 ${
                                            isActive
                                                ? 'bg-sub font-medium shadow-xl ring-2 ring-main'
                                                : ''
                                        }`
                                    }
                                >
                                    Trouble shooting
                                </MotionNavLink>
                            </motion.li>
                        </ul>
                    </nav>
                </motion.main>
            </div>
        </>
    );
}

export default Home;
