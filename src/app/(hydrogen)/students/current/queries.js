'use client';

import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import { Text } from 'rizzui';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function fetchAllStudents(router) {
  const loggedInStatusString = localStorage.getItem('loggedInStatus');
  const loggedInStatus = loggedInStatusString
    ? JSON.parse(loggedInStatusString)
    : false;

  if (loggedInStatus === true) {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    const url = `${baseUrl}/api/getStudentsInAllClasses?customerid=${userData.customerid}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedToken.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.setItem('session', false);
        router.push('/auth/sign-in');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log(result.result);
      return result.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } else {
    console.log('not logged in');
  }
}

export async function fetchClassGenres(router) {
  const loggedInStatusString = localStorage.getItem('loggedInStatus');
  const loggedInStatus = loggedInStatusString
    ? JSON.parse(loggedInStatusString)
    : false;

  if (loggedInStatus === true) {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);

    const url = `${baseUrl}/api/getClassGenres`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedToken.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.setItem('session', false);
        router.push('/auth/sign-in');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log(result);
      return result.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } else {
    console.log('not logged in');
  }
}

export async function fetchClassTypes(router) {
  const loggedInStatusString = localStorage.getItem('loggedInStatus');
  const loggedInStatus = loggedInStatusString
    ? JSON.parse(loggedInStatusString)
    : false;

  if (loggedInStatus === true) {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);

    const url = `${baseUrl}/api/getClassTypes`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedToken.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.setItem('session', false);
        router.push('/auth/sign-in');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('getClassTypes', result);
      return result.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } else {
    console.log('not logged in');
  }
}

export async function fetchClasses(router) {
  const loggedInStatusString = localStorage.getItem('loggedInStatus');
  const loggedInStatus = loggedInStatusString
    ? JSON.parse(loggedInStatusString)
    : false;

  if (loggedInStatus === true) {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);

    const url = `${baseUrl}/api/getFranchiseClasses?customerid=${userData.customerid}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedToken.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        localStorage.setItem('session', false);
        router.push('/auth/sign-in');
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('getClasses', result.result);
      return result.result.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  } else {
    console.log('not logged in');
  }
}
