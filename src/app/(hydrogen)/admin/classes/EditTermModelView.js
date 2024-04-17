import React, { useState } from 'react';
import { Button, Text } from 'rizzui';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { Calendar } from 'react-multi-date-picker';
import baseUrl from '@/utils/baseUrl';
import toast from 'react-hot-toast';

export default function EditTermModelView({
  closeModal,
  openModal,
  filteredClassDates,
}) {
  const [duplicateOption, setDuplicateOption] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [addedDates, setAddedDates] = useState([]);

  let addDates = [];
  let removeDates = [];

  // Group dates by term
  const groupedDates = filteredClassDates.reduce((acc, curr) => {
    if (acc[curr.term]) {
      acc[curr.term].push(new Date(curr.edate));
    } else {
      acc[curr.term] = [new Date(curr.edate)];
    }
    return acc;
  }, {});

  // Format dates for each term
  const newArray = Object.entries(groupedDates).map(([term, dates]) => {
    if (dates.length === 1) {
      return {
        label: dates[0].toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        value: term,
      };
    } else {
      const startDate = dates[0].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const endDate = dates[dates.length - 1].toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return {
        label: `${startDate} - ${endDate}`,
        value: term,
      };
    }
  });

  const handleTermOkClick = () => {
    setLoadingEdit(true);
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
      const storedDateIds = localStorage.getItem('filteredDateswithIds');
      const DateswithIds = JSON.parse(storedDateIds);

      removeDates = DateswithIds.filter((item) => {
        return !addedDates.includes(item.date);
      }).map((item) => item.id);

      if (!userData || !parsedToken) {
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      const url = `${baseUrl}/api/editTerm?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('term', duplicateOption);
      formdata.append('classId', classId.id);
      formdata.append('addDates', JSON.stringify(addDates));
      formdata.append('removeDates', JSON.stringify(removeDates));
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
            setLoadingEdit(false);
            closeModal();
            toast.success(<Text as="b">Term Updated.</Text>);
            localStorage.removeItem('filteredDateswithIds');
            localStorage.removeItem('dateIds');
            window.location.reload();
          } else {
            closeModal();
            toast.error(<Text as="b">Error while Updating term.</Text>);
            setLoadingEdit(false);
          }
        })
        .catch((error) => {
          closeModal();
          toast.error(<Text as="b">Error while Updating term.</Text>);
          setLoadingEdit(false);
        });
    }
  };

  const handleRadioChange = (term) => {
    const filteredDates = filteredClassDates.filter(
      (date) => date.term === term
    );

    setSelectedDates(filteredDates.map((date) => date.edate));

    const filteredDateIds = filteredDates.map((date) => {
      return date.id;
    });
    const filteredDateswithIds = filteredDates.map((date) => {
      return { id: date.id, date: date.edate };
    });

    localStorage.setItem('dateIds', JSON.stringify(filteredDateIds));
    localStorage.setItem(
      'filteredDateswithIds',
      JSON.stringify(filteredDateswithIds)
    );

    setDuplicateOption(term);
  };

  const handleEditClick = () => {
    openModal({
      view: (
        <div className="flex h-full w-auto flex-col items-center justify-center py-5">
          <Calendar
            multiple
            value={selectedDates}
            onChange={(dates) => {
              const formattedDates = dates.map((date) => {
                const jsDate = new Date(date);
                const adjustedDate = new Date(
                  jsDate.getTime() - jsDate.getTimezoneOffset() * 60000
                );
                return adjustedDate.toISOString().split('T')[0];
              });

              addDates = formattedDates;

              // removeDates = previouslySelectedDates.filter(
              //   (date) => !formattedDates.includes(date)
              // );
            }}
          />

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
              {loadingEdit ? (
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
            <Button onClick={() => handleTermDelete()}>
              {loadingDelete ? (
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
  };

  const handleTermDelete = () => {
    setLoadingDelete(true);
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
      const storedDateIds = localStorage.getItem('dateIds');
      const filteredDateIds = JSON.parse(storedDateIds);

      if (!userData || !parsedToken) {
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      const url = `${baseUrl}/api/editTerm?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('term', duplicateOption);
      formdata.append('classId', classId.id);
      formdata.append('addDates', []);
      formdata.append('removeDates', JSON.stringify(filteredDateIds));
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
          setLoadingDelete(false);
          if (result.result === 'success') {
            setLoadingDelete(false);
            closeModal();
            toast.success(<Text as="b">Term Deleted.</Text>);
            localStorage.removeItem('dateIds');
            localStorage.removeItem('filteredDateswithIds');
            window.location.reload();
          } else {
            closeModal();
            toast.error(<Text as="b">Error while deleting term.</Text>);
            setLoadingDelete(false);
          }
        })
        .catch((error) => {
          closeModal();
          toast.error(<Text as="b">Error while deleting term.</Text>);
          setLoadingDelete(false);
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
            key={item.value}
            htmlFor={item.value}
            className="flex items-center"
          >
            <input
              type="radio"
              id={item.value}
              // name={item.name}
              value={item.value}
              className="mr-2"
              onChange={() => handleRadioChange(item.value)}
              checked={duplicateOption === item.value}
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
          {loadingDelete ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Delete'
          )}
        </Button>
        <Button disabled={duplicateOption === ''} onClick={handleEditClick}>
          {loadingEdit ? (
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
