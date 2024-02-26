import baseUrl from '@/utils/baseUrl';

export async function fetchAllStudents() {
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

export async function fetchClassGenres() {
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

export async function fetchClassTypes() {
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

export async function fetchClasses() {
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
