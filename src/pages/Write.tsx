import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//import pb from '/src/utils/pocketbase';

function Write() {
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onValid = async (data: any) => {
      if (errors === null) {
         return;
      }
      console.log(data);
      // await pb.collection('memo').create({});
      navigate('/memo');
   };

   return (
      <>
         <h1>글쓰기</h1>
         <form className="flex flex-col" onSubmit={handleSubmit(onValid)}>
            <input
               {...register('title', {
                  required: '제목을 입력해 주세요',
                  maxLength: {
                     value: 100,
                     message: '제목은 100자 이내로 입력해 주세요',
                  },
               })}
               placeholder="제목"
            />
            <span>{JSON.stringify(errors.title?.message)}</span>
            <input
               {...register('content', {
                  required: '내용을 입력해 주세요',
                  maxLength: {
                     value: 3000,
                     message: '제목은 3000자 이내로 입력해 주세요',
                  },
               })}
               placeholder="내용"
            />
            <span>{JSON.stringify(errors.content?.message)}</span>
            <button type="submit">완료</button>
         </form>
         <Outlet />
      </>
   );
}

export default Write;
