import { redirect } from 'next/navigation';

export default function UnpublishedPage() {
  return redirect('/unpublished/articles');
}
