import { motion } from 'framer-motion';

function Home() {
   return (
      <motion.div
         drag
         dragSnapToOrigin
         className="flex w-40 items-center justify-center bg-gray-600 text-yellow-500"
      >
         <h1>hello</h1>
      </motion.div>
   );
}

export default Home;
