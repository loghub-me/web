import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

type ReplyContextType = Readonly<{
  replyTo?: ArticleComment;
  setReplyTo: React.Dispatch<React.SetStateAction<ArticleComment | undefined>>;
  parentId?: number;
  setParentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  clear: () => void;
}>;

export const ReplyContext = createContext<ReplyContextType>({} as ReplyContextType);

export default function ReplyProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [replyTo, setReplyTo] = useState<ArticleComment>();
  const [parentId, setParentId] = useState<number>();
  const { pathname } = useLocation();

  useEffect(() => {
    setReplyTo(undefined);
    setParentId(undefined);
  }, [pathname]);

  return (
    <ReplyContext.Provider
      value={{
        replyTo,
        setReplyTo,
        parentId,
        setParentId,
        clear: () => {
          setReplyTo(undefined);
          setParentId(undefined);
        },
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
}
