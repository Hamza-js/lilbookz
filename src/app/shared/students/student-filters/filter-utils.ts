export type InitialStateType = {
  search: string;
  for_sale: string;
  pricing: string;
  price: number[] | string;
  bed_and_baths: string[] | string;
  home_type: string[] | string;
  maxHoA: string;
  listing_type: string;
  property_status: string[] | string;
  parking_spots: string;
  garages: string;
  square_feet_min: string;
  square_feet_max: string;
  lot_size_min: string;
  lot_size_max: string;
  built_year_min: string;
  built_year_max: string;
  basement: string;
  number_of_stories: string;
  senior_living: string;
  other_amenities: string;
  view: string;
  sold_in_last: string;
  keywords: string;
  tour_status: string[] | string;
};

export const initialState: InitialStateType = {
  search: '',
  for_sale: '',
  pricing: '',
  price: [0, 0],
  bed_and_baths: [],
  home_type: [],
  maxHoA: '',
  listing_type: '',
  property_status: [],
  parking_spots: '',
  garages: '',
  square_feet_min: '',
  square_feet_max: '',
  lot_size_min: '',
  lot_size_max: '',
  built_year_min: '',
  built_year_max: '',
  basement: '',
  number_of_stories: '',
  senior_living: '',
  other_amenities: '',
  view: '',
  sold_in_last: '',
  keywords: '',
  tour_status: [],
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
