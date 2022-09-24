import { request } from 'umi';
import type { JobItem } from '@/models/job';

export async function createJob(body: JobItem, options?: any) {
  const formData = new FormData();
  const file = body.inputFile[0];
  console.log(file);

  formData.append('file', file);
  console.log('1');
  console.log(options);
  console.log(body);
  console.log('>>>>>>>>> to upload file');
  return request('/api/v1/job/create', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    params: { ...options },
  });
}
