import type { PageInfo } from '@/models/data';
import type { TableListPagination } from '@/models/data';

export function getPageInfo(p: API.PageParams, options: Record<string, any> | undefined) {
  let sortKey: string = '';
  let asc: boolean = false;
  if (options != undefined) {
    Object.entries(options).find(([key, value]) => {
      sortKey = key;
      if (value == 'ascend') {
        asc = true;
      }
    });
  }
  const pageInfo: PageInfo = {
    page: p.current,
    page_size: p.pageSize,
    order_by: sortKey,
    asc: asc,
  };
  return pageInfo;
}

export function setPageInfo(p: PageInfo) {
  const pageInfo: TableListPagination = {
    total: p.total != undefined ? p.total : 0,
  };
  return pageInfo;
}
