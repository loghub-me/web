import { TopicImage } from '~/components/topic';
import { OrbitCanvas, OrbitingIcon } from '~/components/ui/orbiting';
import { TOPICS } from '~/constants/topics';

export default function HomeTopicIcons() {
  const radius = [310, 390, 470, 550];

  return (
    <OrbitCanvas radius={radius}>
      {radius.map((r, i) =>
        TOPICS.slice(i * 4, i * 4 + 4).map((topic, j) => (
          <OrbitingIcon key={topic.slug} radius={r} angle={j * (360 / 4)} duration={i * 2 + 2} reverse={i % 2 === 0}>
            <TopicImage topic={topic} size={'lg'} />
          </OrbitingIcon>
        ))
      )}
    </OrbitCanvas>
  );
}
