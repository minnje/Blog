import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import pb from '../utils/pocketbase';
import { useEffect } from 'react';
import { useEditQuery } from '../utils/api';

function Edit() {
   const navigate = useNavigate();
   const { editId } = useParams();
   const { data, isLoading, error } = useEditQuery();
   const collectionName = localStorage.getItem('collectionName');

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm();

   useEffect(() => {
      setValue('title', data?.title);
      setValue('content', data?.content);
      setValue('img', data?.img);
   }, [setValue]);

   async function onValid(data: any) {
      if (errors === null) {
         return;
      }
      if (collectionName === 'Memo') {
         const { title, content, img } = data;

         if (img && img[0]) {
            const formData = new FormData();

            for (let file of img) {
               formData.append('img', file);
            }

            formData.append('content', content);
            formData.append('title', title);

            try {
               await pb.collection('Memo').update(editId + '', formData);
            } catch (error) {
               console.error('File upload failed', error);
            }
         } else {
            await pb.collection('Memo').update(editId + '', {
               title,
               content,
            });
         }
         navigate('/memo');
      } else if (collectionName === 'Troubleshooting') {
         const { title, content, img } = data;

         if (img && img[0]) {
            const formData = new FormData();

            for (let file of img) {
               formData.append('img', file);
            }

            formData.append('content', content);
            formData.append('title', title);

            try {
               await pb
                  .collection('Troubleshooting')
                  .update(editId + '', formData);
            } catch (error) {
               console.error('File upload failed', error);
            }
         } else {
            await pb.collection('Troubleshooting').update(editId + '', {
               title,
               content,
            });
         }
         navigate('/troubleshooting');
      }
   }

   console.log(watch);
   console.log(data);

   return (
      <>
         <h1>글수정</h1>
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
      </>
   );
}

export default Edit;
