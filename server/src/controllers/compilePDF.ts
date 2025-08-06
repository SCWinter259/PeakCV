import { Request, Response } from 'express';
import fs from 'fs'; // file system
import { spawn } from 'child_process';
import path from 'path';
import os from 'os';

// turn a latex string into a pdf
export const compilePDF = async (req: Request, res: Response): Promise<any> => {
  const latexString = req.body.latex;

  if (!latexString) {
    return res.status(400).send('Missing LaTeX content');
  }

  console.log(latexString);

  // create a temp directory
  // we add the dash at the end of latex because mkdtempSync will add random characters at the end of the path to make it unique
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'latex-'));
  const texFilePath = path.join(tempDir, 'document.tex');
  const pdfFilePath = path.join(tempDir, 'document.pdf');

  console.log('create paths');

  // write the Latex string onto the tex file
  fs.writeFileSync(texFilePath, latexString);

  console.log('wrote into file');

  // run the command
  const pdflatex = spawn('pdflatex', [
    '-interaction=nonstopmode',
    `-output-directory=${tempDir}`,
    texFilePath,
  ]);

  pdflatex.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pdflatex.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pdflatex.on('close', (code) => {
    if (code === 0) {
      const pdfData = fs.readFileSync(pdfFilePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
      res.send(pdfData);
    } else {
      console.error(`pdflatex exited with code ${code}`);
      res.status(500).send('PDF generation failed.');
    }
  });
};
