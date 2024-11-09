import pb from './pocketbase';

export async function getMemoList() {
   const memoList = await pb.collection('memo').getFullList(50);
   return memoList;
}
