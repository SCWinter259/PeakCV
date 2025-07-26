'use client';

import { SuggestionsResumeJson, SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';
import { useState, useEffect } from 'react';
import { makeSuggestionList } from '@/utils/makeSuggestionList';
import ImprovementCard from './ImprovementCard';

interface ImprovementListProps {
  improvementsJson: string;
}

const ImprovementList = ({ improvementsJson }: ImprovementListProps) => {
  const [suggestionList, setSuggestionList] = useState<SuggestionWithLocation[]>([]);

  useEffect(() => {
    const improvements: SuggestionsResumeJson = JSON.parse(improvementsJson);
    setSuggestionList(makeSuggestionList(improvements));
    console.log('Suggestion List:', suggestionList);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="my-1 flex flex-col items-center">
        <button
          onClick={() => {}}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Confirm Changes
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto border border-slate-700">
        {suggestionList.map((suggestion) => (
          <ImprovementCard key={suggestion.location} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
};

export default ImprovementList;
