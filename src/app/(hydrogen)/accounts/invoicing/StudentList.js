import React, { useState } from 'react';
import { Button, Text } from 'rizzui';
import baseUrl from '@/utils/baseUrl';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';

const StudentList = ({ studentsToDisplay, filtersApplied }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [individualAmounts, setIndividualAmounts] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedStudents(studentsToDisplay.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const toggleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(
        selectedStudents.filter((studentId) => studentId !== id)
      );
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleInputChange = (id, amount) => {
    setIndividualAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: amount,
    }));
  };

  const handleRegistration = async () => {
    let allInvoicesSent = true; // Track if all invoices are sent successfully

    try {
      setLoading(true);
      const loggedInStatusString = localStorage.getItem('loggedInStatus');
      const loggedInStatus = loggedInStatusString
        ? JSON.parse(loggedInStatusString)
        : false;

      if (loggedInStatus !== true) {
        // console.error('User is not logged in.');
        return;
      }

      const userDataString = localStorage.getItem('userData');
      const storedToken = localStorage.getItem('tokenLilBookz');

      if (!userDataString || !storedToken) {
        // console.error('User data or token not found in localStorage');
        return;
      }

      const userData = JSON.parse(userDataString);
      const parsedToken = JSON.parse(storedToken);
      const url = `${baseUrl}/api/requestPayment?customerid=${userData.customerid}`;
      const invoiceURL = `${baseUrl}/api/sendInvoices?customerid=${userData.customerid}`;
      const finalSelectedStudents = [];

      selectedStudents.forEach((studentId) => {
        const student = studentsToDisplay.find((s) => s.id === studentId);
        const amount =
          individualAmounts[studentId] !== undefined
            ? individualAmounts[studentId]
            : invoiceAmount;
        finalSelectedStudents.push({ student, amount });
      });

      // console.log('finalSelectedStudents', finalSelectedStudents);

      if (finalSelectedStudents.length > 0) {
        const finalSelectedStudentsWithExtras = finalSelectedStudents.map(
          (student) => ({
            ...student.student,
            amount: student.amount,
            checked: false,
            paid: false,
          })
        );

        for (const s of finalSelectedStudents) {
          if (s.student.setupDD === 'done') {
            // console.log('Go in');
            const formdata = new FormData();
            formdata.append('amount', s.amount);
            formdata.append('description', 'Lil Beatz Term Invoice');
            formdata.append('customerId', s.student.dd_customerid);
            formdata.append('memberid', userData.customerid);

            const response = await fetch(url, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${parsedToken.access_token}`,
              },
              body: formdata,
            });

            if (!response.ok) {
              throw new Error('Failed to request payment');
            }
          }

          // console.log(finalSelectedStudentsWithExtras);

          const formdata = new FormData();
          formdata.append(
            'students',
            JSON.stringify(finalSelectedStudentsWithExtras)
          );
          formdata.append('customerid', userData.customerid);

          const response = await fetch(invoiceURL, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${parsedToken.access_token}`,
            },
            body: formdata,
          });

          if (!response.ok) {
            allInvoicesSent = false; // Set to false if any invoice failed
            throw new Error('Failed to send invoices');
          }
        }

        if (allInvoicesSent) {
          toast.success(<Text as="b">All invoices sent successfully</Text>);
          setSelectedStudents([]);
          setIndividualAmounts({});
          setInvoiceAmount('');
          setSelectAll(false);
        } else {
          toast.error(<Text as="b">Some invoices failed to send</Text>);
        }
        setSelectedStudents([]);
      }
    } catch (error) {
      // console.error('Error during registration:', error);
      toast.error(<Text as="b">Error while sending invoices</Text>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {studentsToDisplay && studentsToDisplay.length > 0 ? (
        <div className="mb-2 flex items-center gap-2 rounded-md bg-slate-100 p-3 px-6">
          <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={selectAll}
          />
          <input
            className="ml-3 h-9 rounded-md border-none placeholder-slate-400 outline-none"
            type="number"
            value={invoiceAmount}
            onChange={(e) => setInvoiceAmount(e.target.value)}
            placeholder="Amount for all"
          />
        </div>
      ) : null}
      <div className="overflow-x-auto">
        {studentsToDisplay && studentsToDisplay.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                ></th>
                <th></th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Name
                </th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {studentsToDisplay.map((student) => (
                <tr
                  key={student.id}
                  className={
                    selectedStudents.includes(student.id) ? 'bg-gray-100' : ''
                  }
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectStudent(student.id)}
                      checked={selectedStudents.includes(student.id)}
                    />
                  </td>
                  <td className="mx-auto flex items-center justify-center px-3 py-4 text-white">
                    <div
                      className={`rounded-md ${
                        student.membership_paid === '1'
                          ? 'bg-blue-500'
                          : 'bg-purple-500'
                      } px-2 py-1`}
                    >
                      {` ${
                        student.membership_paid === '1'
                          ? student.termCount
                          : student.attendanceCount
                      } `}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      {student.child_first_name} {student.child_last_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.parent_first_name} {student.parent_last_name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <input
                      className="h-9 w-24 rounded-md border-none bg-slate-100 placeholder-slate-400 outline-none"
                      placeholder={`E.g  £5.0`}
                      type="number"
                      value={
                        individualAmounts[student.id] !== undefined
                          ? individualAmounts[student.id]
                          : ''
                      }
                      onChange={(e) =>
                        handleInputChange(student.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Please select a class to filter students</p>
        )}

        {(invoiceAmount ||
          Object.values(individualAmounts).some((amount) => amount !== '')) &&
          selectedStudents.length > 0 && (
            <div className="flex items-center justify-center gap-5 p-5">
              <Button
                size="lg"
                onClick={handleRegistration}
                className="flex-shrink-0"
              >
                {loading ? (
                  <div className="m-auto">
                    <Spinner size="sm" className="text-white" />
                  </div>
                ) : (
                  'Send Invoices'
                )}
              </Button>
            </div>
          )}
      </div>
    </>
  );
};

export default StudentList;
