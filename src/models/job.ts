import type { Item } from '@/models/data';

export interface JobItem extends Item {
  name: string;
  standard: string;
  algorithm: string;
  inputFile: any;
  outPutFile: string;
  parameter: string;
}
