'use client';

import { TopicContext } from '@/providers/topic';
import { useContext } from 'react';

export const useTopic = () => useContext(TopicContext);
