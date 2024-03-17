import React, { useState, useRef, useEffect } from 'react';
import { HiDotsVertical, HiTrash } from 'react-icons/hi';
import { Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import { queryClient } from '@tanstack/react-query';

const StudentList = ({ studentsToDisplay, filtersApplied }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const optionsRef = useRef(null);

  const handleToggleOptions = (studentId) => {
    setSelectedStudentId(studentId);
  };

  const handleDeleteStudent = (studentId) => {
    console.log('Deleting student with ID:', studentId);
    const loggedInStatusString = localStorage.getItem('loggedInStatus');
    const loggedInStatus = loggedInStatusString
      ? JSON.parse(loggedInStatusString)
      : false;

    if (loggedInStatus === true) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);
      const url = `${baseUrl}/api/removeWaitingStudent?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('id', studentId);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          toast.success(<Text as="b">Student deleted successfully</Text>);
          setSelectedStudentId(null);
          // await queryClient.refetchQueries({
          //   queryKey: ['fetchAllWaitingStudents'],
          // });
        })
        .catch((error) => {
          toast.error(<Text as="b">Error while deleting student</Text>);
          setSelectedStudentId(null);
        });
    } else {
      toast.error(<Text as="b">Error while deleting student</Text>);
      setSelectedStudentId(null);
    }
  };

  const handleClickOutsideOptions = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setSelectedStudentId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOptions);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOptions);
    };
  }, []);

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
                Student Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Date/Time
              </th>

              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {studentsToDisplay.map((student) => (
              <tr key={student.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-md font-semibold text-gray-800">
                    {`${student?.child_first_name} ${student?.child_last_name}`}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-xs text-gray-500">
                    {`${student?.class_type_name} ${student?.age_range}`}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-xs text-gray-500">
                    {student?.bulding_no}
                  </div>
                  <div className="text-xs text-gray-500">{student?.steet}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-xs text-gray-500">
                    {`${student.day} @ ${student.time}`}
                  </div>
                </td>
                <td className="relative whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleOptions(student.id)}
                    className="text-lg text-gray-500 hover:text-gray-600 focus:outline-none"
                  >
                    <HiDotsVertical />
                  </button>
                  {selectedStudentId === student.id && (
                    <div
                      ref={optionsRef}
                      className="absolute right-0 rounded border bg-white shadow-md"
                    >
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="flex w-full items-center justify-between px-4 py-2 text-sm text-red-700  hover:bg-gray-100 "
                      >
                        <HiTrash className="mr-2" />
                        <span>
                          Remove{' '}
                          {`${student.child_first_name} ${student.child_last_name}`}
                        </span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Please a select a class to filter students</p>
      )}
    </div>
  );
};

export default StudentList;
