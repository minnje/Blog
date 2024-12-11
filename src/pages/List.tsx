import { NavLink, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useListQuery } from '../utils/api';
import { motion } from 'framer-motion';
import { basicVar, slideVar } from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IDatas } from '../types';
import Loading from '../components/Loading';

function List() {
    const location = useLocation();
    const { data, isLoading, error } = useListQuery();
    const typedData = data as IDatas;
    const MotionNavLink = motion(NavLink);
    const MotionLink = motion(Link);

    const renderWriteLink = (path: string) => (
        <MotionLink
            to={`${path}/write`}
            aria-label="글쓰기 페이지로 이동"
            className="focus-custom-slim flex w-fit py-1"
            whileHover={{ backgroundColor: '#f5f5f5' }}
            whileTap={{ scale: 0.95 }}
        >
            <span
                className="mx-4 flex items-center justify-center text-xs"
                tabIndex={-1}
            >
                <i className="fa-regular fa-pen-to-square" aria-hidden></i>
                글쓰기
            </span>
        </MotionLink>
    );

    return (
        <>
            <Helmet>
                <title>
                    {`${typedData ? typedData[0]?.collectionName : location.pathname.substring(1)} | minje blog`}
                </title>
                <script
                    src="https://kit.fontawesome.com/7e06fe1b34.js"
                    crossOrigin="anonymous"
                ></script>
            </Helmet>
            <motion.div
                variants={basicVar}
                initial="initial"
                animate="animate"
                className="flex w-full flex-col overflow-auto rounded-xl bg-white p-3"
            >
                <nav className="mx-4 mb-9 mt-2 flex text-[.8125rem]">
                    <h1 className="mr-7 font-medium">
                        {location.pathname.includes('memo')
                            ? 'Memo'
                            : location.pathname.includes('troubleshooting')
                              ? 'Trouble shooting'
                              : null}
                    </h1>

                    <ul aria-labelledby="section-title">
                        <h2
                            id="section-title"
                            className="mb-2 block border-b px-1"
                        >
                            제목
                        </h2>
                        {isLoading ? <Loading width={35} /> : null}
                        {error ? <li role="alert">error!</li> : null}
                        {typedData?.map((typedData) => (
                            <li
                                key={typedData.id}
                                className="mb-1 rounded-2xl font-light"
                            >
                                <MotionNavLink
                                    variants={slideVar}
                                    whileHover={{ backgroundColor: '#f5f5f5' }}
                                    whileTap={{ scale: 0.95 }}
                                    to={`${typedData.id}`}
                                    role="link"
                                    className={({ isActive }) =>
                                        `focus-custom-slim block cursor-pointer px-[5px] ${
                                            isActive
                                                ? `font-medium underline underline-offset-2`
                                                : ``
                                        }`
                                    }
                                >
                                    {typedData.title}
                                </MotionNavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-6 flex justify-center">
                    {location.pathname === '/memo' ||
                    location.pathname === '/troubleshooting'
                        ? renderWriteLink(location.pathname)
                        : null}
                </div>
                <Outlet />
            </motion.div>
        </>
    );
}

export default List;
