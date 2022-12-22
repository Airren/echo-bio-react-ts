import type Item from './data';
import type { UploadFile } from 'antd/es/upload';

export interface ParameterItem extends Item {
  id: number | string;
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
  group: string;
  image?: UploadFile[] | string;
  description: string;
  price: number;
  favorite?: number;
  parameters?: ParameterItem[];
  command?: string;
  document?: string;
}

export interface GroupItem extends Item {
  createdBy?: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
  id: string;
  // key: number;
  name: string;
  label: string;
}
