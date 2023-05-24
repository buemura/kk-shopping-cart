export interface ExternalApiResponse<T> {
  status: number;
  data: T | any;
}
