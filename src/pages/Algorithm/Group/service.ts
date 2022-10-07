// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { GroupItem } from '@/models/algorithm';
import { ResponseItem } from '@/models/data';

/** 获取规则列表 GET /api/rule */
export async function listGroup(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<ResponseItem<GroupItem>>('/api/v1/algorithm/group/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateGroup(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<GroupItem>('/api/v1/algorithm/group/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addGroup(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<GroupItem>('/api/v1/algorithm/group/create', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeGroup(data: string[]) {
  return request('/api/v1/algorithm/group/delete', {
    data,
    method: 'DELETE',
  });
}
