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

interface IAfter {
  loadingAfter: boolean;
}

const After = ({ loadingAfter }: IAfter) => {
  const improvementsJson = useSelector((state: RootState) => state.after.improvementsJson);
  const generatedLatex = useSelector((state: RootState) => state.after.generatedLatex);

  const dispatch = useDispatch();

  const [confirmJsonFormat, setConfirmJsonFormat] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'Suggestions' | 'LaTeX' | 'PDF'>('Suggestions');
  const [confirmChanges, setConfirmChanges] = useState<boolean>(false);

  // I want to ensure that if the user click Improve Resume again, all states have to be reset
  // with this, if improvementsJson changes, the JSON Viewer will still be there (because confirmChanges will be reset)
  useEffect(() => {
    setConfirmJsonFormat(false);
    setSelectedMode('Suggestions');
    setConfirmChanges(false);
    dispatch(setGeneratedLatex(''));
  }, [improvementsJson]);

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
          {selectedMode === 'Suggestions' && confirmJsonFormat && !loadingAfter && (
            <ImprovementList improvementsJson={improvementsJson} />
          )}
          {selectedMode === 'LaTeX' && <LatexViewer generatedLatex={generatedLatex} />}
        </div>
      </div>
    </div>
  );
};

export default After;
