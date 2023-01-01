import { request } from 'umi';
import type { JobItem } from '@/models/job';
import type { SortOrder } from 'antd/es/table/interface';
import type { PageInfo } from '@/models/data';
import { getPageInfo } from '@/services/utils';

export async function createJob(body: JobItem, options?: any) {
  return request('/api/v1/job/create', {
    method: 'POST',
    data: body,
    params: { ...options },
  });
}

export async function queryJobsForTable(
  params: Partial<JobItem & API.PageParams>,
  options?: Record<string, SortOrder>,
) {
  const pageInfo: PageInfo = getPageInfo(params, options);
  const file: Partial<JobItem> = {
    name: params.name,
  };

  return request<{
    data: JobItem[];
    total: number;
    success?: boolean;
  }>('/api/v1/job/list', {
    method: 'POST',
    data: { ...pageInfo, ...file },
  });
}
