'use client';

import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

const studentToEditId = JSON.parse(localStorage.getItem('studentToEdit'));

const StudentForm = () => {
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [homePhoneNumber, setHomePhoneNumber] = useState('');
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [county, setCounty] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyName2nd, setEmergencyName2nd] = useState('');
  const [emergencyNumber2nd, setEmergencyNumber2nd] = useState('');
  const [emergencyRelationship2nd, setEmergencyRelationship2nd] = useState('');
  const [medicalDetails, setMedicalDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [startDate, setStartDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function fetchStudent(id) {
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);

      if (!parsedToken) {
        throw new Error('Authorization token not found');
      }

      const url = `${baseUrl}/api/fetchStudent?id=${id}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: myHeaders,
        });

        if (!response.ok) {
          throw new Error(`Error fetching student: ${response.statusText}`);
        }

        const studentData = await response.json();
        setStudentToEdit(studentData?.result);
        return studentData;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchStudent(studentToEditId);
  }, [studentToEditId]);

  // Prefill form with data from studentToEdit
  useEffect(() => {
    setChildFirstName(studentToEdit?.child_first_name || '');
    setChildLastName(studentToEdit?.child_last_name || '');
    setDob(studentToEdit?.dob || '');
    setStartDate(studentToEdit?.start_date || '');
    setGender(studentToEdit?.gender || '');
    setParentFirstName(studentToEdit?.parent_first_name || '');
    setParentLastName(studentToEdit?.parent_last_name || '');
    setRelationship(studentToEdit?.relationship || '');
    setHomePhoneNumber(studentToEdit?.home_phone_number || '');
    setMobilePhoneNumber(studentToEdit?.mobile_phone_number || '');
    setEmailAddress(studentToEdit?.email_address || '');
    setPostcode(studentToEdit?.postcode || '');
    setBuildingNumber(studentToEdit?.building_number || '');
    setStreet(studentToEdit?.street || '');
    setTown(studentToEdit?.town || '');
    setCounty(studentToEdit?.county || '');
    setEmergencyName(studentToEdit?.emergency_name || '');
    setEmergencyNumber(studentToEdit?.emergency_number || '');
    setEmergencyRelationship(studentToEdit?.emergency_relationship || '');
    setEmergencyName2nd(studentToEdit?.emergency_name_2nd || '');
    setEmergencyNumber2nd(studentToEdit?.emergency_number_2nd || '');
    setEmergencyRelationship2nd(
      studentToEdit?.emergency_relationship_2nd || ''
    );
    setMedicalDetails(studentToEdit?.medical_details || '');
  }, [studentToEdit]);

  // Check if all required fields are filled
  useEffect(() => {
    setFieldsFilled(
      childFirstName &&
        childLastName &&
        dob &&
        gender &&
        parentFirstName &&
        parentLastName &&
        mobilePhoneNumber &&
        emailAddress &&
        postcode &&
        buildingNumber &&
        street &&
        town &&
        county &&
        emergencyName &&
        emergencyNumber &&
        emergencyRelationship
    );
  }, [
    childFirstName,
    childLastName,
    dob,
    gender,
    parentFirstName,
    parentLastName,
    mobilePhoneNumber,
    emailAddress,
    postcode,
    buildingNumber,
    street,
    town,
    county,
    emergencyName,
    emergencyNumber,
    emergencyRelationship,
  ]);

  const handleSave = () => {
    setLoading(true);
    const loggedInStatusString = localStorage.getItem('loggedInStatus');
    const loggedInStatus = loggedInStatusString
      ? JSON.parse(loggedInStatusString)
      : false;

    if (loggedInStatus) {
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const storedToken = localStorage.getItem('tokenLilBookz');
      const parsedToken = JSON.parse(storedToken);

      if (!userData || !parsedToken) {
        console.error('User data or token not found in localStorage');
        return;
      }

      const url = `${baseUrl}/api/editStudent?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('child_first_name', childFirstName);
      formdata.append('child_last_name', childLastName);
      formdata.append('dob', dob);
      formdata.append('start_date', startDate);
      formdata.append('gender', gender);
      formdata.append('parent_first_name', parentFirstName);
      formdata.append('parent_last_name', parentLastName);
      formdata.append('relationship', relationship);
      formdata.append('home_phone_number', homePhoneNumber);
      formdata.append('mobile_phone_number', mobilePhoneNumber);
      formdata.append('email_address', emailAddress);
      formdata.append('postcode', postcode);
      formdata.append('building_number', buildingNumber);
      formdata.append('street', street);
      formdata.append('town', town);
      formdata.append('county', county);
      formdata.append('emergency_name', emergencyName);
      formdata.append('emergency_number', emergencyNumber);
      formdata.append('emergency_relationship', emergencyRelationship);
      formdata.append('emergency_name_2nd', emergencyName2nd);
      formdata.append('emergency_number_2nd', emergencyNumber2nd);
      formdata.append('emergency_relationship_2nd', emergencyRelationship2nd);
      formdata.append('medical_details', medicalDetails);
      formdata.append('id', studentToEdit?.id);

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
            toast.success(<Text as="b">Student updated successfully</Text>);
            router.back();
          } else {
            toast.error(<Text as="b">Error while updating student</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while updating student</Text>);
        });
    }
  };

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7">
        <FormGroup title="Student Information">
          <Input
            value={childFirstName}
            placeholder="Child's First Name"
            onChange={(e) => setChildFirstName(e.target.value)}
            required
          />
          <Input
            value={childLastName}
            placeholder="Child's Last Name"
            onChange={(e) => setChildLastName(e.target.value)}
            required
          />
          <Input
            value={dob}
            type="date"
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <Input
            value={startDate}
            type="date"
            placeholder="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            value={gender}
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup title="Parent Information">
          <Input
            value={parentFirstName}
            placeholder="Parent's First Name"
            onChange={(e) => setParentFirstName(e.target.value)}
            required
          />
          <Input
            value={parentLastName}
            placeholder="Parent's Last Name"
            onChange={(e) => setParentLastName(e.target.value)}
            required
          />
          <Input
            value={relationship}
            placeholder="Relationship"
            onChange={(e) => setRelationship(e.target.value)}
          />
        </FormGroup>

        <FormGroup title="Contact Information">
          <Input
            value={homePhoneNumber}
            placeholder="Home Phone Number"
            onChange={(e) => setHomePhoneNumber(e.target.value)}
          />
          <Input
            value={mobilePhoneNumber}
            placeholder="Mobile Phone Number"
            onChange={(e) => setMobilePhoneNumber(e.target.value)}
            required
          />
          <Input
            value={emailAddress}
            placeholder="Email Address"
            type="email"
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup title="Address Information">
          <Input
            value={postcode}
            placeholder="Postcode"
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
          <Input
            value={buildingNumber}
            placeholder="Building Number"
            onChange={(e) => setBuildingNumber(e.target.value)}
            required
          />
          <Input
            value={street}
            placeholder="Street"
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <Input
            value={town}
            placeholder="Town"
            onChange={(e) => setTown(e.target.value)}
            required
          />
          <Input
            value={county}
            placeholder="County"
            onChange={(e) => setCounty(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup title="Emergency Contact">
          <Input
            value={emergencyName}
            placeholder="Emergency Contact Name"
            onChange={(e) => setEmergencyName(e.target.value)}
            required
          />
          <Input
            value={emergencyNumber}
            placeholder="Emergency Contact Number"
            onChange={(e) => setEmergencyNumber(e.target.value)}
            required
          />
          <Input
            value={emergencyRelationship}
            placeholder="Relationship to Child"
            onChange={(e) => setEmergencyRelationship(e.target.value)}
            required
          />
          <Input
            value={emergencyName2nd}
            placeholder="Second Emergency Contact Name"
            onChange={(e) => setEmergencyName2nd(e.target.value)}
          />
          <Input
            value={emergencyNumber2nd}
            placeholder="Second Emergency Contact Number"
            onChange={(e) => setEmergencyNumber2nd(e.target.value)}
          />
          <Input
            value={emergencyRelationship2nd}
            placeholder="Relationship to Child (Second Contact)"
            onChange={(e) => setEmergencyRelationship2nd(e.target.value)}
          />
        </FormGroup>

        <FormGroup title="Medical Information">
          <Input
            value={medicalDetails}
            placeholder="Medical Details (if any)"
            onChange={(e) => setMedicalDetails(e.target.value)}
          />
        </FormGroup>

        <Button disabled={!fieldsFilled || loading} onClick={handleSave}>
          {loading ? <Spinner size="sm" /> : 'Save Changes'}
        </Button>
      </div>
    </>
  );
};

export default StudentForm;
