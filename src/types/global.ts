export interface apiResponseType<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
