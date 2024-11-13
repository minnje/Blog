import { useQuery } from 'react-query';
import { getProfile } from '../utils/api';

function Profile() {
   const { isLoading, error, data } = useQuery('profile', getProfile);
   console.log(data);

   return (
      <div>
         {isLoading ? <span>Loading...</span> : null}
         {error ? <span>error!</span> : null}
         {data?.map((data) => (
            <figure
               key={data.id}
               className="flex flex-col gap-2 rounded-md border p-1"
            >
               <img
                  className="rounded-md"
                  src={`${import.meta.env.VITE_PB_API}/files/users/${data?.id}/${data?.avatar}`}
                  alt="프로필 이미지"
                  width={130}
               />
               <div className="flex flex-col gap-1 px-1 text-xs">
                  <figcaption className="font-medium">{data.name}</figcaption>
                  <figcaption className="text-[11px]">{data.email}</figcaption>
               </div>
            </figure>
         ))}
      </div>
   );
}

export default Profile;
