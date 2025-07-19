'use client';

import { Editor } from '@monaco-editor/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface IJSONViewer {
  textJsonContent: string;
  setTextJsonContent: ActionCreatorWithPayload<any, string>;
}

const JSONViewer = ({ textJsonContent, setTextJsonContent }: IJSONViewer) => {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState<string>(textJsonContent);

  // validate that the content is a valid JSON. If validation success, resumeJson gets updated
  const handleValidate = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      const stringJson = JSON.stringify(parsed, null, 2);
      setContent(stringJson);
      dispatch(setTextJsonContent(stringJson)); // save formatted JSON to Redux store
    } catch (error) {
      console.error(error);
      alert('Invalid JSON format');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="my-1 flex flex-col items-center">
        <button
          onClick={() => handleValidate(content)}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Validate JSON
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center overflow-auto border border-slate-700">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={content}
          onChange={(value) => setContent(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            formatOnType: true,
            formatOnPaste: true,
          }}
        />
      </div>
    </div>
  );
};

export default JSONViewer;
