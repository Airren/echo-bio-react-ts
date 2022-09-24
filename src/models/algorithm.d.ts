import type Item from './data';
import type { UploadFile } from 'antd/es/upload';

export interface ParameterItem extends Item {
  id: string;
  name?: string;
  label?: string;
  required?: boolean | string;
  description?: string;
  type?: 'string' | 'file' | 'radio' | 'select';
  value_list?: string[];
}

export interface AlgorithmItem extends Item {
  id: string;
  name: string;
  label: string;
  image: UploadFile[] | string;
  description: string;
  price: number;
  favorite: number;
  parameters: ParameterItem[];
  document: string;
  update_at: string;
}
