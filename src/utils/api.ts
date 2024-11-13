import pb from './pocketbase';

export async function getMemoList() {
   const memoList = await pb.collection('memo').getFullList(50);
   return memoList;
}

export async function getMemo(memoId: string) {
   const memo = await pb.collection('memo').getOne(memoId);
   return memo;
}

export async function getProfile() {
   const profile = await pb.collection('users').getFullList();
   return profile;
}
