import type { Item } from '@/models/data';

export interface JobItem extends Item {
  name: string;
  algorithm: string;
  parameters: Map<string, string>;
  outputs: string;
  status: string;
  description: string;
}
