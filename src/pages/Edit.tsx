import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import pb from '../utils/pocketbase';
import { useEffect, useState } from 'react';
import { useEditQuery } from '../utils/api';
import { Helmet } from 'react-helmet-async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { IDatas } from '../types';

function Edit() {
    const navigate = useNavigate();
    const { editId } = useParams();
    const { data } = useEditQuery();
    const typedData = data as IDatas;
    const collectionName = localStorage.getItem('collectionName');

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState<string | null>(null);

    if (typedData?.img && typedData?.img.length !== 0) {
        setValue('img', typedData?.img);
        setPreview(
            `${import.meta.env.VITE_PB_API}/files/${typedData?.collectionName}/${typedData?.id}/${typedData?.img}`
        );
    }
    setValue('title', typedData?.title);
    setValue('content', typedData?.content);

    async function onValid(typedData: any) {
        if (errors === null) {
            return;
        }
        if (collectionName === 'Memo') {
            const { title, content, img } = typedData;

            if (img && img.length > 0) {
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
            const { title, content, img } = typedData;

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
                setPreview(reader.result as string);
            };

            reader.onerror = function (error) {
                console.error('File preview error:', error);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Helmet>
                <title>글 수정 | minje blog</title>
                <script
                    src="https://kit.fontawesome.com/7e06fe1b34.js"
                    crossOrigin="anonymous"
                ></script>
            </Helmet>
            <div className="flex w-full flex-col rounded-xl bg-white p-3">
                <h1 className="input-basic mb-3 text-center">글 수정</h1>
                <form
                    className="flex h-full flex-col justify-between gap-2"
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
                    <label
                        htmlFor="imageInput"
                        className="focus-custom-slim input-basic mb-1 flex items-center gap-1"
                        tabIndex={0}
                    >
                        <i className="fa-regular fa-file-image text-xs"></i>
                        이미지 선택
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
                        <img
                            src={preview + ''}
                            alt="이미지 미리보기"
                            className="w-48"
                        />
                    )}
                    <Controller
                        name="content"
                        control={control}
                        defaultValue={typedData?.content}
                        rules={{ required: '내용은 필수입니다.' }}
                        render={({ field }) => (
                            <ReactQuill
                                className="flex h-full flex-col"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                theme="snow"
                            />
                        )}
                    />
                    <span>{JSON.stringify(errors.content?.message)}</span>
                    <div className="flex w-full flex-row justify-between">
                        <button
                            className="focus-custom-slim input-basic w-full font-medium"
                            onClick={() => navigate(-1)}
                            type="button"
                        >
                            취소
                        </button>

                        <button
                            type="submit"
                            className="focus-custom-slim input-basic w-full font-medium"
                        >
                            완료
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Edit;
