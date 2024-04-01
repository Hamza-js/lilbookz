import React, { useState } from 'react';
import { Button, Text } from 'rizzui';
import { duplicateOptions } from './duplicateOptions';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { Calendar } from 'react-multi-date-picker';
import baseUrl from '@/utils/baseUrl';
import toast from 'react-hot-toast';

export default function EditTermModelView({
  classItem,
  closeModal,
  openModal,
  filteredClassDates,
  classDatesData,
}) {
  const [duplicateOption, setDuplicateOption] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState([]);

  const newArray = filteredClassDates.map((item) => {
    return {
      id: item.id,
      label: new Date(item.edate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      value: item.term,
    };
  });

  // console.log(newArray);

  const handleTermOkClick = () => {
    setLoading(true);
    console.log('selectedDates', selectedDates);
    setLoading(false);
  };

  const handleRadioChange = (option) => {
    console.log(option);
    setDuplicateOption(option);
  };

  const handleEditClick = () => {
    setLoading(true);
    if (duplicateOption === '1') {
      openModal({
        view: (
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
              <Button onClick={handleTermOkClick}>
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
        ),
        customSize: '480px',
      });
    } else {
      const dataString = JSON.stringify(classItem);
      localStorage.setItem('class', dataString);
      router.push('/admin/classes/duplicate');
      // console.log('Class');
    }
  };

  const handleDeleteClick = () => {
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Delete Term</Text>
          <Text className="mb-4 text-lg md:text-base">
            Are you sure you want to delete this term?
          </Text>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              Cancel
            </Button>
            <Button onClick={() => handleTermDelete()}>Yes</Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleTermDelete = () => {
    const loggedInStatusString = localStorage.getItem('loggedInStatus');
    const loggedInStatus = loggedInStatusString
      ? JSON.parse(loggedInStatusString)
      : false;

    if (loggedInStatus === true) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const classData = localStorage.getItem('class');
      const classId = classData ? JSON.parse(classData) : null;
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);

      if (!userData || !parsedToken) {
        console.error('User data or token not found in localStorage');
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/editTerm?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('term', duplicateOption);
      formdata.append('classId', classId.id);
      formdata.append('addDates', []);
      formdata.append('removeDates', [duplicateOption]);
      formdata.append('customerid', userData.customerid);
      formdata.append('memberid', userData.memberid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result === 'success') {
            closeModal();
            toast.success(<Text as="b">Term Deleted.</Text>);
          } else {
            closeModal();
            toast.error(<Text as="b">Error while deleting term.</Text>);
          }
        })
        .catch((error) => {
          closeModal();
          toast.error(<Text as="b">Error while deleting term.</Text>);
        });
    }
  };

  return (
    <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
      <div className="mb-2 text-lg font-bold md:text-xl">All Terms</div>
      <Text>Choose which term to edit or delete?</Text>
      <div className="mb-10 mt-2 h-[1px] w-full bg-slate-200"></div>
      <div className="mt-5 flex max-h-64 flex-col space-y-2 pl-3">
        {newArray.map((item) => (
          <label
            key={item.id}
            htmlFor={item.value}
            className="flex items-center"
          >
            <input
              type="radio"
              id={item.value}
              // name={item.name}
              value={item.value}
              className="mr-2"
              onChange={() => handleRadioChange(item.id)}
              checked={duplicateOption === item.id}
            />
            <span className="text-lg">{item.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button className="mr-2" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="mr-2"
          disabled={duplicateOption === ''}
          onClick={handleDeleteClick}
        >
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Delete'
          )}
        </Button>
        <Button disabled={duplicateOption === ''} onClick={handleEditClick}>
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Edit'
          )}
        </Button>
      </div>
    </div>
  );
}
