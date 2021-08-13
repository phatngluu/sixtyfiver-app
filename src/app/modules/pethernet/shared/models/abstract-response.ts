export interface AbstractResponse<T> {
  success: boolean,
  message: T,
}
