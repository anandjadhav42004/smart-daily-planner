import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function AddTaskButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl flex items-center justify-center text-white text-3xl hover:shadow-[0_0_25px_#ec4899]"
    >
      <Plus />
    </motion.button>
  );
}
