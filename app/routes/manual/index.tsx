import Logo from '~/components/global/logo';

export default function ManualIndex() {
  return (
    <main className="px-4 w-full space-y-8">
      <div className="space-y-2">
        <Logo />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p className="mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </p>
      </div>
    </main>
  );
}
