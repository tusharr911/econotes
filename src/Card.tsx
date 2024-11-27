import { useDispatch } from "react-redux";
import { deleteNote } from "./store/NoteSlice";

interface SampleData {
  id: number;
  title: string;
  tagline: string;
  body: string;
  date: string;
}

interface CardProps {
  sampleData: SampleData;
  onEdit?: (data: SampleData) => void;
}

export default function Card({ sampleData, onEdit }: CardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote({ id: sampleData.id }));
  };

  const formattedDate = new Date(sampleData.date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex-shrink-0 w-full h-80 rounded-none text-white py-4 px-2 overflow-hidden bg-zinc-900 bg-opacity-90 shadow-lg">
      <div className="flex justify-between items-center">
        <span
          className="cursor-pointer text-lg"
          onClick={() => onEdit && onEdit(sampleData)}
        >
          ✏️
        </span>
        <span className="cursor-pointer text-xl" onClick={handleDelete}>
          ❌
        </span>
      </div>

      <h2 className="text-lg font-bold mb-2">{sampleData.title}</h2>

      <p className="text-sm italic mb-4 text-gray-300">{sampleData.tagline}</p>

      <p className="text-sm leading-tight text-white">{sampleData.body}</p>

      <div className="flex justify-between items-center">
        <h5 className="text-xs text-gray-400">{formattedDate}</h5>
      </div>
      <div className="tag w-full py-5 flex justify-center items-center">
        <h3 className="text-sm font-semibold cursor-pointer">Pin</h3>
      </div>
      <div className="footer absolute w-full bottom-0 left-0 px-2 py-3"></div>
    </div>
  );
}
