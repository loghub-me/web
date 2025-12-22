'use client';

import { SeriesSearchSubmit } from '@/components/client/series';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@ui/input-group';
import { SearchIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface SeriesSearchSubmitProps {
  defaultValue: string;
}

export default function SeriesSearchQuery({ defaultValue }: Readonly<SeriesSearchSubmitProps>) {
  const { pending } = useFormStatus();

  return (
    <InputGroup>
      <InputGroupAddon align={'inline-start'}>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type={'text'}
        name={'query'}
        placeholder={'검색어를 입력해주세요...'}
        defaultValue={defaultValue}
        disabled={pending}
        className="pl-0!"
      />
      <InputGroupAddon align={'inline-end'}>
        <SeriesSearchSubmit />
      </InputGroupAddon>
    </InputGroup>
  );
}
