interface TopicDetailAsideProps {
  slug: string;
  name: string;
  description: string;
}

export default function TopicDetailAside({ slug, name, description }: Readonly<TopicDetailAsideProps>) {
  return (
    <aside className="md:max-w-64 w-full flex flex-col gap-4 items-center md:items-start">
      <img src={`/icons/${slug}.svg`} alt={name} className="p-4 size-64 border object-fill rounded-xl" />
      <div className="flex flex-col items-center md:items-start">
        <h3 className="font-semibold">{name}</h3>
        <p className="tex-sm text-muted-foreground">{description}</p>
      </div>
    </aside>
  );
}
