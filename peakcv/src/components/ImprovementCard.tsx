'use client';

import { SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';

interface ImprovementCardProps {
  suggestion: SuggestionWithLocation;
}

const ImprovementCard = ({ suggestion }: ImprovementCardProps) => {
  return (
    <div
      key={suggestion.location}
      className="w-full bg-gray-800 text-white rounded p-4 shadow hover:bg-gray-700 transition"
    >
      <p className="text-sm text-gray-300">{suggestion.location}</p>
      <p className="text-red-400 font-semibold">{suggestion.old}</p>
      <p className="text-green-400 font-semibold">{suggestion.new}</p>
      <p className="text-gray-400 text-xs">{suggestion.reason}</p>
    </div>
  );
};

export default ImprovementCard;
