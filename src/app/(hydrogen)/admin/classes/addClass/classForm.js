'use client';

import { Input } from '@/components/ui/input';
import { Select } from 'rizzui';
// import { DatePicker } from '@/components/ui/datepicker';

import FormGroup from '@/app/shared/form-group';
import FormFooter from '@/components/form-footer';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import TimePicker from 'react-time-picker';
// import ScrollPicker from 'react-scroll-picker';

const options = [
  { label: 'Apple 🍎', value: 'apple' },
  { label: 'Banana 🍌', value: 'banana' },
  { label: 'Cherry 🍒', value: 'cherry' },
];

const days = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

const durations = [
  { label: '5 Minutes', value: '5 Minutes' },
  { label: '10 Minutes', value: '10 Minutes' },
  { label: '15 Minutes', value: '15 Minutes' },
  { label: '20 Minutes', value: '20 Minutes' },
  { label: '25 Minutes', value: '25 Minutes' },
  { label: '30 Minutes', value: '30 Minutes' },
  { label: '35 Minutes', value: '35 Minutes' },
  { label: '40 Minutes', value: '40 Minutes' },
  { label: '45 Minutes', value: '45 Minutes' },
  { label: '50 Minutes', value: '50 Minutes' },
  { label: '55 Minutes', value: '55 Minutes' },
  { label: '60 Minutes', value: '60 Minutes' },
];

const ClassForm = ({ classTypes, classGenres }) => {
  const [value, setValue] = useState(null);
  const [genre, setGenre] = useState(null);
  const [type, setType] = useState(null);
  const [day, setDay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [period, setPeriod] = useState('AM');

  const formatedClassGenres = classGenres.map((genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  const formatedTypes = classTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));

  const handleChangeGenre = (selectedOption) => {
    console.log(selectedOption);
    setGenre(selectedOption.value);
  };

  const handleChangeType = (selectedOption) => {
    console.log(selectedOption);
    setType(selectedOption.value);
  };

  const handleChangeDay = (selectedOption) => {
    console.log(selectedOption);
    setDay(selectedOption.value);
  };

  const handleChangeduration = (selectedOption) => {
    console.log(selectedOption);
    setDuration(selectedOption.value);
  };

  const handleHoursChange = (selectedHours) => {
    setHours(selectedHours);
  };

  const handleMinutesChange = (selectedMinutes) => {
    setMinutes(selectedMinutes);
  };

  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod);
  };
  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Class"
          className="pt-1 @2xl:pt-2 @3xl:grid-cols-12 @3xl:pt-3"
        >
          <Select
            label="Select a class genre"
            options={formatedClassGenres}
            value={genre}
            onChange={handleChangeGenre}
          />

          <Select
            label="Select a class"
            options={formatedTypes}
            value={type}
            onChange={handleChangeType}
          />
        </FormGroup>

        <FormGroup
          title="Date and Time"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Select
            label="Select a day"
            options={days}
            value={day}
            onChange={handleChangeDay}
          />
          <Select
            label="Select a Duration"
            options={durations}
            value={duration}
            onChange={handleChangeduration}
          />
          {/* <DatePicker
            inputProps={{ label: 'Available date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
          /> */}
          {/* <ScrollPicker
            list={[
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
            ]}
            value={hours}
            onChange={handleHoursChange}
          /> */}
          <span> : </span>
          {/* <ScrollPicker
            list={['00', '15', '30', '45']}
            value={minutes}
            onChange={handleMinutesChange}
          />
          <ScrollPicker
            list={['AM', 'PM']}
            value={period}
            onChange={handlePeriodChange}
          /> */}
        </FormGroup>

        <FormGroup
          title="Address"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input placeholder="Enter Street" />
          <Input placeholder="Enter Town" />
          <Input placeholder="Enter Country" />
          <Input placeholder="Enter Postcode" />
        </FormGroup>

        <FormGroup
          title="Pricing"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            // className="col-span-full"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="$Enter Price"
          />
          <Input
            type="url"
            // className="col-span-full"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="$Enter Trial Price"
          />
        </FormGroup>

        <FormGroup
          title="Billing Name/No"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            className="col-span-full"
            placeholder="Enter Billing Name/No"
          />
        </FormGroup>

        <FormGroup
          title="How many can the class hold?"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            className="col-span-full"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="Enter Number"
          />
        </FormGroup>
      </div>
      <FormFooter altBtnText="Cancel" submitBtnText="Save" />
    </>
  );
};

export default ClassForm;
