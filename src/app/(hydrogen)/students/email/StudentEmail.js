'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import QuillEditor from '@/components/ui/quill-editor';
import { Button } from 'rizzui';
import { useQuery } from '@tanstack/react-query';
import { fetchAllStudents, fetchClasses } from '../current/queries';
import StudentsFilters from './StudentsFilters';
import StudentList from './StudentList';

function StudentEmail() {
  const [subject, setSubject] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    classGenre: '',
    classType: '',
    class: '',
  });

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
    console.log('Subject:', subject);
    console.log('Editor Content:', editorContent);
    setShowStudents(true);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const isDisabled = subject.trim() === '' || editorContent.trim() === '';

  let studentsToDisplay = allStudents;
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.classid === selectedFilters?.class?.value
    );
  }

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
              subject={subject}
              editorContent={editorContent}
              setSubject={setSubject}
              setEditorContent={setEditorContent}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default StudentEmail;
