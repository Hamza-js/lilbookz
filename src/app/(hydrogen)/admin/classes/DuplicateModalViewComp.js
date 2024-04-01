import React, { useState } from 'react';
import { Button } from 'rizzui';
import { duplicateOptions } from './duplicateOptions';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { Calendar } from 'react-multi-date-picker';

export default function DuplicateModalView({
  classItem,
  closeModal,
  openModal,
}) {
  const [duplicateOption, setDuplicateOption] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState([]);

  const handleTermOkClick = () => {
    setLoading(true);
    // console.log('selectedDates', selectedDates);
    setLoading(false);
  };

  const handleRadioChange = (option) => {
    // console.log(option);
    setDuplicateOption(option);
  };

  const handleOkClick = () => {
    setLoading(true);
    if (duplicateOption === '1') {
      openModal({
        view: (
          <div className="flex h-full w-auto flex-col items-center justify-center py-5">
            <Calendar
              multiple
              value={selectedDates}
              onChange={(dates) => setSelectedDates(dates)}
            />

            {/* <p>{selectedDates.length > 0 && selectedDates.join(', ')}</p> */}

            <div className="mt-5 flex justify-end">
              <Button
                className="mr-2"
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleTermOkClick}>
                {loading ? (
                  <div className="m-auto">
                    <Spinner size="sm" className="text-white" />
                  </div>
                ) : (
                  'Done'
                )}
              </Button>
            </div>
          </div>
        ),
        customSize: '480px',
      });
    } else {
      const dataString = JSON.stringify(classItem);
      localStorage.setItem('class', dataString);
      router.push('/admin/classes/duplicate');
      console.log('Class');
    }
  };

  return (
    <div className="w-full max-w-md rounded bg-white p-4 md:p-8">
      <div className="mb-4 text-lg font-bold md:text-xl">Duplicate</div>
      <div className="mb-10 h-[1px] w-full bg-slate-200"></div>
      <div className="mt-5 flex max-h-64 flex-col space-y-2 pl-3">
        {duplicateOptions.map((item) => (
          <label
            key={item.value}
            htmlFor={item.value}
            className="flex items-center"
          >
            <input
              type="radio"
              id={item.value}
              name={item.name}
              value={item.value}
              className="mr-2"
              onChange={() => handleRadioChange(item.value)}
              checked={duplicateOption === item.value}
            />
            <span className="text-lg">{item.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <Button className="mr-2" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={duplicateOption === ''} onClick={handleOkClick}>
          {loading ? (
            <div className="m-auto">
              <Spinner size="sm" className="text-white" />
            </div>
          ) : (
            'Ok'
          )}
        </Button>
      </div>
    </div>
  );
}
