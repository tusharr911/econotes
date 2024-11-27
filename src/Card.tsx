import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { pinNote, updateNote } from "./store/NoteSlice";
import { db } from "./firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface SampleData {
  id: number;
  title: string;
  tagline: string;
  body: string;
  date: string;
  pinned: boolean;
  pinnedDate: string | null;
}

interface CardProps {
  sampleData: SampleData;
  onEdit?: (data: SampleData) => void;
  onDelete?: (id: number) => void;
}

export default function Card({ sampleData, onEdit, onDelete }: CardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(sampleData.id);
    }
  };

  const handlePin = async () => {
    const newPinnedStatus = !sampleData.pinned;
    const newPinnedDate = newPinnedStatus ? new Date().toISOString() : null;

    const noteRef = doc(db, "notes", sampleData.id.toString());
    await updateDoc(noteRef, {
      pinned: newPinnedStatus,
      pinnedDate: newPinnedDate,
    });

    dispatch(pinNote({
      id: sampleData.id,
      pinned: newPinnedStatus,
      pinnedDate: newPinnedDate,
    }));

    toast.success(newPinnedStatus ? "Note pinned successfully!" : "Note unpinned successfully!");
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
        <h3 className="text-sm font-semibold cursor-pointer" onClick={handlePin}>
          {sampleData.pinned ? "📌 Unpin" : "📌 Pin"}
        </h3>
      </div>
      <div className="footer absolute w-full bottom-0 left-0 px-2 py-3"></div>
    </div>
  );
}
