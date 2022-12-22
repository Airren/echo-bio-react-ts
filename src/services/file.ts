import { request } from 'umi';
import type { PageInfo } from '@/models/data';
import { getPageInfo } from '@/services/utils';
import type { SortOrder } from 'antd/es/table/interface';
import type { FileItem } from '@/models/file';

export async function queryFilesForTable(
  params: Partial<FileItem & API.PageParams>,
  options?: Record<string, SortOrder>,
) {
  console.log(params);
  if (params.is_public == undefined || params.is_public === 'all') {
    params.is_public = 0;
  } else if (params.is_public === 'public') {
    params.is_public = 1;
  } else {
    params.is_public = 2;
  }
  const pageInfo: PageInfo = getPageInfo(params, options);
  const file: Partial<FileItem> = {
    name: params.name,
    is_public: params.is_public,
  };

  console.log(params);
  return request<{
    data: FileItem[];
    total: number;
    success?: boolean;
  }>('/api/v1/file/list', {
    method: 'POST',
    data: { ...pageInfo, ...file },
  });
}
