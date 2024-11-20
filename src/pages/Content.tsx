import { useContentQuery } from '../utils/api';

function Content() {
   const { data, isLoading, error } = useContentQuery();

   const shortDate = data?.created.substring(0, 10);

   console.log(data);

   return (
      <main className="mx-auto flex w-full flex-col border-t px-4 text-xs text-neutral-800">
         <article>
            <h1 className="py-1 text-center">{data?.title}</h1>
            <span className="mb-2 flex justify-end">{shortDate}</span>
            {data ? <p>{data.content}</p> : null}
            {data?.img && data?.img.length !== 0
               ? data?.img.map((img: string) => (
                    <p>
                       <img
                          className="w-3/4"
                          src={`${import.meta.env.VITE_PB_API}/files/memo/${data?.id}/${img}`}
                          alt="본문 이미지"
                          width={130}
                       />
                    </p>
                 ))
               : null}
            {isLoading ? <span>Loading...</span> : null}
            {error ? <span>error!</span> : null}
         </article>
      </main>
   );
}

export default Content;
