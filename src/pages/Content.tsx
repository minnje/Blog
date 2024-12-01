import { Link, useNavigate } from 'react-router-dom';
import { useContentQuery } from '../utils/api';
import pb from '../utils/pocketbase';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import sanitizeHtml from 'sanitize-html';
import { IDatas } from '../types';
import Loading from '../components/Loading';

function Content() {
   const { data, isLoading, error } = useContentQuery();
   const typedData = data as IDatas;
   const navigate = useNavigate();

   const rawHtml = `${typedData?.content}`;
   const safeHtml = sanitizeHtml(rawHtml);

   const shortDate = typedData?.created.substring(0, 10);

   const handleEdit = () => {
      localStorage.setItem('collectionName', `${typedData?.collectionName}`);
   };

   const handleDelete = async () => {
      try {
         await pb
            .collection(`${typedData?.collectionName}`)
            .delete(`${typedData?.id}`);
         navigate(`/${typedData?.collectionName.toLowerCase()}`);
         navigate(0);
      } catch (error) {
         console.error('글 삭제에 실패하였습니다.', error);
      }
   };
   const handleDeleteCheck = () => {
      return toast((t) => (
         <span className="flex flex-col px-2 py-1">
            삭제할까요?
            <div className="mx-1 mt-2 flex flex-row justify-between text-sm font-medium">
               <button className="text-red-950" onClick={() => handleDelete()}>
                  확인
               </button>
               <button className="" onClick={() => toast.dismiss(t.id)}>
                  취소
               </button>
            </div>
         </span>
      ));
   };

   return (
      <>
         <Helmet>
            <title>{`${typedData?.title} | minje blog`}</title>
         </Helmet>
         <Toaster />
         <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex w-full flex-col border-t text-xs text-neutral-800"
         >
            <article>
               <h1 className="py-[6px] text-center text-sm font-medium">
                  {typedData?.title}
               </h1>
               <span className="mb-1 flex justify-end font-light">
                  {shortDate}
               </span>
               <div className="flex flex-row justify-end">
                  <Link to={`/edit/${typedData?.id}`} onClick={handleEdit}>
                     수정
                  </Link>
                  |<button onClick={handleDeleteCheck}>삭제</button>
               </div>
               <p className="px-4 py-5 text-sm">
                  {typedData?.img && typedData?.img.length !== 0
                     ? typedData?.img.map((img: string) => (
                          <img
                             key={img}
                             className="mb-3 w-full"
                             src={`${import.meta.env.VITE_PB_API}/files/${typedData.collectionName}/${typedData?.id}/${img}`}
                             alt="본문 이미지"
                             width={130}
                          />
                       ))
                     : null}
                  <div dangerouslySetInnerHTML={{ __html: safeHtml }}></div>
               </p>
               {isLoading ? <Loading width={35} /> : null}
               {error ? <span>error!</span> : null}
            </article>
         </motion.main>
      </>
   );
}

export default Content;
