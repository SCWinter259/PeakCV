import { ClipLoader } from "react-spinners";

interface ISpinner {
  message?: string;
}

const Spinner = ({ message }: ISpinner) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <ClipLoader
        color="#38bdf8"
        size={28}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="mt-2 text-sm text-sky-400">{message}</p>
    </div>
  );
};

export default Spinner;
