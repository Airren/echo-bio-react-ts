import type { UploadFile } from 'antd/es/upload';

export interface FileItem {
  id: string;
  files: UploadFile[] | string;
  name: string;
  file_type: string;
  visibility: number | string;
  description: string;
  URLPath: string;
}
