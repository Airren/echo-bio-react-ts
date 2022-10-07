// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FileItem } from '@/models/job';

/** 获取规则列表 GET /api/rule */
export async function file(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FileItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/v1/file/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateFile(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<FileItem>('/api/v1/file/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addFile(data: { [key: string]: any }, options?: { [key: string]: any }) {
  console.log('>>>>>> add file');
  return request<FileItem>('/api/v1/file/create', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeFile(data: { id: string[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/file/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
