'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Text, Title } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import FormGroup from '@/app/shared/form-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const ClassForm = () => {
  const [fname, setfname] = useState(null);
  const [lname, setlname] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [fieldsFilled, setFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFieldsFilled(
      fname && lname && email && phoneNumber && newPassword && bio && image
    );
  }, [fname, lname, email, phoneNumber, newPassword, bio, image]);

  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleChangePhoneNumber = (event) => setPhoneNumber(event.target.value);

  const handleChangeNewPassword = (event) => setNewPassword(event.target.value);

  const handleChangeBio = (event) => setBio(event.target.value);

  const handleImageChange = (event) => setImage(event.target.files[0]); // Update image state when file input changes

  const handleSave = () => {
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

      const url = `${baseUrl}/api/addTeacher?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      // formdata.append('memberid', userData.memberid);
      formdata.append('customerid', userData.customerid);
      formdata.append('first_name', fname);
      formdata.append('last_name', lname);
      formdata.append('email_address', email);
      formdata.append('phone', phoneNumber);
      formdata.append('password', newPassword);
      formdata.append('pages', '');
      formdata.append('bio_description', bio);
      formdata.append('bio_image', image);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.teacherId !== false) {
            setEmail('');
            setPhoneNumber('');
            setNewPassword('');
            setBio('');
            setImage(null);
            setLoading(false);
            router.replace('/admin/teachers');
            toast.success(<Text as="b">Teacher added successfully</Text>);
          } else if (result && result.message === 'Email already exists!') {
            toast.error(<Text as="b">Email already exists!</Text>);
          } else {
            toast.error(<Text as="b">Error while adding teacher</Text>);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while adding teacher</Text>);
        });
    }
  };

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Enter first name"
            onChange={(event) => setfname(event.target.value)}
          />
          <Input
            placeholder="Enter last name"
            onChange={(event) => setlname(event.target.value)}
          />
        </FormGroup>

        <FormGroup
          title="Email & Phone Number"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="email"
            placeholder="Enter email address"
            onChange={handleChangeEmail}
          />
          <Input
            // type="tel"
            placeholder="Enter phone number"
            onChange={handleChangePhoneNumber}
          />
        </FormGroup>

        <FormGroup
          title="New Password"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            type="password"
            className="col-span-full"
            placeholder="Enter new password"
            onChange={handleChangeNewPassword}
          />
        </FormGroup>

        <FormGroup
          title="Bio"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Textarea
            className="col-span-full"
            placeholder="Enter bio description here..."
            onChange={handleChangeBio}
          />
        </FormGroup>
        <FormGroup
          title="Image"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </FormGroup>
      </div>
      <div className="sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
        <Button
          variant="outline"
          className="w-full @xl:w-auto"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleSave}
          type="submit"
          className="w-full @xl:w-auto"
          disabled={!fieldsFilled}
        >
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </>
  );
};

export default ClassForm;
