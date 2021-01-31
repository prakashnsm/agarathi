export interface IWord {
  id?: any;
  english?: string;
  tamizh?: string;
  sheet?: string;
  createdDate?: Date | null;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IWord> = {
  id: '',
  english: '',
  tamizh: '',
  sheet: '',
  createdDate: null,
  lastModifiedDate: null,
};
