'use client';

import Spinner from '@/components/Spinner';
import { ChangeEvent, useRef, useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import pdfToText from 'react-pdftotext';
import { createResumeParsePromt, getGeminiResponse } from '@/utils/gemini';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setResumeJson } from '@/lib/features/beforeSlice';

const Before = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [spinnerMessage, setSpinnerMessage] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'PDF' | 'JSON'>('PDF'); // default mode is PDF

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // placeholder, this const will store the parsed resume JSON response from the Gemini API
  const resumeJson = useSelector((state: RootState) => state.before.resumeJson);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    fileInputRef.current?.click(); // fire up the input
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSpinnerMessage('Uploading file...');
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      alert('Please upload a PDF file.');
      setSpinnerMessage('');
      setLoading(false);
      return;
    }

    setSpinnerMessage('Processing file...');
    setFile(selectedFile);

    // read the PDF file to text
    let pdfText = '';
    try {
      pdfText = await pdfToText(selectedFile);
    } catch (error) {
      console.error(error);
      return;
    }

    // make a call to Gemini API
    const promt = createResumeParsePromt(pdfText);

    try {
      let res = await getGeminiResponse(promt);

      // in case res somehow comes back undefined
      if (!res) {
        setSpinnerMessage('');
        setLoading(false);
        return;
      }

      // save the response to the Redux store
      dispatch(setResumeJson(res));

      // trim the response text (this formatting part is to be moved to the JSON viewer component)
      res = res
        .replace(/^```json\s*/i, '') // remove starting ```json
        .replace(/```$/, '') // remove ending ```
        .trim();

      console.log(res);

      const formattedResume = JSON.parse(res);
      console.log(formattedResume);
      // up to here. we let the user trim themselves?
    } catch (error) {
      console.log(error);
      setSpinnerMessage('');
      setLoading(false);
      return;
    }

    // clear out states at the end
    setLoading(false);
    setSpinnerMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-1/2 border-1 border-slate-700">
      <div className="flex w-full h-12 bg-neutral-900 rounded-t justify-center items-center">
        <button
          onClick={() => setSelectedMode('PDF')}
          disabled={selectedMode === 'PDF'}
          className={`my-1 p-2 rounded ${
            selectedMode === 'PDF'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          PDF
        </button>
        <button
          onClick={() => setSelectedMode('JSON')}
          disabled={selectedMode === 'JSON'}
          className={`my-1 p-2 rounded ${
            selectedMode === 'JSON'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          JSON
        </button>
      </div>
      <div className="flex w-full flex-1 p-4 overflow-auto">
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
          {loading && <Spinner message={spinnerMessage} />}
          {!loading && file && <PDFViewer file={file} />}
        </div>
      </div>
    </div>
  );
};

export default Before;
