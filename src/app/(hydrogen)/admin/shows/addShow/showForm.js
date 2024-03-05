'use client';

import { Input } from '@/components/ui/input';
import { Select } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import TimePicker from 'react-time-picker';
import { Button } from '@/components/ui/button';
import { Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useRouter } from 'next/navigation';

const ShowForm = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [name, setName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [venueCountry, setVenueCountry] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [venuePostcode, setVenuePostcode] = useState('');
  const [adultTicketPrice, setAdultTicketPrice] = useState('');
  const [childTicketPrice, setChildTicketPrice] = useState('');
  const [concessionTicketPrice, setConcessionTicketPrice] = useState('');
  const [ticketCapacity, setTicketCapacity] = useState('');
  const [sendInvites, setSendInvites] = useState(false);
  const [time, setTime] = useState('');
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const calendarRef = useRef(null);

  useEffect(() => {
    setFieldsFilled(
      selectedDates.length > 0 &&
        venueAddress &&
        venueCity &&
        venueCountry &&
        buildingNumber &&
        ticketCapacity &&
        time
    );
  }, [
    selectedDates,
    venueAddress,
    venueCity,
    venueCountry,
    buildingNumber,
    ticketCapacity,
    time,
  ]);

  const handleTimeChange = (newTime) => setTime(newTime);

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

      const url = `${baseUrl}/api/addShow?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      const trimmedDate = selectedDates.length > 0 ? selectedDates[0] : '';
      let trimmedTime = time ? time.split('T')[1] : '';
      trimmedTime = trimmedTime ? trimmedTime.split('+')[0] : '';
      const showDateTime = trimmedDate + 'T' + trimmedTime;

      formdata.append('name', name);
      formdata.append('invites', sendInvites);
      formdata.append('show_time', time);
      formdata.append('show_date', selectedDates[0]);
      formdata.append('building_number', buildingNumber);
      formdata.append('street', venueAddress);
      formdata.append('town', venueCity);
      formdata.append('county', venueCountry);
      formdata.append('postcode', venuePostcode);
      formdata.append('price_adult', adultTicketPrice);
      formdata.append('price_child', childTicketPrice);
      formdata.append('price_concession', concessionTicketPrice);
      formdata.append('ticket_no', ticketCapacity);
      formdata.append('customerid', userData.customerid);
      formdata.append('show_date_time', showDateTime);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.result === 'success') {
            setSelectedDates([]);
            setVenueAddress('');
            setVenueCity('');
            setVenueCountry('');
            setBuildingNumber('');
            setVenuePostcode('');
            setAdultTicketPrice('');
            setChildTicketPrice('');
            setConcessionTicketPrice('');
            setTicketCapacity('');
            setTime('');
            setLoading(false);
            toast.success(<Text as="b">Show added successfully</Text>);
            router.back();
          } else {
            toast.error(<Text as="b">Error while adding show</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while adding show</Text>);
        });
    }
  };

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Show Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Enter name"
            className="col-span-full"
            onChange={(event) => setName(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          title="Date and Time"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <div ref={calendarRef} className="relative">
            <Input
              onClick={toggleCalendar}
              value={selectedDates.length > 0 ? selectedDates[0] : ''}
              readOnly
              placeholder="Show date"
            />
            {calendarVisible && (
              <div className="absolute left-0 top-full z-10 bg-white p-2 shadow-md">
                <Calendar
                  value={selectedDates}
                  onChange={(date) => {
                    setSelectedDates([date]);
                    setCalendarVisible(false);
                  }}
                  multiple={false}
                />
              </div>
            )}
          </div>
          <div className="w-full">
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
            placeholder="Venue postcode"
            onChange={(event) => setVenuePostcode(event.target.value)}
          />
          <Input
            placeholder="Building name/no"
            onChange={(event) => setBuildingNumber(event.target.value)}
          />

          <Input
            placeholder="Street"
            onChange={(event) => setVenueAddress(event.target.value)}
          />
          <Input
            placeholder="Town"
            onChange={(event) => setVenueCity(event.target.value)}
          />
          <Input
            placeholder="Country"
            onChange={(event) => setVenueCountry(event.target.value)}
          />
        </FormGroup>

        <FormGroup
          title="Pricing"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            placeholder="Adult ticket Price"
            onChange={(event) => setAdultTicketPrice(event.target.value)}
          />
          <Input
            type="url"
            placeholder="Child ticket Price"
            onChange={(event) => setChildTicketPrice(event.target.value)}
          />
          <Input
            type="url"
            placeholder="Concession ticket price"
            onChange={(event) => setConcessionTicketPrice(event.target.value)}
          />
        </FormGroup>

        <FormGroup
          title="Number of tickets available"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="url"
            className="col-span-full"
            placeholder="Enter number"
            onChange={(event) => setTicketCapacity(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          // title="How many can the class hold?"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <div className="mt-2">
            <label className="w-full">
              <input
                className="mb-1 mr-2"
                type="checkbox"
                checked={sendInvites}
                onChange={() => setSendInvites(!sendInvites)}
              />
              Send Invites
            </label>
          </div>
        </FormGroup>
      </div>
      <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
        <Button
          variant="outline"
          className="w-full @xl:w-auto"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
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

export default ShowForm;
