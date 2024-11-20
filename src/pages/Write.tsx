import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import pb from '../utils/pocketbase';

export interface IMemo {
   title: string;
   content: string;
   extra?: string;
   img?: string; // Store the img URL or ID
}

function Write() {
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const onValid = async (data: any) => {
      if (errors === null) {
         return;
      }

      const { title, content, img } = data;

      if (img && img[0]) {
         const formData = new FormData();

         for (let file of img) {
            formData.append('img', file);
         }

         formData.append('content', content);
         formData.append('title', title);

         try {
            await pb.collection('memo').create(formData);
         } catch (error) {
            console.error('File upload failed', error);
         }
      } else {
         await pb.collection('memo').create({
            title,
            content,
         });
      }
      navigate('/memo');
   };

   console.log(watch());

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

            <input type="file" {...register('img')} multiple />

            <button type="submit">완료</button>
         </form>
         <Outlet />
      </>
   );
}

export default Write;
