# Project Requirements

1. Improve resume:
  - User upload PDF
  - (Later) Save PDF onto S3
  - Parse resume to bullet points (we can, because we know the resume Latex format), pass to AI Agent
  - Latex output
  - Turn Latex output to PDF -> frontend
  - (UI): 2 halfs of screen: Before and After
    - Before: A PDF with changed lines highlighted and has tooltips on highlights
      - How to know what lines to be highlighted? From AI output, we know what texts are changed. The Latex format is SET, does not change, so we should know what to highlight.
    - After: Will have toggle like on Github. User can view as PDF, Latex, copy latex code, and download PDF
2. Generate resume:
  - Inputs: name, email, job description, work exp description 
  - parse information 
  - Generate bullet points

How generated resume should be:
- First make it restricted to one Latex format for developers
- Improve, adapt later if possible
