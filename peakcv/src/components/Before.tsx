'use client';

import Spinner from '@/components/Spinner';
import { ChangeEvent, useRef, useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import pdfToText from 'react-pdftotext';
import {
  createImproveResumePrompt,
  createResumeParsePrompt,
  getGeminiResponse,
} from '@/utils/gemini';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { setResumeJson } from '@/lib/features/beforeSlice';
import JSONViewer from './JSONViewer';
import JobDescriptionEditor from './JobDescriptionEditor';
import { setImprovementsJson } from '@/lib/features/afterSlice';

interface IBefore {
  setLoadingAfter: (loading: boolean) => void;
}

const Before = ({ setLoadingAfter }: IBefore) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [spinnerMessage, setSpinnerMessage] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'PDF' | 'JSON' | 'JD'>('PDF'); // default mode is PDF

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);

  // placeholder, this const will store the parsed resume JSON response from the Gemini API
  const resumeJson = useSelector((state: RootState) => state.before.resumeJson);
  const dispatch = useDispatch<AppDispatch>();

  /* 
  Take resumeJson text from Redux store and the job description from the
  JobDescriptionEditor component, and make API call to the AI.
  Store the response in the Redux store (improvementsJson text).
  The appearance of the response in Redux will start the After component.
  */
  const handleStartClick = async () => {
    setLoadingAfter(true); // set loading state for After component
    const jobDescription = jobDescriptionRef.current?.value || '';
    const prompt = createImproveResumePrompt(resumeJson, jobDescription);

    try {
      let res = await getGeminiResponse(prompt);

      // in case res somehow comes back undefined
      if (!res) {
        setLoadingAfter(false);
        return;
      }

      // trim ```json``` from the response
      res = res.replace(/^`*[a-z]*|`*$/g, '');
      // save the response to the Redux store
      dispatch(setImprovementsJson(res));
      setLoadingAfter(false); // reset loading state for After component
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleUploadResumeClick = () => {
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
      let res = await getGeminiResponse(prompt);

      // in case res somehow comes back undefined
      if (!res) {
        throw new Error('Gemini API response is undefined');
      }

      // trim ```json``` from the response
      res = res.replace(/^`*[a-z]*|`*$/g, '');

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
      {/* This div below is the top bar section, with all buttons */}
      <div className="flex w-full h-12 bg-neutral-100 dark:bg-neutral-900 rounded-t items-center justify-between">
        <div className="flex ml-4 gap-2">
          <button
            onClick={() => setSelectedMode('PDF')}
            disabled={selectedMode === 'PDF'}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'PDF'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            PDF
          </button>
          <button
            onClick={() => setSelectedMode('JSON')}
            disabled={selectedMode === 'JSON' || resumeJson === ''}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'JSON' || resumeJson === ''
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => setSelectedMode('JD')}
            disabled={selectedMode === 'JD'}
            className={`w-42 my-1 p-1 rounded ${
              selectedMode === 'JD'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            Job Description
          </button>
        </div>
        <div className="flex ml-auto mr-4">
          <button
            onClick={handleStartClick}
            disabled={resumeJson === ''}
            className={`w-42 my-1 p-1 rounded ${
              resumeJson === ''
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Start
          </button>
        </div>
      </div>
      <div className="flex w-full flex-1 p-4 overflow-auto">
        <div className="flex items-center h-full w-full bg-neutral-100 dark:bg-neutral-900">
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
                onClick={handleUploadResumeClick}
                className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-700"
              >
                Upload Resume
              </button>
            </div>
          )}
          {selectedMode === 'PDF' && loading && <Spinner message={spinnerMessage} />}
          {selectedMode === 'PDF' && !loading && file && <PDFViewer file={file} />}
          {/* This part is for JSON View */}
          {selectedMode === 'JSON' && (
            <JSONViewer textJsonContent={resumeJson} setTextJsonContent={setResumeJson} />
          )}
          {/* This part is for the job description editor */}
          {selectedMode === 'JD' && <JobDescriptionEditor jobDescriptionRef={jobDescriptionRef} />}
        </div>
      </div>
    </div>
  );
};

export default Before;
