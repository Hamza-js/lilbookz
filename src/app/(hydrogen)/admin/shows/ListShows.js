import React, { useState } from 'react';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import Spinner from '@/components/ui/spinner';
import Link from 'next/link';
import {
  FaCopy,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSeedling,
  FaPaperPlane,
} from 'react-icons/fa';
import baseUrl from '@/utils/baseUrl';
import toast from 'react-hot-toast';
import {
  HiDotsVertical,
  HiOutlineMail,
  HiOutlineCalendar,
} from 'react-icons/hi';

const ListTeachers = ({ showsData, setshowsData }) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);

  const handleDeleteSHow = async (show) => {
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
      const url = `${baseUrl}/api/deleteShow?customerid=${userData.customerid}&id=${show.id}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('showid', show.id);
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

        console.log(result.result);
        closeDrawer();
        if (result.success === "success") {
          const updatedShowaData = showsData.filter(
            (item) => item.id !== teacher.id
          );
          setshowsData(updatedShowaData);
          toast.success(<Text as="b">Deleted successfully</Text>);
        } else {
          toast.error(<Text as="b">Error while deleting show</Text>);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        closeDrawer();
        toast.error(<Text as="b">Error deleting show</Text>);
      } finally {
        setLoading(false);
      }
    } else {
      closeDrawer();
      setLoading(false);
      toast.error(<Text as="b">Error while deleting class</Text>);
    }
  };

  const handleIconClick = (show) => {
    openDrawer({
      view: (
        <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
          <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
            <Title as="h5" className="font-semibold">
              {`Options for ${show?.name} `}
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
              <div className="flex w-44 items-center gap-2">
                <FaPaperPlane className="mr-2" />
                <span>Send Invites</span>
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
              <div className="flex w-44 items-center gap-2">
                <FaEdit className="mr-2" />
                <span>Edit Show</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleDeleteSHow(show)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {loading ? (
              <div className="m-auto">
                <Spinner size="sm" className="text-blue-600" />
              </div>
            ) : (
              <div className="flex w-44 items-center gap-2 text-red-400">
                <FaTrashAlt className="mr-2" />
                <span>Remove Show</span>
              </div>
            )}
          </Button>

          {/* <Button
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
          </Button> */}
        </div>
      ),
      placement: 'right',
    });
  };

  const formatDate = (dateStr) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', options);
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
              {`${showsData.length} Shows`}
            </th>
            <th className="flex items-center justify-end">
              <Link href="/admin/teachers/addTeacher">
                <div className="mr-3 mt-[10px] cursor-pointer rounded-full bg-black p-[6px] text-base text-white">
                  <FaPlus />
                </div>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {showsData.map((show) => (
            <tr key={show.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-md font-semibold text-gray-800">
                  {`${show?.name} `}
                </div>
                <div className="flex text-xs text-gray-500">
                  {show.building_number}
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <HiOutlineCalendar className="mr-1 text-lg" />{' '}
                  {formatDate(show.show_date_time)}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => handleIconClick(show)}
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

export default ListTeachers;
