import { TopicIcon } from '@/components/client/topic';
import { TOPICS } from '@/constants/topics';
import { OrbitingCircle } from '@ui/orbiting-circle';

export default function HomeOrbitingCirclesS() {
  const circles = [TOPICS.slice(0, 7), TOPICS.slice(8, 15), TOPICS.slice(16, 23), TOPICS.slice(24, 31)];

  return (
    <section className="absolute -z-1 w-full h-[853px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background from-30% to-50%"></div>
      {circles.map((circle, index) => (
        <OrbitingCircle
          key={index}
          iconSize={Math.round((42 - index * 6) * 1.25)}
          radius={Math.round((320 - index * 64) * 1.25)}
          speed={4 + index * 2}
          reverse={index % 2 === 0}
        >
          {circle.map((topic) => (
            <TopicIcon key={topic.slug} {...topic} size={Math.round((36 - index * 6) * 1.25)} />
          ))}
        </OrbitingCircle>
      ))}
    </section>
  );
}
