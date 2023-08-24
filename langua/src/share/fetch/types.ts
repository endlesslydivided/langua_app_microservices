export interface SignUpInput {
  email: string;
  firstname: string;
  password: string;
  surname: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface Pagination {
  limit: number;
  page: number;
}
