export interface ApiResponse<T> {
  data: {
    result: T;
    meta?: {
      pages?: number;
      current?: number;
      pageSize?: number;
      total?: number;
    };
  };
}
