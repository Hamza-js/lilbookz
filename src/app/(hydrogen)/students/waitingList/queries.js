'use client';


import baseUrl from '@/utils/baseUrl';

export async function fetchAllWaitingStudents() {
  const loggedInStatusString = localStorage.getItem('loggedInStatus');
  const loggedInStatus = loggedInStatusString
    ? JSON.parse(loggedInStatusString)
    : false;

  if (loggedInStatus === true) {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);

    const url = `${baseUrl}/api/getWaitingStudentsList?customerid=${userData.customerid}`;

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
      // console.log('getClasses', result.result);
      return result.result.waitingList;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } else {
    console.log('not logged in');
  }
}