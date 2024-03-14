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

const ListCostumersInvoices = ({
  customersInvoicesData,
  setcustomesrInvoicesData,
  cusCompanyName,
}) => {
  const { openDrawer, closeDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteInvoice = async (invoice) => {
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
      const url = `${baseUrl}/api/deleteInvoice?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('invoiceid', invoice.id);
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
          const updatedCustomersInvoicesData = customersInvoicesData.filter(
            (item) => item.id !== invoice.id
          );
          setcustomesrInvoicesData(updatedCustomersInvoicesData);
          toast.success(<Text as="b">Deleted successfully</Text>);
        } else {
          toast.error(<Text as="b">Error while deleting invoice</Text>);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        closeDrawer();
        toast.error(<Text as="b">Error deleting invoice</Text>);
      } finally {
        setLoading(false);
      }
    } else {
      closeDrawer();
      setLoading(false);
      toast.error(<Text as="b">Error while deleting invoice</Text>);
    }
  };

  const resentInvoice = (invoice) => {
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

      const url = `${baseUrl}/api/sendInvoice?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();

      formdata.append('customerid', userData.customerid);
      formdata.append('clientid', invoice.studentid);
      formdata.append('amount', invoice.amount);
      formdata.append('id', invoice.id);
      formdata.append('paymentType', invoice.type);
      formdata.append('paid', invoice.paid);
      formdata.append('description', invoice.description);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.result === 'success') {
            setLoading(false);
            toast.success(<Text as="b">Invoice sent successfully</Text>);
            closeDrawer();
          } else {
            toast.error(<Text as="b">Error while sending invoice</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while sending invoice</Text>);
        });
    }
  };

  const openInvoice = (invoice) => {
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
      closeDrawer();
      const url =
        'https://www.lilbookz.co.uk/invoice.php?id=' +
        invoice.id +
        '&stu=' +
        invoice.studentid +
        '&cust=' +
        userData.customerid;
      window.open(url, '_blank');
    }
  };

  const handleIconClick = (invoice) => {
    openDrawer({
      view: (
        <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
          <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
            <Title as="h5" className="font-semibold">
              {`Invoice Options`}
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
            onClick={() => openInvoice(invoice)}
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

                <span>Open Invoice</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => resentInvoice(invoice)}
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
                <span>Resend Invoice</span>
              </div>
            )}
          </Button>

          <Button
            onClick={() => handleDeleteInvoice(invoice)}
            size="lg"
            variant="outline"
            className="mb-2 flex items-center"
          >
            {!loading ? (
              <div className="flex w-44 items-center gap-2 text-red-400">
                <FaTrashAlt className="mr-2" />
                <span>Delete Invoice</span>
              </div>
            ) : (
              <div className="m-auto">
                <Spinner size="sm" className="text-red-400" />
              </div>
            )}
          </Button>
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
      <table className="mt-3 min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {customersInvoicesData.map((invoice) => (
            <tr key={invoice.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-md font-semibold text-gray-800">
                  {`${formatDate(invoice?.sdate)} `}
                </div>
                <div className="mt-1 flex text-xs text-gray-500">
                  {`£ ${invoice.amount} `}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div
                  className={`text-md font-semibold text-gray-100 ${
                    invoice?.paid === '1' ? 'bg-green-400' : 'bg-red-400'
                  } flex items-center justify-center rounded-lg  p-2`}
                >
                  {`${invoice?.paid === '1' ? 'Paid' : 'Due'} `}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  onClick={() => handleIconClick(invoice)}
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

export default ListCostumersInvoices;
