import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMemo } from '../utils/api';

function Memo() {
   const { memoId } = useParams();
   const { isLoading, error, data } = useQuery(['memo', memoId], () =>
      getMemo(memoId + '')
   );

   console.log(data);

   const date = data?.created.substring(0, 10);

   return (
      <main className="mx-auto flex w-full flex-col border-t px-4 text-xs text-neutral-800">
         <article className="">
            <h1 className="py-1 text-center">{data?.title}</h1>
            <span className="mb-2 flex justify-end">{date}</span>
            {data ? (
               <p>
                  {data.img ? (
                     <img
                        className="w-3/4"
                        src={`${import.meta.env.VITE_PB_API}/files/memo/${data?.id}/${data?.img}`}
                        alt="본문 이미지"
                        width={130}
                     />
                  ) : null}
                  {data.content}
               </p>
            ) : null}
            {isLoading ? <span>Loading...</span> : null}
            {error ? <span>error!</span> : null}
         </article>
      </main>
   );
}

export default Memo;
