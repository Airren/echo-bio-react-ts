import type { PageInfo } from '@/models/data';
import { getPageInfo } from '@/services/utils';
import type { SortOrder } from 'antd/es/table/interface';
import type { FileItem } from '@/models/file';
import { request } from 'umi';

export async function queryFilesForTable(
  params: Partial<FileItem & API.PageParams>,
  options?: Record<string, SortOrder>,
) {
  if (params.visibility == undefined || params.visibility === 'all') {
    params.visibility = 0;
  } else if (params.visibility === 'public') {
    params.visibility = 1;
  } else {
    params.visibility = 2;
  }
  const pageInfo: PageInfo = getPageInfo(params, options);
  const file: Partial<FileItem> = {
    name: params.name,
    visibility: params.visibility,
  };

  return request<{
    data: FileItem[];
    total: number;
    success?: boolean;
  }>('/api/v1/file/list', {
    method: 'POST',
    data: { ...pageInfo, ...file },
  });
}

/** 新建规则 POST /api/rule */
export async function fileInfo(data: Record<string, any>, options?: Record<string, any>) {
  console.log('>>>>>> add file');
  return request<FileItem>('/api/v1/file/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeFile(data: { ids: string[] }, options?: Record<string, any>) {
  return request<Record<string, any>>('/api/v1/file/delete_by_ids', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
