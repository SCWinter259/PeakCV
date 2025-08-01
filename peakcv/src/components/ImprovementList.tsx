'use client';

import { SuggestionsResumeJson, SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';
import { useState } from 'react';
import { makeSuggestionList } from '@/utils/makeSuggestionList';
import ImprovementCard from './ImprovementCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { FormattedResumeJSON } from '@/interfaces/FormattedResumeJSON';
import { setGeneratedLatex } from '@/lib/features/afterSlice';
import { jsonToLatexMapper } from '@/utils/jsonToLatexMapper';

interface ImprovementListProps {
  improvementsJson: string;
}

const ImprovementList = ({ improvementsJson }: ImprovementListProps) => {
  const [suggestionList, setSuggestionList] = useState<SuggestionWithLocation[]>(
    makeSuggestionList(JSON.parse(improvementsJson) as SuggestionsResumeJson),
  );
  const dispatch = useDispatch();
  const originalJsonString = useSelector((state: RootState) => state.before.resumeJson);

  // go through the suggestion list and apply changes to a new SuggestionsResumeJson object
  // use the object to generate a latex version of the resume
  // save the latex version into redux store
  const applyChanges = () => {
    // this is the object that we will modify and put into redux store
    let newObject = JSON.parse(originalJsonString) as FormattedResumeJSON;

    // apply changes to the newObject based on the suggestionList
    for (const suggestion of suggestionList) {
      // takes parts of the path, filter out empty strings
      const locationParts = suggestion.location
        .split(/[\.\[\]]/)
        .filter((part: string) => part !== '');

      let current: any = newObject;

      // first we loop through all parts, except the last one. As the last one is a string (primitive type),
      // following the path will lead to a copy of the string (non-primitive types will be passed by reference)
      for (let i = 0; i < locationParts.length - 1; i++) {
        const key = isNaN(Number(locationParts[i])) ? locationParts[i] : Number(locationParts[i]);
        current = current[key];
      }

      // now we can set the value of the last part
      const lastKey = isNaN(Number(locationParts[locationParts.length - 1]))
        ? locationParts[locationParts.length - 1]
        : Number(locationParts[locationParts.length - 1]);
      current[lastKey] = suggestion.new;
    }

    // now that we have a modified resume object, translate to latex and save it to redux store
    console.log(jsonToLatexMapper(newObject));
    dispatch(setGeneratedLatex(jsonToLatexMapper(newObject)));
    alert("LaTeX code is generated!");
  };

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
          onClick={applyChanges}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Apply Changes
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
