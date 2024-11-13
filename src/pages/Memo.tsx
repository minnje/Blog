import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMemo } from '../utils/api';

function Memo() {
   const { memoId } = useParams();
   const { isLoading, error, data } = useQuery(['memo', memoId], () =>
      getMemo(memoId + '')
   );

   console.log(data);

   return (
      <article>
         <h1>{data?.title}</h1>
         <p>{data?.content}</p>
         {isLoading ? <span>Loading...</span> : null}
         {error ? <span>error!</span> : null}
      </article>
   );
}

export default Memo;
