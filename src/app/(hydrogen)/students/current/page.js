'use client';

import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import {
  fetchClassGenres,
  fetchClassTypes,
  fetchClasses,
  fetchAllStudents,
} from './queries';
import { useQuery } from '@tanstack/react-query';
import StudentList from './StudentList';
import { Loader } from '@/components/ui/loader';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button, Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { useSearchParams } from 'next/navigation';

const pageHeader = {
  title: 'Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Current',
    },
  ],
};

function StudentCurrent() {
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selecteddClass, setSelectedClass] = useState('');
  const [selectedClass, setSelectClass] = useState('');
  const [toastDisplayed, setToastDisplayed] = useState(false);
  const [plan, setPlan] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    classGenre: '',
    classType: '',
    class: '',
  });

  const { openModal, closeModal } = useModal();
  const { openDrawer, closeDrawer } = useDrawer();
  const searchParams = useSearchParams();
  const stu_search_id = searchParams.get('id');
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
  }, []);

  const {
    isLoading: isLoading1,
    error: error1,
    data: classGenres,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getClassGenres'],
    queryFn: () => fetchClassGenres(router),
    retry: false,
  });

  const {
    isLoading: isLoading2,
    error: error2,
    data: classTypes,
    isFetching: isFetching2,
  } = useQuery({
    queryKey: ['fetchClassTypes'],
    queryFn: () => fetchClassTypes(router),
    retry: false,
  });

  const {
    isLoading: isLoading3,
    error: error3,
    data: classes,
    isFetching: isFetching3,
  } = useQuery({
    queryKey: ['fetchClasses'],
    queryFn: () => fetchClasses(router),
    retry: false,
  });

  const {
    isLoading: isLoading4,
    error: error4,
    data: allStudents,
    isFetching: isFetching4,
  } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: () => fetchAllStudents(router),
    retry: false,
  });

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
    setFiltersApplied(true);
    if (stu_search_id) {
      router.push('/students/current');
    }
  };

  let studentsToDisplay = [];
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.classid === selectedFilters?.class?.value
    );
  } else if (stu_search_id) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.id === stu_search_id
    );
  } else {
    studentsToDisplay = allStudents;
  }

  const confirmPhotoPermissionUpdate = async (student) => {
    closeModal();
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
        console.error('User data or token not found');
        return;
      }

      student.photo_permission =
        parseInt(student.photo_permission, 10) === 1 ? 0 : 1;

      const url = `${baseUrl}/api/updatePhotoPerm?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('type', student.photo_permission);
      formdata.append('id', student.id);
      formdata.append('customerid', userData.customerid);
      formdata.append('memberid', userData.memberid);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
          },
          body: formdata,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        toast.success(
          <Text as="b">Photo permission updated successfully</Text>
        );
        // console.log('Registered', result);
      } catch (error) {
        toast.error(<Text as="b">Error while Registering</Text>);
        // console.error('Error fetching data:', error);
        throw error;
      }
    }
  };

  const handleUpdatePhotoPermission = async (student) => {
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Confirm</Text>
          <Text className="mb-4 text-lg md:text-base">
            Are you sure you want to change the photo permission for this
            student?
          </Text>
          <div className="flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              No
            </Button>
            <Button onClick={() => confirmPhotoPermissionUpdate(student)}>
              Yes
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleShowMedical = async (student) => {
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">
            Medical details
          </Text>

          <Text className="mb-4 text-lg md:text-base">
            {student.medical_details}
          </Text>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleInvoiceClick = (student) => {
    localStorage.setItem('stu_id', student.id);
    router.push('/students/current/invoices');
  };

  const handleSendInvoice = (student) => {
    localStorage.setItem('stu_id', student.id);
    localStorage.setItem(
      'stu_name',
      `${student.parent_first_name} ${student.parent_last_name}`
    );
    router.push('/students/current/sendInvoice');
  };

  const handleSendEmail = (student) => {
    localStorage.setItem('stu_id', student.id);
    router.push('/students/current/email');
  };

  let changeClassId;

  const handleChangeClass = async (student) => {
    closeDrawer();
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">
            Choose class
          </Text>
          <Text className="mb-4 text-lg md:text-base">
            Choose which class to move this student to.
          </Text>
          <div className="mb-10 h-[1px] w-full bg-slate-200"></div>
          <div className="mt-5 flex max-h-64 flex-col space-y-2 overflow-y-scroll pl-3">
            {classes.map((classItem, index) => (
              <label
                key={index}
                htmlFor={`class${classItem.id}`}
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`class${classItem.id}`}
                  name="class"
                  value={classItem.id}
                  className="mr-2"
                  onChange={() => (changeClassId = classItem.id)}
                />
                <span className="text-lg">
                  {classItem.day} @ {classItem.time} - {classItem.town}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              Cancel
            </Button>
            <Button onClick={() => handleClassSelection(student)}>
              Submit
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleClassSelection = async (student) => {
    closeModal();
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

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/changeClass?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('studentid', student.id);
      formdata.append('classid', changeClassId);
      formdata.append('oldclassid', student.classid);
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
            toast.success(<Text as="b">Class changed.</Text>);
          } else {
            toast.error(<Text as="b">Error while changing class.</Text>);
          }
        })
        .catch((error) =>
          toast.error(<Text as="b">Error while changing class.</Text>)
        );
    }
  };

  const handleCancelMembership = async (student) => {
    closeDrawer();
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Confirm</Text>
          <Text className="mb-4 text-lg md:text-base">
            Are you sure you want to cancel this student&apos;s membership?
          </Text>

          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              No
            </Button>
            <Button onClick={() => handleCancelMembershipService(student)}>
              Yes
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleCancelMembershipService = async (student) => {
    closeModal();
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

      const url = `${baseUrl}/api/updateNotJoining?customerid=${userData.customerid}&id=${student.id}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        toast.success(<Text as="b">Membership canceled successfully</Text>);
        // console.log('Registered', result);
      } catch (error) {
        toast.error(
          <Text as="b">Could not cancel membership. Please try again.</Text>
        );
        // console.error('Error fetching data:', error);
        throw error;
      }
    } else {
      console.log('not logged in');
    }
  };

  let addToAnotherClassId;

  const handleAddClass = async (student) => {
    closeDrawer();
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">
            Choose new class
          </Text>
          <Text className="mb-4 text-lg md:text-base">
            Select a new class for this student.
          </Text>
          <div className="mb-10 h-[1px] w-full bg-slate-200"></div>
          <div className="mt-5 flex max-h-64 flex-col space-y-2 overflow-y-scroll pl-3">
            {classes.map((classItem, index) => (
              <label
                key={index}
                htmlFor={`class${classItem.id}`}
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`class${classItem.id}`}
                  name="selectedClass"
                  value={classItem.id}
                  className="mr-2"
                  onChange={() => (addToAnotherClassId = classItem.id)}
                  checked={selectedClass === classItem.id}
                />
                <span className="text-lg">
                  {classItem.day} @ {classItem.time} - {classItem.town}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              Cancel
            </Button>
            <Button onClick={() => handleClassAddSelection(student)}>
              Submit
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const handleClassAddSelection = async (student) => {
    closeModal();
    console.log('Selected class IDs:', selectedClasses);
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

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/addNewClass?customerid=${userData.customerid}&classid=${selectedClass}`;

      const formdata = new FormData();
      formdata.append('studentid', student.id);
      formdata.append('classid', JSON.stringify(['885']));
      formdata.append('memberid', userData.memberid);
      formdata.append('customerid', userData.customerid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            toast.success(
              <Text as="b">Student classes updated successfully.</Text>
            );
          } else {
            toast.error(<Text as="b">Error while updating classes.</Text>);
          }
        })
        .catch((error) =>
          toast.error(<Text as="b">Error while updating classes.</Text>)
        );
    } else {
      console.log('not logged in');
    }
  };

  const handleMembershipReminder = async (student) => {
    closeModal();
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

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/reminderMemberShipForSpecificStudent?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('student_id', student.id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            toast.success(<Text as="b">Mail & Sms Sent.</Text>);
          } else {
            toast.error(<Text as="b">Error while sending Mail & Sms.</Text>);
          }
        })
        .catch((error) =>
          toast.error(<Text as="b">Error while sending Mail & Sms.</Text>)
        );
    } else {
      console.log('not logged in');
    }
  };

  const handleMembershipReminderFunction = async (student) => {
    closeDrawer();
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Confirm</Text>
          <Text className="mb-4 text-lg md:text-base">
            Are you sure you want to send membership reminder to this student?
          </Text>
          <div className="flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              No
            </Button>
            <Button onClick={() => handleMembershipReminder(student)}>
              Yes
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const trialInputs = [
    {
      type: 'radio',
      label: 'Cash',
      name: 'Cash',
      value: '1',
    },
    {
      type: 'radio',
      label: 'Card',
      name: 'Card',
      value: '0',
    },
  ];

  const upgradeInputs = [
    {
      type: 'radio',
      label: 'Basic Cash (£10)',
      name: 'BasicCash',
      value: '1',
    },
    {
      type: 'radio',
      label: 'Basic Card (£10)',
      name: 'BasicCard',
      value: '0',
    },
    {
      type: 'radio',
      label: 'Premium Cash (£20)',
      name: 'PremiumCash',
      value: '3',
    },
    {
      type: 'radio',
      label: 'Premium Card (£20)',
      name: 'PremiumCard',
      value: '2',
    },
  ];

  const handleUpgrade = async (student) => {
    const radioOptions = student.trial === '0' ? trialInputs : upgradeInputs;
    closeDrawer();
    openModal({
      view: (
        <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
          <Text className="mb-4 text-lg font-bold md:text-xl">Payment</Text>
          <div className="mb-10 h-[1px] w-full bg-slate-200"></div>
          <div className="mt-5 flex max-h-64 flex-col space-y-2 overflow-y-scroll pl-3">
            {radioOptions.map((item, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  onClick={() => setPlan(item.value)}
                />
                <span className="text-lg">{item.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-2">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (student.trial === '0') {
                  updateMembershipPaymentType(student);
                } else {
                  updateTrialPaymentType(student);
                }
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      ),
      customSize: '480px',
    });
  };

  const updateMembershipPaymentType = (student) => {
    closeModal();
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
      const type = parseInt(plan, 10) % 2;
      const amount = parseInt(value, 10) > 1 ? '20.00' : '10.00';

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/updateMembershipPaid?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('id', student.id);
      formdata.append('type', type);
      formdata.append('amount', amount);
      formdata.append('parentId', student.parentid);
      formdata.append(
        'email',
        student.parentid === '0'
          ? student.email_address
          : student.parent_email_address
      );
      formdata.append('customerid', userData.customerid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            toast.success(
              <Text as="b">Membership Payment Type updated successfully.</Text>
            );
          } else {
            toast.error(
              <Text as="b">Error while updating membership payment ype.</Text>
            );
          }
        })
        .catch((error) =>
          toast.error(
            <Text as="b">Error while updating membership payment ype.</Text>
          )
        );
    } else {
      console.log('not logged in');
    }
  };

  const updateTrialPaymentType = (student) => {
    closeModal();
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

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);
      // myHeaders.append('Cookie', 'PHPSESSID=ultkgo7ko33cvgonpatpk1dsg9');

      const url = `${baseUrl}/api/updateTrialPaid?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('id', student.id);
      formdata.append('type', plan);
      formdata.append('customerid', userData.customerid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.result) {
            toast.success(
              <Text as="b">Trial payment pype updated successfully.</Text>
            );
          } else {
            toast.error(
              <Text as="b">Error while updating trial payment pype.</Text>
            );
          }
        })
        .catch((error) =>
          toast.error(
            <Text as="b">Error while updating trial payment pype.</Text>
          )
        );
    } else {
      console.log('not logged in');
    }
  };

  const handleEditStudent = (student) => {
    localStorage.setItem('studentToEdit', JSON.stringify(student?.id));
    router.push(`/students/current/editStudent/${student?.id}`);
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading1 ||
        isLoading2 ||
        isLoading3 ||
        isLoading4 ||
        isFetching1 ||
        isFetching2 ||
        isFetching3 ||
        isFetching4) && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading1 &&
        !isLoading2 &&
        !isLoading3 &&
        !isLoading4 &&
        !isFetching1 &&
        !isFetching2 &&
        !isFetching3 &&
        !isFetching4 && (
          <>
            <StudentsFilters
              className="mb-6"
              classGenres={classGenres}
              classTypes={classTypes}
              classes={classes}
              onFiltersChange={handleFiltersChange}
              studentsToDisplay={studentsToDisplay}
              setFiltersApplied={setFiltersApplied}
              filtersApplied={filtersApplied}
            />
            <StudentList
              studentsToDisplay={studentsToDisplay}
              filtersApplied={filtersApplied}
              handleUpdatePhotoPermission={handleUpdatePhotoPermission}
              handleShowMedical={handleShowMedical}
              handleInvoiceClick={handleInvoiceClick}
              handleSendInvoice={handleSendInvoice}
              handleSendEmail={handleSendEmail}
              handleChangeClass={handleChangeClass}
              handleCancelMembership={handleCancelMembership}
              handleAddClass={handleAddClass}
              handleMembershipReminderFunction={
                handleMembershipReminderFunction
              }
              handleUpgrade={handleUpgrade}
              handleEditStudent={handleEditStudent}
            />
          </>
        )}
    </div>
  );
}

export default StudentCurrent;
