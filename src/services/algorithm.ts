import { request } from 'umi';
import type { AlgorithmItemDataType } from '../models/algorithm';

export async function queryAlgorithmList(params: {
  count: number;
}): Promise<{ data: AlgorithmItemDataType[] }> {
  return request('/api/v1/algorithm/list', {
    params,
  });
}
