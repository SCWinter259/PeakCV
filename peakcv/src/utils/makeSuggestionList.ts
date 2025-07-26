import { SuggestionsResumeJson, SuggestionWithLocation } from '@/interfaces/SuggestionsResumeJson';

const isSuggestion = (value: any): value is SuggestionWithLocation => {
  return (
    value &&
    typeof value === 'object' &&
    'old' in value &&
    'new' in value &&
    'reason' in value
  );
};

export const makeSuggestionList = (improvements: SuggestionsResumeJson) => {
  let suggestionList: SuggestionWithLocation[] = [];

  for (const [section, content] of Object.entries(improvements)) {
    // these section are objects
    if (section === 'intro' || section === 'skills') {
      for (const [key, value] of Object.entries(content)) {
        if (isSuggestion(value)) {
          suggestionList.push({
            location: `${section}.${key}`,
            old: value.old,
            new: value.new,
            reason: value.reason,
          });
        } else if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            if (isSuggestion(value[i])) {
              suggestionList.push({
                location: `${section}.${key}[${i}]`,
                old: value[i].old,
                new: value[i].new,
                reason: value[i].reason,
              });
            }
          }
        }
      }
    } else {
      // this section is for arrays (education, experience, projects)
      for (let i = 0; i < content.length; i++) {
        for (const [key, value] of Object.entries(content[i])) {
          if (isSuggestion(value)) {
            suggestionList.push({
              location: `${section}[${i}].${key}`,
              old: value.old,
              new: value.new,
              reason: value.reason,
            });
          } else if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j++) {
              if (isSuggestion(value[j])) {
                suggestionList.push({
                  location: `${section}[${i}].${key}[${j}]`,
                  old: value[j].old,
                  new: value[j].new,
                  reason: value[j].reason,
                });
              }
            }
          }
        }
      }
    }
  }

  return suggestionList;
};
