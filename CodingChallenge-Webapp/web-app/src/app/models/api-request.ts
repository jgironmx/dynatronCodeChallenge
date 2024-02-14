export class ApiRequest {
  offset?: number;
  limit?: number;
  sortField?: string;
  isSortAscending?: boolean;
  filterParam?: string;
}

export interface DeleteResult {
  message: string;
}
