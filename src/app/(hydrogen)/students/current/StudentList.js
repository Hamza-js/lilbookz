'use client';

import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';
import UsersColorIcon from '@/components/icons/users-color';
import { MdLocalHospital } from 'react-icons/md';
import { AiOutlineFileText } from 'react-icons/ai';
import {
  FaCamera,
  FaDollarSign,
  FaPaperPlane,
  FaExclamationCircle,
  FaTimesCircle,
  FaUserMinus,
  FaEdit,
  FaEnvelope,
  FaFileInvoice,
  FaLevelUpAlt,
  FaFileAlt,
  FaEye,
} from 'react-icons/fa';

const StudentList = ({
  studentsToDisplay,
  filtersApplied,
  handleUpdatePhotoPermission,
  handleShowMedical,
  handleInvoiceClick,
  handleSendInvoice,
  handleSendEmail,
  handleChangeClass,
  handleCancelMembership,
  handleAddClass,
  handleMembershipReminderFunction,
  handleUpgrade,
}) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedStudents(studentsToDisplay.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const toggleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleRegistration = async () => {
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

      const url = `${baseUrl}/api/updateRegister?customerid=${userData.customerid}`;

      const formdata = new FormData();
      formdata.append('classid', studentsToDisplay[0].classid);
      formdata.append('id', selectedStudents);
      formdata.append('customerid', userData.customerid);
      formdata.append('memberid', userData.memberid);

      console.log('classid', studentsToDisplay[0].classid);
      console.log('classid', selectedStudents);
      console.log('classid', userData.customerid);
      console.log('classid', userData.memberid);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
            // 'Content-Type': 'application/json',
          },
          body: formdata,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        toast.success(<Text as="b">Registered successfully</Text>);
        // console.log('Registered', result);
        setSelectedStudents([]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(<Text as="b">Error while Registering</Text>);
        // console.error('Error fetching data:', error);
        throw error;
      }
    } else {
      console.log('not logged in');
    }
  };

  const handleIconClick = (student) => {
    openDrawer({
      view: (
        <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
          <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
            <Title as="h5" className="font-semibold">
              {`Options for ${student.child_first_name} ${student.child_last_name}`}
            </Title>
            <ActionIcon
              size="sm"
              rounded="full"
              variant="text"
              onClick={() => closeDrawer()}
            >
              <PiXBold className="h-4 w-4" />
            </ActionIcon>
          </div>
          <Button
            onClick={() => handleAddClass(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaExclamationCircle className="mr-2" />{' '}
              {/* Icon for Add to Another Class */}
              <span>Add to Another Class</span>
            </div>
          </Button>

          {/* <Button
            onClick={() => handleSendInvite(show)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaExclamationCircle className="mr-2" />{' '}
              <span>Add incident</span>
            </div>
          </Button> */}

          <Button
            onClick={() => handleCancelMembership(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaTimesCircle className="mr-2" /> <span>Cancel Membership</span>
            </div>
          </Button>

          <Button
            onClick={() => handleChangeClass(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaEdit className="mr-2" />
              <span>Change Class</span>
            </div>
          </Button>

          <Button
            onClick={() => handleSendEmail(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaEnvelope className="mr-2" />
              <span>Email Student</span>
            </div>
          </Button>

          <Button
            onClick={() => handleMembershipReminderFunction(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaLevelUpAlt className="mr-2" />{' '}
              {/* Icon for Membership Reminder */}
              <span>Membership Reminder</span>
            </div>
          </Button>

          <Button
            onClick={() => handleSendInvoice(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaFileInvoice className="mr-2" /> {/* Icon for Send Invoice */}
              <span>Send Invoice</span>
            </div>
          </Button>
          {student.membership_paid === '0' ? (
            <Button
              onClick={() => handleUpgrade(student)}
              size="lg"
              variant="outline"
              className="mb-2 flex items-center"
            >
              <div className="flex w-64 items-center gap-2">
                <FaLevelUpAlt className="mr-2" />{' '}
                {/* Icon for Upgrade to Member */}
                <span>Upgrade to member</span>
              </div>
            </Button>
          ) : null}

          <Button
            onClick={() => handleInvoiceClick(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            <div className="flex w-64 items-center gap-2">
              <FaFileAlt className="mr-2" />
              <span>View Invoices</span>
            </div>
          </Button>
        </div>
      ),
      placement: 'right',
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        {studentsToDisplay && studentsToDisplay.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={selectAll}
                  />
                </th>
                <th></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Parents Name
                </th>

                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {studentsToDisplay.map((student) => (
                <tr
                  key={student.id}
                  className={
                    selectedStudents.includes(student.id) ? 'bg-gray-100' : ''
                  }
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectStudent(student.id)}
                      checked={selectedStudents.includes(student.id)}
                    />
                  </td>

                  <td className="mx-auto flex items-center justify-center px-3 py-4 text-white">
                    <div
                      className={`rounded-md ${
                        student.membership_paid === '1'
                          ? 'bg-blue-500'
                          : 'bg-purple-500'
                      } flex items-center justify-center px-3 py-2`}
                    >
                      {/* {student.membership_paid === '1' ? null : (
                      <UsersColorIcon />
                    )} */}
                      {` ${
                        student.membership_paid === '1'
                          ? student.termCount
                          : student.attendanceCount
                      } `}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      {student.child_first_name} {student.child_last_name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      {student.parent_first_name} {student.parent_last_name}
                    </div>
                  </td>

                  {student.medical_details !== '' ? (
                    <td className="text-md whitespace-nowrap px-6 py-4 text-right font-medium">
                      <button
                        onClick={() => handleShowMedical(student)}
                        className="text-lg text-red-500 hover:text-red-900 focus:outline-none"
                      >
                        <MdLocalHospital />
                      </button>
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <p></p>
                    </td>
                  )}

                  {student.unpaidInvoiceCount !== '0' ? (
                    <td className="text-md whitespace-nowrap px-6 py-4 text-right font-medium">
                      <button
                        onClick={() => handleInvoiceClick(student)}
                        className="text-lg text-orange-500 hover:text-orange-900 focus:outline-none"
                      >
                        <FaDollarSign />
                      </button>
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <p></p>
                    </td>
                  )}

                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleUpdatePhotoPermission(student)}
                      className={`text-lg  focus:outline-none ${
                        student.photo_permission == '1'
                          ? 'text-green-400 hover:text-green-900'
                          : 'text-red-400 hover:text-red-900'
                      }`}
                    >
                      <FaCamera />
                    </button>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleIconClick(student)}
                      className="text-lg text-gray-500 hover:text-gray-600 focus:outline-none"
                    >
                      <HiDotsVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Please a select a class to filter students</p>
        )}

        {selectedStudents.length > 0 && filtersApplied && (
          <div className="flex items-center justify-center gap-5 p-5">
            <Button size="lg" variant="outline" className="flex-shrink-0">
              <Link
                href={`/students/previousRegister?classid=${studentsToDisplay[0].classid}`}
              >
                Previous Register
              </Link>
            </Button>
            <Button
              size="lg"
              onClick={handleRegistration}
              className="flex-shrink-0"
            >
              {loading ? (
                <div className="m-auto">
                  <Spinner size="sm" className="text-white" />
                </div>
              ) : (
                'Submit Register'
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentList;
