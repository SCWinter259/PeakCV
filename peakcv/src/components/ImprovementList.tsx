'use client';

import { SuggestionsResumeJson, SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';
import { useState } from 'react';
import { makeSuggestionList } from '@/utils/makeSuggestionList';
import ImprovementCard from './ImprovementCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface ImprovementListProps {
  improvementsJson: string;
}

const ImprovementList = ({ improvementsJson }: ImprovementListProps) => {
  const [suggestionList, setSuggestionList] = useState<SuggestionWithLocation[]>(
    makeSuggestionList(JSON.parse(improvementsJson) as SuggestionsResumeJson),
  );

  // save changes to the redux store
  const confirmChanges = () => {};

  // delete an item from the suggestion list
  const handleDeleteItem = (location: string) => {
    setSuggestionList((prevList) =>
      prevList.filter((suggestion) => suggestion.location !== location),
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="my-1 flex flex-col items-center">
        <button
          onClick={confirmChanges}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Confirm Changes
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto border border-slate-700">
        {suggestionList.map((suggestion) => (
          <ImprovementCard
            key={suggestion.location}
            suggestion={suggestion}
            handleDeleteItem={() => handleDeleteItem(suggestion.location)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImprovementList;
