'use client';

import { Ref, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { setJobDescription } from '@/lib/features/beforeSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface IJobDescriptionEditor {
  jobDescriptionRef: Ref<HTMLTextAreaElement>;
}

const JobDescriptionEditor = ({ jobDescriptionRef }: IJobDescriptionEditor) => {
  const jobDescription = useSelector((state: RootState) => state.before.jobDescription);
  const [content, setContent] = useState<string>(jobDescription);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (content: string) => {
    dispatch(setJobDescription(content)); // save job description to Redux store
    alert('Job description saved successfully!');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="my-1 flex flex-col items-center">
        <button
          onClick={() => handleSave(content)}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Save
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center overflow-auto border border-slate-700">
        <textarea
          ref={jobDescriptionRef}
          className="w-full h-full p-4 bg-gray-800 text-white rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your job description here..."
        />
      </div>
    </div>
  );
};

export default JobDescriptionEditor;
