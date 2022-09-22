import { request } from 'umi';

export async function createJob(body: any, options: any) {
  console.log('>>>>>>>>> to upload file');
  console.log(options);
  console.log(body);
  return request('/api/v1/job/create', {
    method: 'POST',
    data: body,
    requestType: 'form',
    params: { ...options },
  });
}

export async function updatePet(body: API.Pet, options?: { [key: string]: any }) {
  return request<any>('/pet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
