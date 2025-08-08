'use client';

import { generatePDF } from '@/api/api';
import { setGeneratedLatex } from '@/lib/features/afterSlice';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface ILatexViewer {
  generatedLatex: string;
  setFile: (file: File) => void;
}

const LatexViewer = ({ generatedLatex, setFile }: ILatexViewer) => {
  const [content, setContent] = useState<string>(generatedLatex);
  const dispatch = useDispatch();

  // send a create PDF request, set the content from the editor,
  // set the generated latex in the redux store
  // set the returned file and the list of errors to the After component (not needed yet)
  // the After component would then render "PDF" mode accordingly
  const handleCreatePDF = async (content: string) => {
    dispatch(setGeneratedLatex(content));

    try {
      const pdfBlob = await generatePDF(content);
      const file = new File([pdfBlob], "resume.pdf", { type: "application/pdf" });
      setFile(file);
      alert('PDF has been created!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="my-1 flex flex-col items-center">
        <button
          onClick={() => handleCreatePDF(content)}
          className="m-1 p-2 bg-green-500 rounded hover:bg-green-600 text-white"
        >
          Create PDF
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center overflow-auto border border-slate-700">
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          value={content}
          onChange={(value) => setContent(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default LatexViewer;
