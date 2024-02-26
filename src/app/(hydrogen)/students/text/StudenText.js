import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from 'rizzui';
import { useQuery } from '@tanstack/react-query';
import { fetchAllStudents, fetchClasses } from '../current/queries';
import StudentsFilters from './StudentsFilters';
import StudentList from './StudentList';
import { Textarea } from '@/components/ui/textarea';

function StudenText() {
  const [text, setText] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    classGenre: '',
    classType: '',
    class: '',
  });
  const [pushNotification, setPushNotification] = useState(true);

  const {
    isLoading: isLoading2,
    error: error2,
    data: allStudents,
    isFetching: isFetching2,
  } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: fetchAllStudents,
  });

  const {
    isLoading: isLoading4,
    error: error4,
    data: classes,
    isFetching: isFetching4,
  } = useQuery({
    queryKey: ['fetchClasses'],
    queryFn: fetchClasses,
  });

  const handleButtonClick = () => {
    console.log('text:', text);
    setShowStudents(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckboxChange = () => {
    setPushNotification(!pushNotification);
  };

  const isDisabled = text.trim() === '';

  let studentsToDisplay = allStudents;
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.classid === selectedFilters?.class?.value
    );
  }

  return (
    <div>
      <Textarea
        placeholder="Type your message here..."
        textareaClassName="h-20"
        value={text}
        onChange={handleTextChange}
      />

      <div className="mt-2">
        <label className="w-full">
          <input
            className="mb-1 mr-2"
            type="checkbox"
            checked={pushNotification}
            onChange={handleCheckboxChange}
          />
          Push Notification?
        </label>
      </div>

      <Button
        className="my-4"
        onClick={handleButtonClick}
        disabled={isDisabled}
      >
        Done Writing
      </Button>

      {showStudents && (
        <>
          <div>
            <div className="my-5 h-[0.5px] w-full bg-gray-300"></div>
            <h3>Send to</h3>
            <StudentsFilters
              className="mb-6"
              classes={classes}
              onFiltersChange={setSelectedFilters}
              studentsToDisplay={studentsToDisplay}
              setFiltersApplied={setFiltersApplied}
              filtersApplied={filtersApplied}
            />
            <StudentList
              studentsToDisplay={studentsToDisplay}
              filtersApplied={filtersApplied}
              setShowStudents={setShowStudents}
              text={text}
              pushNotification={pushNotification}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StudenText;
