import { request } from 'umi';
import type { AlgorithmItem } from '@/models/algorithm';

export async function queryAlgorithmList(params: {
  count: number;
}): Promise<{ data: AlgorithmItem[] }> {
  return request('/api/v1/algorithm/list', {
    params,
  });
}
