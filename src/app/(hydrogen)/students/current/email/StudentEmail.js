'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import QuillEditor from '@/components/ui/quill-editor';
import { Button, Text } from 'rizzui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import baseUrl from '@/utils/baseUrl';
import Spinner from '@/components/ui/spinner';

function StudentEmail({ stuId }) {
  const [subject, setSubject] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const isDisabled = subject.trim() === '' || editorContent.trim() === '';

  const handleSendMail = async () => {
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

      const studentId = [stuId];

      const url = `${baseUrl}/api/sendEmail?customerid=${userData.customerid}`;

      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${parsedToken.access_token}`);

      const formdata = new FormData();
      formdata.append('ids', JSON.stringify(studentId));
      formdata.append('message', editorContent);
      formdata.append('subject', subject);
      formdata.append('isNotification', '');
      formdata.append('customerid', userData.customerid);
      formdata.append('memberid', userData.memberid);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          toast.success(<Text as="b">Email sent successfully</Text>);
          setSubject('');
          setEditorContent('');
          localStorage.removeItem('stu_id');
          router.back();
        })
        .catch((error) => {
          setLoading(false);
          toast.error(<Text as="b">Error while sending email</Text>);
        });
    }
  };

  return (
    <div>
      <Input
        placeholder="Subject"
        className="mb-3 flex-grow"
        value={subject}
        onChange={handleSubjectChange}
      />

      <QuillEditor
        // value={value}
        onChange={handleEditorChange}
        className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[200px]"
        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
      />

      <div className="flex items-center justify-center gap-5 p-5">
        <Button
          onClick={() => {
            router.back();
          }}
          size="lg"
          variant="outline"
          className="flex-shrink-0"
        >
          Cancel
        </Button>
        <Button
          disabled={isDisabled}
          size="lg"
          onClick={() => {
            handleSendMail();
          }}
          className="flex-shrink-0"
        >
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Send'
          )}
        </Button>
      </div>
    </div>
  );
}

export default StudentEmail;
