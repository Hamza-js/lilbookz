import { HiDotsVertical } from 'react-icons/hi';
import React, { useState } from 'react';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';

const ListCanceledStudents = ({ allCancelledStudents }) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);

  const handleReactivate = async (student) => {
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
      const url = `${baseUrl}/api/uncancelStudent?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('id', student.id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          closeDrawer();
          toast.success(
            <Text as="b">{`${student.child_first_name} ${student.child_last_name} reactivated successfully`}</Text>
          );
          setLoading(false);
        })
        .catch((error) => {
          closeDrawer();
          toast.error(<Text as="b">Error while reactivating</Text>);
          setLoading(false);
        });
    } else {
      closeDrawer();
      setLoading(false);
      toast.error(<Text as="b">Error while reactivating</Text>);
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
            onClick={() => handleReactivate(student)}
            size="lg"
            variant="outline"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-white" />
              </div>
            ) : (
              'Reactivate'
            )}
          </Button>
        </div>
      ),
      placement: 'right',
    });
  };
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Student Name
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {allCancelledStudents.map((student) => (
            <tr key={student.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div>
                  {student.child_first_name} {student.child_last_name}
                </div>
                <div className="text-xs text-gray-500">
                  {student.parent_first_name} {student.parent_last_name}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => handleIconClick(student)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <HiDotsVertical />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCanceledStudents;
