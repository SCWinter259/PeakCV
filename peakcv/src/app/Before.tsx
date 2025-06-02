'use client';

import Spinner from '@/components/Spinner';
import { ChangeEvent, useRef, useState } from 'react';
import pdfParse from 'pdf-parse';
import PDFViewer from '@/components/PDFViewer';

const Before = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // fire up the input
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setMessage('Uploading file...');
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      alert('Please upload a PDF file.');
      setMessage('');
      setLoading(false);
      return;
    }

    setMessage('Processing file...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log('File uploaded:', selectedFile.name);
    setFile(selectedFile);

    // clear out states at the end
    setLoading(false);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-1/2 border-1 border-slate-700">
      <div className="flex w-full h-12 bg-neutral-900 rounded-t"></div>
      <div className='flex w-full flex-1 p-4 overflow-auto'>
        <div className="flex items-center h-full w-full bg-neutral-900">
          {!loading && !file && (
            <div className="flex flex-col items-center justify-center w-full h-full text-center">
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                hidden={true}
                onChange={handleUpload}
              />
              <button
                onClick={handleClick}
                className="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
              >
                Upload Resume
              </button>
            </div>
          )}
          {loading && <Spinner message={message} />}
          {!loading && file && <PDFViewer file={file} />}
        </div>
      </div>
    </div>
  );
};

export default Before;
