import { HiDotsVertical } from 'react-icons/hi';
import React, { useState } from 'react';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';
import { FaCopy, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import baseUrl from '@/utils/baseUrl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ListClasses = ({ mergedData, setMergedData }) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClass = async (classItem) => {
    closeDrawer();
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
      const url = `${baseUrl}/api/removeClass?customerid=${userData.customerid}&id=${classItem.id}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('id', classItem.id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body: formdata,
        redirect: 'follow',
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();

        // console.log(result.result);
        
        if (result.result === false) {
          const updatedMergedData = mergedData.filter(
            (item) => item.id !== classItem.id
          );
          setMergedData(updatedMergedData);
          toast.success(<Text as="b">Class deleted successfully</Text>);
        } else {
          toast.error(<Text as="b">Error while deleting class</Text>);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        closeDrawer();
        toast.error(<Text as="b">Error deleting class</Text>);
      } finally {
        setLoading(false);
      }
    } else {
      closeDrawer();
      setLoading(false);
      toast.error(<Text as="b">Error while deleting class</Text>);
    }
  };

  const handleNavigateToEdit = (classItem) => {
    localStorage.setItem('class', JSON.stringify(classItem));
    closeDrawer();
    router.push('/admin/classes/editClass');
  };

  const handleIconClick = (classItem) => {
    openDrawer({
      view: (
        <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
          <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
            <Title as="h5" className="font-semibold">
              {`Options for ${classItem?.type?.name}`}
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
            // onClick={() => handleReactivate(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-white" />
              </div>
            ) : (
              <div className="flex w-36 items-center gap-2">
                <FaCopy className="mr-2" />
                <span>Duplicate</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleNavigateToEdit(classItem)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-white" />
              </div>
            ) : (
              <div className="flex w-36 items-center gap-2">
                <FaEdit className="mr-2" />
                <span>Edit Class</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleDeleteClass(classItem)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-blue-600" />
              </div>
            ) : (
              <div className="flex w-36 items-center gap-2 text-red-400">
                <FaTrashAlt className="mr-2" />
                <span>Delete Class</span>
              </div>
            )}
          </Button>

          <Button
            // onClick={() => handleReactivate(student)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-white" />
              </div>
            ) : (
              <div className="flex w-36 items-center gap-2">
                <FaPlus className="mr-2" />
                <span>Add Term</span>
              </div>
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
              className="px-6 py-3 text-left text-lg font-semibold uppercase tracking-wider text-black"
            >
              {`${mergedData.length} Classes`}
            </th>
            <th className="flex items-center justify-end">
              <Link href="/admin/classes/addClass">
                <div className="mr-3 mt-[10px] cursor-pointer rounded-full bg-black p-[6px] text-base text-white">
                  <FaPlus />
                </div>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {mergedData.map((classItem) => (
            <tr key={classItem.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-md font-semibold text-gray-800">
                  {classItem?.type?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {classItem.bulding_no}
                </div>
                <div className="text-xs text-gray-500">
                  {`${classItem.day} @ ${classItem.time}`}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => handleIconClick(classItem)}
                  className="text-lg text-gray-500 hover:text-gray-600"
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

export default ListClasses;
