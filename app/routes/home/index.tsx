import { useAuth } from '~/hooks/use-auth';
import GuestHome from '~/routes/home/guest';
import MemberHome from '~/routes/home/member';

export default function HomeIndex() {
  const { status } = useAuth();

  if (status === 'authenticated') {
    return <MemberHome />;
  }

  return <GuestHome />;
}
