export interface CreateUserReq {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserLoginReq {
  email: string;
  password: string;
}
