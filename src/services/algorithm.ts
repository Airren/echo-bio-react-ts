import { request } from 'umi';
import type { AlgorithmItem } from '@/models/algorithm';
import type { PageInfo } from '@/models/data';
import { getPageInfo } from '@/services/utils';
import type { SortOrder } from 'antd/es/table/interface';

export async function queryAlgorithmList(params: {
  count: number;
}): Promise<{ data: AlgorithmItem[] }> {
  console.log('query algo list');
  return request('/api/v1/algorithm/list', {
    method: 'POST',
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

export async function queryAlgorithmsForTable(
  params: Partial<AlgorithmItem & API.PageParams>,
  options?: Record<string, SortOrder>,
) {
  const pageInfo: PageInfo = getPageInfo(params, options);
  const algorithm: Partial<AlgorithmItem> = {
    label: params.label,
  };

  return request<{
    data: AlgorithmItem[];
    total: number;
    success?: boolean;
  }>('/api/v1/algorithm/list', {
    method: 'POST',
    data: { ...pageInfo, ...algorithm },
  });
}
