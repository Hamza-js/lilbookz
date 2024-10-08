'use client';

import baseUrl from '@/utils/baseUrl';
import React, { useEffect, useState } from 'react';
import { Select, Text, Button } from 'rizzui';
import { Loader } from '@/components/ui/loader';
import { toast } from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function SelectDate({ dates, classid }) {
  const [value, setValue] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { openModal, closeModal } = useModal();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${day} ${months[monthIndex]}, ${year}`;
  };

  const options = dates.map((date, index) => ({
    label: formatDate(date.sdate),
    value: date.sdate,
  }));

  useEffect(() => {
    setValue(options.length > 0 ? options[0] : null);
  }, [dates]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // console.log('Trying to fetch data');
      if (dates.length > 0) {
        const loggedInStatusString = localStorage.getItem('loggedInStatus');
        const loggedInStatus = loggedInStatusString
          ? JSON.parse(loggedInStatusString)
          : false;

        if (loggedInStatus === true) {
          const userDataString = localStorage.getItem('userData');
          const userData = userDataString ? JSON.parse(userDataString) : null;
          const storedToken = localStorage.getItem('tokenLilBookz');
          const parsedToken = JSON.parse(storedToken);
          const url = `${baseUrl}/api/getPreviousRegister?customerid=${userData.customerid}&classid=${classid}&classDate=${value.value}`;

          const myHeaders = new Headers();
          myHeaders.append(
            'Authorization',
            `Bearer ${parsedToken.access_token}`
          );

          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          };
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          setResponseData(result.result);
          console.log(result.result);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  // Handle onChange event
  const handleChange = (selectedOption) => {
    // console.log(selectedOption);
    setValue(selectedOption);
  };

  const handleAttendanceChange = (item) => {
    closeModal();
    const attendance = item.not_attended === '0' ? '1' : '0';
    const loggedInStatusString = localStorage.getItem('loggedInStatus');
    const loggedInStatus = loggedInStatusString
      ? JSON.parse(loggedInStatusString)
      : false;
    if (loggedInStatus === true) {
      setLoading1(true);
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);
      const url = `${baseUrl}/api/updateAttendance?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('attendance', attendance);
      formdata.append('classDate', value?.value);
      formdata.append('studentid', item.id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          fetchData();
          toast.success(
            <Text as="b">
              {`Attendance of ${item.child_first_name} ${item.child_last_name} updated successfully`}
            </Text>
          );
          setLoading1(false);
        })
        .catch((error) => {
          toast.error(<Text as="b">Error while updating attendance</Text>);
          setLoading1(false);
        });
    } else {
      setLoading1(false);
      toast.error(<Text as="b">Error while updating attendance</Text>);
    }
  };

  const handleChangeAttendance = async (item) => {
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Confirm</Text>
          <Text className="mb-4 text-lg md:text-base">
            {`Are you sure you want to change attendance for ${item.child_first_name} ${item.child_last_name}?`}
          </Text>

          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              No
            </Button>
            <Button onClick={() => handleAttendanceChange(item)}>Yes</Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const renderTable = () => {
    if (responseData.length === 0) return null;

    return (
      <>
        {loading ? (
          <div className="m-10 flex items-center justify-center">
            <Loader size="xl" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-8 min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Child Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Parent Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {responseData.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.child_first_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.child_last_name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.parent_first_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.parent_last_name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => handleChangeAttendance(item)}
                        className={`rounded ${
                          item.not_attended === '1'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-700'
                        } px-4 py-2 font-semibold hover:${
                          item.not_attended === '1'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        Change Attendance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <Select
        label="Select Date"
        options={options}
        value={value}
        onChange={handleChange}
      />
      {renderTable()}
    </div>
  );
}
