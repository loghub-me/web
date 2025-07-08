import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';

interface UserPostShowMoreButtonProps {
  postsLength: number;
  showAllPosts: boolean;
  setShowAllPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserPostShowMoreButton({
  postsLength,
  showAllPosts,
  setShowAllPosts,
}: Readonly<UserPostShowMoreButtonProps>) {
  return (
    postsLength > 3 &&
    !showAllPosts && (
      <Button type={'button'} variant={'link'} onClick={() => setShowAllPosts(true)}>
        <ChevronDownIcon /> 모든 포스트 보기
      </Button>
    )
  );
}
