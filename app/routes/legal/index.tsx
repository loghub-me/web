import type { Route } from './+types/index';
import { data } from 'react-router';
import { ErrorMessage } from '~/constants/messages';

export async function loader({ params }: Route.LoaderArgs) {
  throw data(ErrorMessage.NOT_IMPLEMENTED, { status: 501 });
}

export default function ManualIndex() {
  return <main />;
}
