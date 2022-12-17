export interface Item {
  id: string;
  created_by?: string;
  created_at?: Date;
  updated_by?: string;
  updated_at?: Date;
}

export interface PageInfo {
  page?: number;
  page_size?: number;
  order_by?: string;
  asc?: boolean;
  total?: number;
}

export interface ResponseItem<T extends Item> {
  data: T[];
  error_code: number;
  error_message: string;
  page_info: PageInfo;
}

export interface TableListPagination {
  current?: number;
  pageSize?: number;
  total?: number;
}
