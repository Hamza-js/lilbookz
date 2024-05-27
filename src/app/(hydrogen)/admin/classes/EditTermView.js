'use client';

import React, { useState } from 'react';
import DatePicker, {
  Calendar,
  getAllDatesInRange,
} from 'react-multi-date-picker';
import { Button, Text } from 'rizzui';
import Spinner from '@/components/ui/spinner';
import toast from 'react-hot-toast';
import baseUrl from '@/utils/baseUrl';
import { useModal } from '@/app/shared/modal-views/use-modal';

const EditTermView = ({ classItem, filteredClassDates, classDatesData }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const { openModal, closeModal } = useModal();

  const handleOkClick = async () => {
    setLoading(true);
    try {
      // const classDates = localStorage.getItem('classDates');
      // const classDatesData = classDates ? JSON.parse(classDates) : [];
      // const filteredClassDates = classDatesData.filter(
      //   (d) => d.classid === classItem.id
      // );
      const addDates = selectedDates.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
      let termValue;
      if (filteredClassDates.length > 0) {
        termValue = Math.max.apply(
          Math,
          filteredClassDates.map((o) => o.term)
        );
      } else {
        termValue = 1;
      }
      let existDates = filteredClassDates.filter(
        (d) => d.term === termValue.toString()
      );
      existDates = existDates.map((d) => d.edate);
      existDates = existDates.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
      if (
        existDates.length > 0 &&
        new Date(existDates[existDates.length - 1]).getTime() >=
          new Date(addDates[0]).getTime()
      ) {
        closeModal();
        toast.error(
          <Text>
            Dates already exists for existing terms. Please select other dates.
          </Text>
        );
      } else {
        const loggedInStatusString = localStorage.getItem('loggedInStatus');
        const loggedInStatus = loggedInStatusString
          ? JSON.parse(loggedInStatusString)
          : false;

        if (loggedInStatus === true) {
          setLoading(true);
          const userDataString = localStorage.getItem('userData');
          const userData = userDataString ? JSON.parse(userDataString) : null;
          const storedToken = localStorage.getItem('tokenLilBookz');
          const parsedToken = JSON.parse(storedToken);
          const url = `${baseUrl}/api/addTerm?customerid=${userData.customerid}&id=${classItem.id}`;

          const myHeaders = new Headers();
          myHeaders.append(
            'Authorization',
            `Bearer ${parsedToken.access_token}`
          );

          const formattedDates = selectedDates.map((date) => {
            if (typeof date === 'object') {
              const formattedDate = new Date(date).toISOString().slice(0, 10);
              return `"${formattedDate}"`;
            } else {
              return date;
            }
          });
          const datesString = `[${formattedDates.join(',')}]`;

          const formdata = new FormData();
          formdata.append('term', termValue + 1);
          formdata.append('classId', classItem.id);
          formdata.append('dates', datesString);
          formdata.append('customerid', userData.customerid);

          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };

          try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();

            if (result.result === 'success') {
              closeModal();
              toast.success(<Text as="b">Term added successfully.</Text>);
            } else {
              closeModal();
              toast.error(<Text as="b">Error while adding term.</Text>);
            }
          } catch (error) {
            closeModal();
            toast.error(<Text as="b">Error while adding term.</Text>);
          } finally {
            setLoading(false);
          }
        } else {
          closeModal();
          toast.error(<Text as="b">Error while adding term.</Text>);
        }
      }
    } catch (error) {
      closeModal();
      toast.error(<Text as="b">Error while adding term.</Text>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-auto flex-col items-center justify-center py-5">
      <Calendar
        multiple
        value={selectedDates}
        onChange={(dates) => setSelectedDates(dates)}
      />

      {/* <p>{selectedDates.length > 0 && selectedDates.join(', ')}</p> */}

      <div className="mt-5 flex justify-end">
        <Button
          className="mr-2"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleOkClick}>
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Done'
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditTermView;
