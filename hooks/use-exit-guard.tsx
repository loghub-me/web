'use client';

import { ExitGuardContext } from '@/guard/exit';
import { useContext } from 'react';

export const useExitGuard = () => useContext(ExitGuardContext);
