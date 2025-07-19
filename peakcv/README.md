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

# Color pick

| Dark Mode          | Light Mode         | Use Case                       |
| ------------------ | ------------------ | ------------------------------ |
| `bg-black`         | `bg-white`         | Background                     |
| `bg-neutral-900`   | `bg-neutral-100`   | Surface                        |
| `bg-gray-800`      | `bg-gray-200`      | Card/Panel/button disabled     |
| `bg-gray-600`      | `bg-gray-300`      | Button clickable               |
| `bg-gray-700`      | `bg-gray-400`      | Button hover                   |
| `bg-green-500`     | `bg-green-500`     | Confirm button clickable       |
| `bg-green-600`     | `bg-green-600`     | Confirm button hover           |
| `border-slate-700` | `border-slate-300` | Border                         |
| `text-gray-100`    | `text-gray-900`    | Text Primary                   |
| `text-gray-400`    | `text-gray-500`    | Text Muted                     |
| `text-sky-400`     | `text-sky-400`     | Links, Call-to-Action, Spinner |
| `text-emerald-500` | `text-emerald-500` | Success states, tags           |
| `text-amber-500`   | `text-amber-500`   | Warnings, highlights           |
| `text-rose-500`    | `text-rose-500`    | Errors, delete buttons         |
| `text-violet-500`  | `text-violet-500`  | Highlights, special elements   |

# Getting started

```
npm run dev
```
