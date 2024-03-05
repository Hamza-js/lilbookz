'use client';

import { Input } from '@/components/ui/input';
import { Select } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useRouter } from 'next/navigation';

const type = [
  { label: 'Nursery', value: 'Nursery' },
  { label: 'School', value: 'School' },
  { label: 'Other', value: 'Other' },
];

const CustomerForm = (customerData) => {
  const [comapnyName, setComapnyName] = useState('');
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [typeOption, setTypeOption] = useState('');
  const [postcode, setPostcode] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [country, setCountry] = useState('');

  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setComapnyName(customerData?.customerData?.company_name);
    setfName(customerData?.customerData?.first_name);
    setlName(customerData?.customerData?.last_name);
    setEmail(customerData?.customerData?.email);
    setTypeOption(customerData?.customerData?.type);
    setPostcode(customerData?.customerData?.postcode);
    setBuildingNumber(customerData?.customerData?.building_no);
    setStreet(customerData?.customerData?.street);
    setTown(customerData?.customerData?.town);
    setCountry(customerData?.customerData?.county);
  }, [customerData]);

  useEffect(() => {
    setFieldsFilled(
      comapnyName &&
        fname &&
        lname &&
        email &&
        typeOption &&
        postcode &&
        buildingNumber &&
        street &&
        town &&
        country
    );
  }, [
    comapnyName,
    fname,
    lname,
    email,
    typeOption,
    postcode,
    buildingNumber,
    street,
    town,
    country,
  ]);

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

      const url = `${baseUrl}/api/editAdminCustomer?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('company_name', comapnyName);
      formdata.append('first_name', fname);
      formdata.append('last_name', lname);
      formdata.append('email', email);
      formdata.append('type', typeOption);
      formdata.append('building_no', buildingNumber);
      formdata.append('street', street);
      formdata.append('town', town);
      formdata.append('county', country);
      formdata.append('postcode', postcode);
      formdata.append('customerid', userData.customerid);
      formdata.append('id', customerData.customerData.id);

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
            setfName(''),
              setComapnyName(''),
              setlName(''),
              setEmail(''),
              setTypeOption(null),
              setPostcode(''),
              setBuildingNumber(''),
              setStreet(''),
              setTown(''),
              setCountry(''),
              setLoading(false);
            localStorage.removeItem('cus');
            toast.success(<Text as="b">Customer updated successfully</Text>);
            router.back();
          } else {
            toast.error(<Text as="b">Error while updating customer</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while updating customer</Text>);
        });
    }
  };

  const handleChangeType = (selectedOption) =>
    setTypeOption(selectedOption.value);

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Company Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            value={comapnyName}
            placeholder="Enter name"
            className="col-span-full"
            onChange={(event) => setComapnyName(event.target.value)}
          />
        </FormGroup>

        <FormGroup
          title="Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            value={fname}
            placeholder="First name"
            onChange={(event) => setfName(event.target.value)}
          />
          <Input
            value={lname}
            placeholder="Last name"
            onChange={(event) => setlName(event.target.value)}
          />
        </FormGroup>

        <FormGroup
          title="Email Address"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            value={email}
            className="col-span-full"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          title="Select a type"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Select
            className="col-span-full"
            options={type}
            value={typeOption}
            onChange={handleChangeType}
            displayValue={(value) => {
              const selectedOption = type.find(
                (option) => option.value === value
              );
              return selectedOption ? selectedOption.label : null;
            }}
          />
        </FormGroup>

        <FormGroup
          title="Address"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            value={postcode}
            placeholder="Enter postcode*"
            onChange={(event) => setPostcode(event.target.value)}
          />
          <Input
            value={buildingNumber}
            placeholder="Building name/no"
            onChange={(event) => setBuildingNumber(event.target.value)}
          />

          <Input
            value={street}
            placeholder="Street"
            onChange={(event) => setStreet(event.target.value)}
          />
          <Input
            value={town}
            placeholder="Town"
            onChange={(event) => setTown(event.target.value)}
          />
          <Input
            value={country}
            placeholder="Country"
            onChange={(event) => setCountry(event.target.value)}
          />
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

export default CustomerForm;
