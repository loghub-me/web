import { useContext } from 'react';
import { ReplyContext } from '~/providers/reply-provider';

export const useReply = () => useContext(ReplyContext);
