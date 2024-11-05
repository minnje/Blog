import { useParams } from 'react-router-dom';

function Memo() {
   const { memoId } = useParams();
   console.log(memoId);

   return <h1 className="text-7xl">{memoId}번째 메모</h1>;
}

export default Memo;
