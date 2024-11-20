import { useLocation } from 'react-router-dom';
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

export async function getProfile() {
   const profile = await pb.collection('users').getFullList();
   return profile;
}

export function useListCustomQuery() {
   const location = useLocation();
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
