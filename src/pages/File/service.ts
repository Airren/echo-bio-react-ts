// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { FileItem } from '@/models/file';

/** 新建规则 PUT /api/rule */
export async function updateFile(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<FileItem>('/api/v1/file/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function fileInfo(data: { [key: string]: any }, options?: { [key: string]: any }) {
  console.log('>>>>>> add file');
  return request<FileItem>('/api/v1/file/update', {
    data,
    method: 'PUT',
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
