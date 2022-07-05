import { jsonContent } from './header';
import { checkRquiredProps } from './requiredProperties';

export const signUp = [
  jsonContent,
  checkRquiredProps(['email', 'password']),
];

export const signIn = [
  jsonContent,
  checkRquiredProps(['email', 'password']),
];
