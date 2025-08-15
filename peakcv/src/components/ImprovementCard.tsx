'use client';

import { SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

interface ImprovementCardProps {
  suggestion: SuggestionWithLocation;
  handleDeleteItem: () => void;
}

const ImprovementCard = ({ suggestion, handleDeleteItem }: ImprovementCardProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
const handleClick = () => {
    setIsDeleting(true);
    setTimeout(handleDeleteItem, 300); // after 300ms, delete the item
  };

  return (
    <div
      className={`w-full bg-gray-800 text-white rounded p-4 shadow transition-all duration-300 ease-in-out transform ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-sm text-gray-300">{suggestion.location}</p>
          <p className="text-red-400 font-semibold">{suggestion.old}</p>
          <p className="text-green-400 font-semibold">{suggestion.new || 'Delete Sentence'}</p>
          {suggestion.reason && <p className="text-gray-400 text-xs">{suggestion.reason}</p>}
        </div>
        <button onClick={handleClick} className="text-red-400 hover:text-red-600">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImprovementCard;
