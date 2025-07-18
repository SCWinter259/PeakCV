'use client';

import Spinner from '@/components/Spinner';
import { ChangeEvent, useRef, useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import pdfToText from 'react-pdftotext';
import { createResumeParsePrompt, getGeminiResponse } from '@/utils/gemini';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setResumeJson } from '@/lib/features/beforeSlice';
import JSONViewer from './JSONViewer';
import JobDescriptionEditor from './JobDescriptionEditor';

const Before = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [spinnerMessage, setSpinnerMessage] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'PDF' | 'JSON' | 'JD'>('PDF'); // default mode is PDF

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
    const prompt = createResumeParsePrompt(pdfText);

    try {
      const res = await getGeminiResponse(prompt);

      // in case res somehow comes back undefined
      if (!res) {
        throw new Error('Gemini API response is undefined');
      }

      // save the response to the Redux store
      dispatch(setResumeJson(res));
    } catch (error) {
      console.error(error);
    }

    // clear out states at the end
    setLoading(false);
    setSpinnerMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-1/2 border-1 border-slate-700">
      <div className="flex w-full h-12 bg-neutral-900 rounded-t items-center justify-between">
        <div className="flex ml-1">
          <button
            onClick={() => setSelectedMode('PDF')}
            disabled={selectedMode === 'PDF'}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'PDF'
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            PDF
          </button>
          <button
            onClick={() => setSelectedMode('JSON')}
            disabled={selectedMode === 'JSON' || resumeJson === ''}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'JSON' || resumeJson === ''
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setSelectedMode('JD')}
            disabled={selectedMode === 'JD'}
            className={`w-42 my-1 p-1 rounded ${
              selectedMode === 'JD'
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            Job Description
          </button>
        </div>
        <div className="flex ml-auto mr-1">
          <button
            onClick={() => {}}
            disabled={resumeJson === ''}
            className={`w-42 my-1 p-1 rounded ${
              resumeJson === ''
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Start
          </button>
        </div>
      </div>
      <div className="flex w-full flex-1 p-4 overflow-auto">
        <div className="flex items-center h-full w-full bg-neutral-900">
          {/* This part is for PDF View */}
          {selectedMode === 'PDF' && !loading && !file && (
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
                className="mt-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Upload Resume
              </button>
            </div>
          )}
          {selectedMode === 'PDF' && loading && <Spinner message={spinnerMessage} />}
          {selectedMode === 'PDF' && !loading && file && <PDFViewer file={file} />}
          {/* This part is for JSON View */}
          {selectedMode === 'JSON' && <JSONViewer />}
          {/* This part is for the job description editor */}
          {selectedMode === 'JD' && <JobDescriptionEditor />}
        </div>
      </div>
    </div>
  );
};

export default Before;
