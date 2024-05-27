'use client';


import React, { useState } from 'react';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { Button, Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';

import Spinner from '@/components/ui/spinner';

const StudentList = ({
  studentsToDisplay,
  filtersApplied,
  setShowStudents,
  text,
  pushNotification,
  setText,
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

  const handleCancle = () => {
    setShowStudents(false);
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

      const url = `${baseUrl}/api/sendSMS?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('ids', JSON.stringify(selectedStudents));
      formdata.append('message', text);
      // formdata.append('subject', subject);
      formdata.append('isNotification', pushNotification);
      formdata.append('customerid', userData.customerid);
      formdata.append('memberid', userData.memberid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setSelectedStudents([]);
          setLoading(false);
          toast.success(<Text as="b">Message sent successfully</Text>);
          setShowStudents(false);
          setText('');
        })
        .catch((error) => {
          setSelectedStudents([]);
          setLoading(false);
          toast.error(<Text as="b">Error while sending message</Text>);
        });
    }
  };

  return (
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Student Name
              </th>
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
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    {student.child_first_name} {student.child_last_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {student.parent_first_name} {student.parent_last_name}
                  </div>
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
          <Button
            onClick={handleCancle}
            size="lg"
            variant="outline"
            className="flex-shrink-0"
          >
            Cancel
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
              'Send'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
