import { motion } from 'framer-motion';

function Home() {
   return (
      <motion.div
         drag
         dragSnapToOrigin
         className="flex w-40 items-center justify-center"
      >
         <h1>메인 화면</h1>
      </motion.div>
   );
}

export default Home;