export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  token: string;
}
