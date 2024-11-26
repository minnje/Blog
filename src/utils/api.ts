import { Location, useLocation, useParams } from 'react-router-dom';
import pb from './pocketbase';
import { useQuery } from 'react-query';

export async function getMemoList() {
   const memoList = await pb.collection('Memo').getFullList(30);
   return memoList;
}

export async function getTroubleList() {
   const troubleList = await pb.collection('Troubleshooting').getFullList(30);
   return troubleList;
}

export async function getMemo(memoId: string) {
   const memo = await pb.collection('Memo').getOne(memoId);
   return memo;
}

export async function getTrouble(troubleId: string) {
   const trouble = await pb.collection('Troubleshooting').getOne(troubleId);
   return trouble;
}

export async function getProfile() {
   const profile = await pb.collection('users').getFullList();
   return profile;
}

export function useListQuery() {
   const location: Location = useLocation();
   let queryKey, queryFn;
   if (location.pathname.includes('memo')) {
      queryKey = 'memoList';
      queryFn = getMemoList;
   } else if (location.pathname.includes('troubleshooting')) {
      queryKey = 'troubleList';
      queryFn = getTroubleList;
   }
   const { isLoading, error, data } = useQuery(queryKey!, queryFn!);
   return { isLoading, error, data };
}

export function useContentQuery() {
   const { memoId, troubleId } = useParams();
   let queryKey, queryFn;

   if (memoId) {
      queryKey = ['memo', memoId];
      queryFn = () => getMemo(memoId + '');
   } else if (troubleId) {
      queryKey = ['trouble', troubleId];
      queryFn = () => getTrouble(troubleId + '');
   }

   const { isLoading, error, data } = useQuery(queryKey!, queryFn!);
   return { isLoading, error, data };
}

export function useEditQuery() {
   const { editId } = useParams();
   const collectionName = localStorage.getItem('collectionName');

   let queryKey, queryFn;

   if (collectionName === 'Memo') {
      queryKey = ['memo', editId];
      queryFn = () => getMemo(editId + '');
   } else if (collectionName === 'Troubleshooting') {
      queryKey = ['trouble', editId];
      queryFn = () => getTrouble(editId + '');
   }

   const { isLoading, error, data } = useQuery(queryKey!, queryFn!);
   return { isLoading, error, data };
}
