import type { Item } from '@/models/data';
import type { UploadFile } from 'antd/es/upload';

export interface JobItem extends Item {
  name: string;
  standard: string;
  algorithm: string;
  inputFile: any;
  outPutFile: string;
  parameter: string;
}

export interface FileItem {
  id: string;
  files: UploadFile[] | string;
  name: string;
  description: string;
  URLPath: string;
}
