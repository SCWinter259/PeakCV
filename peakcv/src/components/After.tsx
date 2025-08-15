'use client';

import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import JSONViewer from './JSONViewer';
import { setImprovementsJson } from '@/lib/features/afterSlice';
import { useState, useEffect } from 'react';
import ImprovementList from './ImprovementList';
import { setGeneratedLatex } from '@/lib/features/afterSlice';
import LatexViewer from './LatexViewer';
import PDFViewer from './PDFViewer';

interface IAfter {
  loadingAfter: boolean;
}

const After = ({ loadingAfter }: IAfter) => {
  const improvementsJson = useSelector((state: RootState) => state.after.improvementsJson);
  const generatedLatex = useSelector((state: RootState) => state.after.generatedLatex);

  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [confirmJsonFormat, setConfirmJsonFormat] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'Suggestions' | 'LaTeX' | 'PDF'>('Suggestions');

  // I want to ensure that if the user click Improve Resume again, all states have to be reset
  // with this, if improvementsJson changes, the JSON Viewer will still be there (because confirmChanges will be reset)
  useEffect(() => {
    setConfirmJsonFormat(false);
    setSelectedMode('Suggestions');
    dispatch(setGeneratedLatex(''));
    setFile(null);
  }, [improvementsJson]);

  const handleDownloadClick = () => {
    if(file) {
      const url = window.URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume_new.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  return (
    <div className="flex flex-col h-screen w-1/2 border-1 border-slate-700">
      {/* This div below is the top bar section, with all buttons */}
      <div className="flex w-full h-12 bg-neutral-100 dark:bg-neutral-900 rounded-t items-center justify-between">
        <div className="flex ml-4 gap-2">
          <button
            onClick={() => setSelectedMode('Suggestions')}
            disabled={selectedMode === 'Suggestions'}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'Suggestions'
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            Suggestions
          </button>
          <button
            onClick={() => setSelectedMode('LaTeX')}
            disabled={selectedMode === 'LaTeX' || generatedLatex === ''}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'LaTeX' || generatedLatex === ''
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            LaTeX
          </button>
          <button
            onClick={() => setSelectedMode('PDF')}
            disabled={selectedMode === 'PDF' || !file}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'PDF' || !file
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            PDF
          </button>
        </div>
        <div className="flex ml-auto mr-4">
          <button
            onClick={handleDownloadClick}
            disabled={!file}
            className={`w-42 my-1 p-1 rounded ${
              file
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Download Resume
          </button>
        </div>
      </div>
      <div className="flex w-full flex-1 p-4 overflow-auto">
        <div className="flex items-center h-full w-full bg-neutral-100 dark:bg-neutral-900">
          {loadingAfter && <Spinner message="Improving Resume" />}
          {selectedMode === 'Suggestions' &&
            improvementsJson &&
            !loadingAfter &&
            !confirmJsonFormat && (
              <JSONViewer
                textJsonContent={improvementsJson}
                setTextJsonContent={setImprovementsJson}
                setConfirmJsonFormat={setConfirmJsonFormat}
              />
            )}
          {!loadingAfter && selectedMode === 'Suggestions' && confirmJsonFormat && (
            <ImprovementList improvementsJson={improvementsJson} />
          )}
          {!loadingAfter && selectedMode === 'LaTeX' && generatedLatex !== '' && <LatexViewer generatedLatex={generatedLatex} setFile={setFile} />}
          {!loadingAfter && selectedMode === 'PDF' && file && <PDFViewer file={file}/>}
        </div>
      </div>
    </div>
  );
};

export default After;
