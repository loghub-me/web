import { ButtonLink } from '~/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

interface HomeContentCardProps {
  title: string;
  description: string;
  link: string;
}

export default function HomeContentCard({ title, description, link }: Readonly<HomeContentCardProps>) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle as={'h3'}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <ButtonLink to={link} variant={'outline'} size={'sm'}>
          {title} 찾기
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
