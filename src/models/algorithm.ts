export type Parameter = {
  name: string;
  label: string;
  required: boolean;
  description: string;
  type: 'string' | 'file' | 'radio' | 'select';
  value_list: string[];
};

export type AlgorithmItem = {
  id: number;
  name: string;
  label: string;
  image: string;
  description: string;
  price: number;
  favorite: number;
  parameter: Parameter[];
};
