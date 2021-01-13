export interface ISheet {
  id?: any;
  name?: string;
  tag?: string;
  createdDate?: Date | null;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<ISheet> = {
  id: '',
  name: '',
  tag: '',
  createdDate: null,
  lastModifiedDate: null,
};
