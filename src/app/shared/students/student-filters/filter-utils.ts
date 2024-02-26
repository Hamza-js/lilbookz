export type InitialStateType = {
  genre: string[] | string;
  class_type: string[] | string;
  classes: string[] | string;
};

export const initialState: InitialStateType = {
  genre: [],
  class_type: [],
  classes: [],
};

export const genreData = [
  { label: 'Hip Hop / street 1-6', value: 'any' },
  { label: 'Tap 3-6', value: '1+' },
  { label: 'Tap 2-6', value: '2+' },
  { label: 'Ballet 2-6', value: '3+' },
  { label: 'School and Nuseries', value: '4+' },
];

export const classTypeData = [
  { label: 'Lil Boppers - Age(1-2)', value: 'any' },
  { label: 'Lil Boppers - Age(1-2)', value: '1+' },
  { label: 'Lil Boppers - Age(1-2)', value: '2+' },
  { label: 'Lil Boppers - Age(1-2)', value: '3+' },
  { label: 'Lil Boppers - Age(1-2)', value: '4+' },
];

export const classesData = [
  { label: 'Monday @ 6.45 AM', value: 'any' },
  { label: 'Monday @ 6.45 AM', value: '4+' },
  { label: 'Monday @ 6.45 AM', value: '4+' },
  { label: 'Monday @ 6.45 AM', value: '4+' },
  { label: 'Monday @ 6.45 AM', value: '4+' },
];
