import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import pb from '../utils/pocketbase';
import { useEffect, useState } from 'react';
import { useEditQuery } from '../utils/api';
import { Helmet } from 'react-helmet-async';

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

   const [preview, setPreview] = useState<string | null>(null);

   useEffect(() => {
      if (data?.img && data?.img.length !== 0) {
         setValue('img', data?.img);
         setPreview(
            `${import.meta.env.VITE_PB_API}/files/${data?.collectionName}/${data?.id}/${data?.img}`
         );
      }
      setValue('title', data?.title);
      setValue('content', data?.content);
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

   const handlePreview = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (file) {
         reader.onload = function () {
            setPreview(reader.result + '');
         };

         reader.onerror = function (error) {
            console.error('File preview error:', error);
         };

         reader.readAsDataURL(file);
      }
   };

   console.log(watch('img'));
   console.log(data);

   return (
      <>
         <Helmet>
            <title>글 수정 | minje blog</title>
            <script
               src="https://kit.fontawesome.com/7e06fe1b34.js"
               crossOrigin="anonymous"
            ></script>
         </Helmet>
         <div className="m-4 flex w-full flex-col gap-1">
            <h1 className="mb-2 ml-1 text-sm">글 수정</h1>
            <form
               className="flex flex-col gap-2"
               onSubmit={handleSubmit(onValid)}
            >
               <input
                  className="focus-custom-slim input-basic"
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
               <textarea
                  className="focus-custom-slim input-basic pb-32 pt-1"
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

               <label
                  htmlFor="imageInput"
                  className="focus-custom-slim input-basic text-center"
                  tabIndex={0}
               >
                  <i className="fa-regular fa-file-image text-xs"></i> 이미지
                  선택
                  <input
                     type="file"
                     accept="image/*"
                     {...register('img', { onChange: handlePreview })}
                     className="hidden"
                     multiple
                     id="imageInput"
                  />
               </label>

               {preview && (
                  <img src={preview + ''} alt={`미리보기`} className="w-3/4" />
               )}
               <div className="flex w-full flex-row justify-between">
                  <button
                     type="submit"
                     className="focus-custom-slim input-basic w-full font-medium"
                  >
                     완료
                  </button>

                  <button
                     className="focus-custom-slim input-basic w-full font-medium"
                     onClick={() => navigate(-1)}
                     type="button"
                  >
                     취소
                  </button>
               </div>
            </form>
         </div>
      </>
   );
}

export default Edit;