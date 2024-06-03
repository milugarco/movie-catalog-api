import { UnprocessableEntityException } from '@nestjs/common';
import { isValid, parse } from 'date-fns';

export function dateValidator(date: string) {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDate)) {
    throw new UnprocessableEntityException('Invalid date format');
  }
}
