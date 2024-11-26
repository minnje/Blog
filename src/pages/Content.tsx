import { Link, useNavigate } from 'react-router-dom';
import { useContentQuery } from '../utils/api';
import pb from '../utils/pocketbase';
import toast, { Toaster } from 'react-hot-toast';

function Content() {
   const { data, isLoading, error } = useContentQuery();
   const navigate = useNavigate();

   const shortDate = data?.created.substring(0, 10);
   console.log(data);

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
         <Toaster />
         <main className="mx-auto flex w-full flex-col border-t px-4 text-xs text-neutral-800">
            <article>
               <h1 className="py-1 text-center">{data?.title}</h1>
               <span className="mb-2 flex justify-end">{shortDate}</span>
               <div className="flex flex-row justify-end">
                  <Link to={`/edit/${data?.id}`}>수정</Link>|
                  <button onClick={handleDeleteCheck}>삭제</button>
               </div>
               {data?.img && data?.img.length !== 0
                  ? data?.img.map((img: string) => (
                       <p key={img}>
                          <img
                             className="w-3/4"
                             src={`${import.meta.env.VITE_PB_API}/files/${data.collectionName}/${data?.id}/${img}`}
                             alt="본문 이미지"
                             width={130}
                          />
                       </p>
                    ))
                  : null}
               {data ? <p>{data.content}</p> : null}
               {isLoading ? <span>Loading...</span> : null}
               {error ? <span>error!</span> : null}
            </article>
         </main>
      </>
   );
}

export default Content;
