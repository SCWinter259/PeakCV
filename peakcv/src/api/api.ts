// this file contains all api function calls to our own server

import axios from 'axios';

/**
 * Makes an api call to [host]/compile, sends the latex string and gets back the pdf version (in binary)
 * @param latexString the LaTeX code, stored as a string
 * @returns the binary data for a pdf file
 */
export const generatePDF = async (latexString: string): Promise<Blob> => {
  const response = await axios.post(
    `http://${process.env.NEXT_PUBLIC_SERVER_URL}/compile`,
    { latex: latexString }, // your JSON payload
    {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob', // expecting PDF binary data
    },
  );
  return response.data;
};
