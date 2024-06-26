'use client';


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
import { HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { AiOutlineFileText } from 'react-icons/ai';

const ListCostumers = ({ customersData, setcustomesrData }) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigate = (cus) => {
    localStorage.setItem('cus_id', cus.id);
    localStorage.setItem('cus_company_name', cus.company_name);
    router.push('/admin/customers/sendInvoice');
  };

  const handleNavigateToInvoices = (cus) => {
    localStorage.setItem('cus_id', cus.id);
    localStorage.setItem('cus_company_name', cus.company_name);
    router.push('/admin/customers/invoices');
  };

  const handleNavigateToEdit = (cus) => {
    localStorage.setItem('cus', JSON.stringify(cus));
    closeDrawer()
    router.push('/admin/customers/editCustomer');
  };

  const handleDeleteCustomer = async (customer) => {
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
      const url = `${baseUrl}/api/removeAdminCustomer?customerid=${userData.customerid}&id=${customer.id}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('showid', customer.id);
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
        if (result.result === 'success') {
          const updatedCustomersData = customersData.filter(
            (item) => item.id !== customer.id
          );
          setcustomesrData(updatedCustomersData);
          toast.success(<Text as="b">Deleted successfully</Text>);
        } else {
          toast.error(<Text as="b">Error while deleting customer</Text>);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        closeDrawer();
        toast.error(<Text as="b">Error deleting customer</Text>);
      } finally {
        setLoading(false);
      }
    } else {
      closeDrawer();
      setLoading(false);
      toast.error(<Text as="b">Error while deleting class</Text>);
    }
  };

  const handleIconClick = (customer) => {
    openDrawer({
      view: (
        <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
          <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
            <Title as="h5" className="font-semibold">
              {`Options for ${customer?.company_name} `}
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
            onClick={() => handleNavigate(customer)}
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
                <span>Send Invoice</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleNavigateToInvoices(customer)}
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
                <AiOutlineFileText className="mr-2" />
                <span>View Invoices</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleNavigateToEdit(customer)}
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
                <span>Edit Customer</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleDeleteCustomer(customer)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {!loading ? (
              <div className="flex w-44 items-center gap-2 text-red-400">
                <FaTrashAlt className="mr-2" />
                <span>Remove Customer</span>
              </div>
            ) : (
              <div className="m-auto">
                <Spinner size="sm" className="text-red-400" />
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

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-semibold uppercase tracking-wider text-black"
            >
              {`${customersData.length} Customers`}
            </th>
            <th className="flex items-center justify-end">
              <Link href="/admin/customers/addCustomer">
                <div className="mr-3 mt-[10px] cursor-pointer rounded-full bg-black p-[6px] text-base text-white">
                  <FaPlus />
                </div>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {customersData.map((customer) => (
            <tr key={customer.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-md font-semibold text-gray-800">
                  {`${customer?.company_name} `}
                </div>
                <div className="flex text-xs text-gray-500">
                  {`${customer.first_name} ${customer.last_name}`}
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  {customer.building_no}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => handleIconClick(customer)}
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

export default ListCostumers;
