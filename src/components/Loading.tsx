function Loading({ width }) {
   return (
      <div className="flex w-full justify-center">
         <img
            src={`${import.meta.env.BASE_URL}assets/dualRing.svg`}
            width={width}
            alt="로딩 이미지"
         />
      </div>
   );
}

export default Loading;
