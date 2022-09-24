import { request } from 'umi';
import type { AlgorithmItem } from '@/models/algorithm';

export async function queryAlgorithmList(params: {
  count: number;
}): Promise<{ data: AlgorithmItem[] }> {
  return request('/api/v1/algorithm/list', {
    params,
  });
}

export async function createAlgorithm(params: AlgorithmItem) {
  console.log('this is the data >>>>>>>', params);
  return request('/api/v1/algorithm/create ', {
    method: 'POST',
    data: params,
  });
}

export async function queryRule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<AlgorithmItem>('/api/v1/algorithm/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
