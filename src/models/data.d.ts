export class Item {
  id: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export interface ResponseItem<P = {}> {
  data: P[];
  error_code: number;
  error_message: string;
}
