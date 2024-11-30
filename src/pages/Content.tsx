import { Link, useNavigate } from 'react-router-dom';
import { useContentQuery } from '../utils/api';
import pb from '../utils/pocketbase';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import sanitizeHtml from 'sanitize-html';

function Content() {
   const { data, isLoading, error } = useContentQuery();
   const navigate = useNavigate();

   const rawHtml = `${data?.content}`;
   const safeHtml = sanitizeHtml(rawHtml);

   const shortDate = data?.created.substring(0, 10);

   const handleEdit = () => {
      localStorage.setItem('collectionName', `${data?.collectionName}`);
   };

   const handleDelete = async () => {
      try {
         await pb.collection(`${data?.collectionName}`).delete(`${data?.id}`);
         navigate(`/${data?.collectionName.toLowerCase()}`);
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
            <title>{`${data?.title} | minje blog`}</title>
         </Helmet>
         <Toaster />
         <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex w-full flex-col border-t text-xs text-neutral-800"
         >
            <article>
               <h1 className="py-2 text-center text-sm">{data?.title}</h1>
               <span className="mb-1 flex justify-end">{shortDate}</span>
               <div className="flex flex-row justify-end">
                  <Link to={`/edit/${data?.id}`} onClick={handleEdit}>
                     수정
                  </Link>
                  |<button onClick={handleDeleteCheck}>삭제</button>
               </div>
               <p className="px-3 py-3">
                  {data?.img && data?.img.length !== 0
                     ? data?.img.map((img: string) => (
                          <img
                             key={img}
                             className="mb-3 w-full"
                             src={`${import.meta.env.VITE_PB_API}/files/${data.collectionName}/${data?.id}/${img}`}
                             alt="본문 이미지"
                             width={130}
                          />
                       ))
                     : null}
                  <div dangerouslySetInnerHTML={{ __html: safeHtml }}></div>
               </p>
               {isLoading ? <span>Loading...</span> : null}
               {error ? <span>error!</span> : null}
            </article>
         </motion.main>
      </>
   );
}

export default Content;
