'use client';

import { Input } from '@/components/ui/input';
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

const typeOptions = [
  { label: 'Cash', value: '0' },
  { label: 'Card', value: '1' },
];

const InvoiceForm = ({ cusCompanyName, cusId }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [selectedType, setSelectedType] = useState(typeOptions[0].value);
  const [paid, setPaid] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  useEffect(() => {
    setFieldsFilled(amount && description);
  }, [amount, description]);

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

      const url = `${baseUrl}/api/sendCustomerInvoice?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();

      formdata.append('customerid', userData.customerid);
      formdata.append('clientid', cusId);
      formdata.append('amount', amount);
      formdata.append('paymentType', selectedType);
      formdata.append('paid', paid ? '1' : '0');
      formdata.append('description', description);

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
            setLoading(false);
            toast.success(<Text as="b">Invoice sent successfully</Text>);
            router.back();
          } else {
            toast.error(<Text as="b">Error while sending invoice</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while sending invoice</Text>);
        });
    }
  };

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <h2>{cusCompanyName}</h2>
        <FormGroup
          title="Invoice Amount: £"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Enter amount"
            className="col-span-full"
            onChange={(event) => setAmount(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          title="Payment Method"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          {typeOptions.map((option) => (
            <label key={option.value} className="">
              <input
                type="radio"
                value={option.value}
                checked={selectedType === option.value}
                onChange={handleTypeChange}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </FormGroup>
        <FormGroup className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11">
          <div className="flex justify-between rounded-lg border border-gray-300 p-[10px]">
            <span>Paid</span>
            <div className="">
              <label className="w-full">
                <input
                  className="mb-1 mr-2"
                  type="checkbox"
                  checked={paid}
                  onChange={() => setPaid(!paid)}
                />
              </label>
            </div>
          </div>
        </FormGroup>
        <FormGroup
          title="Description"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Enter description"
            className="col-span-full"
            onChange={(event) => setDescription(event.target.value)}
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
            'Send Invoice'
          )}
        </Button>
      </div>
    </>
  );
};

export default InvoiceForm;
