export type TypeRole =
  | 'OWNER'
  | 'SUPPORT'
  | 'DEVELOPER'
  | 'ACCOUNTANT'
  | 'ADMINISTRATOR';

export interface JWTId {
  id: string;
  iat: number;
  exp: number;
}