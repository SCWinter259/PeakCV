'use client';

import { Ref, useState } from 'react';

interface IJobDescriptionEditor {
  jobDescriptionRef: Ref<HTMLTextAreaElement>;
}

const JobDescriptionEditor = ({ jobDescriptionRef }: IJobDescriptionEditor) => {
  const [content, setContent] = useState<string>('');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
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
