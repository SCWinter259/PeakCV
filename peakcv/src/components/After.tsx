'use client';

import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import JSONViewer from './JSONViewer';
import { setImprovementsJson } from '@/lib/features/afterSlice';

interface IAfter {
  loadingAfter: boolean;
}

const After = ({ loadingAfter }: IAfter) => {
  const improvementsJson = useSelector((state: RootState) => state.after.improvementsJson);
  return (
    <div className="flex flex-col h-screen w-1/2 border-1 border-slate-700">
      {/* This div below is the top bar section, with all buttons */}
      <div className="flex w-full h-12 bg-neutral-900 rounded-t items-center justify-between"></div>
      <div className="flex w-full flex-1 p-4 overflow-auto">
        <div className="flex items-center h-full w-full bg-neutral-900">
          {loadingAfter && <Spinner message="Improving Resume" />}
          {improvementsJson && !loadingAfter && (
            <JSONViewer
              textJsonContent={improvementsJson}
              setTextJsonContent={setImprovementsJson}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default After;
