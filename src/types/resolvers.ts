export type createUserArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type createSessionArgs = {
  email: string;
  password: string;
}

export type createFinanceArgs = {
  value: string;
  type: 'INCOME' | 'EXPENSE';
  description?: string;
}
