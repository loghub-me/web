export default function HomeIntroduceVideo() {
  return (
    <video className="w-full rounded-lg" poster={`${import.meta.env.VITE_BUCKET_HOST}/introduce.webp`} controls>
      <source src={`${import.meta.env.VITE_BUCKET_HOST}/introduce.mp4`} type={'video/mp4'} />
    </video>
  );
}
