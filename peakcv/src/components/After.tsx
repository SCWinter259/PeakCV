'use client';

import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import JSONViewer from './JSONViewer';
import { setImprovementsJson } from '@/lib/features/afterSlice';
import { useState } from 'react';
import ImprovementList from './ImprovementList';

interface IAfter {
  loadingAfter: boolean;
}

const After = ({ loadingAfter }: IAfter) => {
  const improvementsJson = useSelector((state: RootState) => state.after.improvementsJson);
  const [confirmJsonFormat, setConfirmJsonFormat] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'Suggestions' | 'LaTeX'>('Suggestions');
  const [confirmChanges, setConfirmChanges] = useState<boolean>(false);

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
            disabled={selectedMode === 'LaTeX' || !confirmChanges}
            className={`w-24 my-1 p-1 rounded ${
              selectedMode === 'LaTeX' || !confirmChanges
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
        </div>
      </div>
    </div>
  );
};

export default After;
