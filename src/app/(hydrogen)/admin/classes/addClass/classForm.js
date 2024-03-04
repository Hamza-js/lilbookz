'use client';

import { Input } from '@/components/ui/input';
import { Select } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import TimePicker from 'react-time-picker';
import { Button } from '@/components/ui/button';
import { Text, Title } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

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
  const [genre, setGenre] = useState(null);
  const [type, setType] = useState(null);
  const [day, setDay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bulding_no, setBulding_no] = useState('');
  const [postcode, setPostcode] = useState('');
  const [price, setPrice] = useState('');
  const [trialPrice, setTrialPrice] = useState('');
  const [billingNameNo, setBillingNameNo] = useState('');
  const [capacity, setCapacity] = useState('');
  const [time, setTime] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const calendarRef = useRef(null);

  const formatedClassGenres = classGenres.map((genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  const formatedTypes = classTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));

  useEffect(() => {
    setFieldsFilled(
      genre &&
        type &&
        day &&
        duration &&
        selectedDates.length > 0 &&
        address &&
        city &&
        country &&
        billingNameNo &&
        capacity &&
        time
    );
  }, [
    genre,
    type,
    day,
    duration,
    selectedDates,
    address,
    city,
    country,
    billingNameNo,
    capacity,
    time,
  ]);

  const handleChangeGenre = (selectedOption) => setGenre(selectedOption.value);

  const handleChangeType = (selectedOption) => setType(selectedOption.value);

  const handleChangeDay = (selectedOption) => setDay(selectedOption.value);

  const handleChangeduration = (selectedOption) =>
    setDuration(selectedOption.value);

  const handleTimeChange = (newTime) => setTime(newTime);

  const handleChangeBuilding = (event) => setBulding_no(event.target.value);

  const handleChangeAddress = (event) => setAddress(event.target.value);

  const handleChangeCity = (event) => setCity(event.target.value);

  const handleChangeCountry = (event) => setCountry(event.target.value);

  const handleChangePostcode = (event) => setPostcode(event.target.value);

  const handleChangePrice = (event) => setPrice(event.target.value);

  const handleChangeTrialPrice = (event) => setTrialPrice(event.target.value);

  const handleChangeBillingNameNo = (event) =>
    setBillingNameNo(event.target.value);

  const handleChangeCapacity = (event) => setCapacity(event.target.value);

  const toggleCalendar = () => setCalendarVisible(!calendarVisible);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef]);

  const handleSave = () => {
    setLoading(true);
    const loggedInStatusString = localStorage.getItem('loggedInStatus');
    const loggedInStatus = loggedInStatusString
      ? JSON.parse(loggedInStatusString)
      : false;
    if (loggedInStatus === true) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);
      if (!userData || !parsedToken) {
        console.error('User data or token not found in localStorage');
        return;
      }

      const url = `${baseUrl}/api/addClassv1?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('classtype', type);
      formdata.append('day', day);
      formdata.append('time', time);
      formdata.append('duration', duration);
      formdata.append('bulding_no', bulding_no);
      formdata.append('street', address);
      formdata.append('town', city);
      formdata.append('county', country);
      formdata.append('postcode', postcode);
      formdata.append('price', price);
      formdata.append('trialprice', trialPrice);
      formdata.append('availability', capacity);
      formdata.append('customerid', userData.customerid);
      formdata.append('classGenre', genre);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.classId) {
            setGenre(null);
            setType(null);
            setDay(null);
            setDuration(null);
            setSelectedDates([]);
            setAddress('');
            setCity('');
            setCountry('');
            setBulding_no('');
            setPostcode('');
            setPrice('');
            setTrialPrice('');
            setBillingNameNo('');
            setCapacity('');
            setTime('');
            setLoading(false);
            setLoading(false);
            toast.success(<Text as="b">Class added successfully</Text>);
          } else {
            toast.error(<Text as="b">Error while adding class</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while adding class</Text>);
        });
    }
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
            displayValue={(value) => {
              const selectedOption = formatedClassGenres.find(
                (option) => option.value === value
              );
              return selectedOption ? selectedOption.label : null;
            }}
          />

          <Select
            label="Select a class"
            options={formatedTypes}
            value={type}
            onChange={handleChangeType}
            displayValue={(value) => {
              const selectedOption = formatedTypes.find(
                (option) => option.value === value
              );
              return selectedOption ? selectedOption.label : null;
            }}
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
          <div ref={calendarRef} className="relative">
            <Input
              onClick={toggleCalendar}
              label="Select Dates"
              value={selectedDates.length > 0 ? selectedDates.join(', ') : ''}
              readOnly
              placeholder="You can select multiple dates"
            />
            {calendarVisible && (
              <div className="absolute left-0 top-full z-10 bg-white p-2 shadow-md">
                <Calendar
                  value={selectedDates}
                  onChange={(dates) => setSelectedDates(dates)}
                  multiple
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <p className="mb-[6px] font-medium text-gray-950">Select Time</p>
            <div>
              <TimePicker
                disableClock
                clearIcon={null}
                clockIcon={null}
                format="hh:mm a"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                amPmAriaLabel="Select AM/PM"
                className="w-full rounded-lg border border-gray-300 px-2 py-2"
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </FormGroup>

        <FormGroup
          title="Address"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Enter building Name/No"
            onChange={handleChangeBuilding}
          />
          <Input placeholder="Enter Street" onChange={handleChangeAddress} />
          <Input placeholder="Enter Town" onChange={handleChangeCity} />
          <Input placeholder="Enter Country" onChange={handleChangeCountry} />
          <Input placeholder="Enter Postcode" onChange={handleChangePostcode} />
        </FormGroup>

        <FormGroup
          title="Pricing"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="$Enter Price"
            onChange={handleChangePrice}
          />
          <Input
            type="url"
            prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
            placeholder="$Enter Trial Price"
            onChange={handleChangeTrialPrice}
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
            onChange={handleChangeBillingNameNo}
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
            onChange={handleChangeCapacity}
          />
        </FormGroup>
      </div>
      <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
        {/* <Button
          variant="outline"
          className="w-full @xl:w-auto"
          // onClick={handleAltBtn}
        >
          Cancel
        </Button> */}
        <Button
          onClick={handleSave}
          type="submit"
          className="w-full @xl:w-auto"
          disabled={!fieldsFilled}
        >
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </>
  );
};

export default ClassForm;
