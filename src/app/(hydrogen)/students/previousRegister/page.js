'use client';

import PageHeader from '@/app/shared/page-header';
import { useSearchParams } from 'next/navigation';
import SelectDate from './SelectDate';
import { useEffect, useState } from 'react';
import baseUrl from '@/utils/baseUrl';
import { Loader } from '@/components/ui/loader';

// export const metadata = {
//   ...metaObject('Students'),
// };

const pageHeader = {
  title: 'Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'previous',
    },
  ],
};

function PreviousRegister() {
  const [loadingDates, setLoadingDates] = useState(false);
  const [dates, setDates] = useState([]);

  const searchParams = useSearchParams();
  const classid = searchParams.get('classid');

  useEffect(() => {
    try {
      setLoadingDates(true);
      const loggedInStatusString = localStorage.getItem('loggedInStatus');
      const loggedInStatus = loggedInStatusString
        ? JSON.parse(loggedInStatusString)
        : false;

      if (loggedInStatus === true) {
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const storedToken = localStorage.getItem('tokenLilBookz');
        const parsedToken = JSON.parse(storedToken);
        const url = `${baseUrl}/api/getPreviousRegisterDates?customerid=${userData.customerid}&classid=${classid}`;
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('dates', result.result);
            setDates(result.result);
          })
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDates(false);
    }
  }, [classid]);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {loadingDates ? (
        <div className="m-auto">
          <Loader size="xl" />
        </div>
      ) : (
        dates && <SelectDate dates={dates} classid={classid} />
      )}
    </div>
  );
}

export default PreviousRegister;
