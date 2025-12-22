'use client';

import { QuestionSearchSubmit } from '@/components/client/question';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@ui/input-group';
import { SearchIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface QuestionSearchSubmitProps {
  defaultValue: string;
}

export default function QuestionSearchQuery({ defaultValue }: Readonly<QuestionSearchSubmitProps>) {
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
        <QuestionSearchSubmit />
      </InputGroupAddon>
    </InputGroup>
  );
}
