import { motion } from 'framer-motion';

function Home() {
   return (
      <motion.div
         drag
         dragSnapToOrigin
         className="flex w-full items-center justify-center bg-transparent"
      >
         <h1>메인 화면</h1>
      </motion.div>
   );
}

export default Home;
