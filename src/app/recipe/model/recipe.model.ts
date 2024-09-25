export interface Recipe {
  key: number;
  id: number;
  name: string;
  description: string;
  isFavorite: boolean;
  createDate: Date;
  modifiedDate: Date;
}
