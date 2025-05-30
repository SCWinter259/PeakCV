import { ClipLoader } from "react-spinners";

interface ISpinner {
  loading?: boolean;
  message?: string;
}

const Spinner = ({ loading, message }: ISpinner) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <ClipLoader
        color="#38bdf8"
        loading={loading}
        size={28}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {loading && <p className="mt-2 text-sm text-lightBlue">{message}</p>}
    </div>
  );
};

export default Spinner;
