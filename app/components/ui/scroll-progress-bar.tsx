import { motion, useScroll } from 'motion/react';
import { useState } from 'react';

export default function ScrollProgressBar() {
  const [scaleX, setScaleX] = useState(0);
  const { scrollYProgress } = useScroll();

  scrollYProgress.on('change', (v) => setScaleX(v > 1 ? 1 : v));

  return <motion.hr className="sticky top-16 z-10 border-2 border-primary origin-left" style={{ scaleX }} />;
}
