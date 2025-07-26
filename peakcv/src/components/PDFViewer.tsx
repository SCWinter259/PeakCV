'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface IPDFViewer {
  file: File;
}

const PDFViewer = ({ file }: IPDFViewer) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);

  // finds the number of pages in the PDF document
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex flex-col items-center">
        <div className="flex gap-4 mb-2">
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <p className="text-sm mb-2 m-auto">
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded"
          >
            -
          </button>
          <span className="text-sm m-auto">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((s) => s + 0.1)}
            className="bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-full h-full flex justify-center overflow-auto border border-slate-700">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
