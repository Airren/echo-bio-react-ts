import type { UploadFile } from 'antd/es/upload';

export interface FileItem {
  id: string;
  files: UploadFile[] | string;
  name: string;
  file_type: string;
  is_public: number | string;
  description: string;
  URLPath: string;
}
