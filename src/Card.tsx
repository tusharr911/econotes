import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { pinNote } from "./store/NoteSlice";
import { db } from "./firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Note } from "./types/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardProps {
  sampleData: Note;
  onEdit?: (data: Note) => void;
  onDelete?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ sampleData, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (onDelete) {
        onDelete(sampleData.id);
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred while deleting the note: " + error.message);
      } else {
        toast.error("An error occurred while deleting the note.");
      }
      console.error("Delete Error:", error);
    }
  };

  const handlePin = async () => {
    try {
      const newPinnedStatus = !sampleData.pinned;
      const newPinnedDate = newPinnedStatus ? new Date().toISOString() : null;

      const noteRef = doc(db, "notes", sampleData.id);
      await updateDoc(noteRef, {
        pinned: newPinnedStatus,
        pinnedDate: newPinnedDate,
      });

      dispatch(
        pinNote({
          id: sampleData.id,
          pinned: newPinnedStatus,
          pinnedDate: newPinnedDate,
        })
      );

      toast.success(
        newPinnedStatus
          ? "Note pinned successfully!"
          : "Note unpinned successfully!"
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error occurred while pinning the note: " + error.message);
      } else {
        toast.error("An error occurred while pinning the note.");
      }
      console.error("Pin Error:", error);
    }
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
    <div className="flex flex-col w-full h-80 text-white py-4 px-4 overflow-hidden bg-zinc-900 bg-opacity-90 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="cursor-pointer text-lg"
                onClick={() => onEdit && onEdit(sampleData)}
              >
                ✏️
              </span>
            </TooltipTrigger>
            <TooltipContent>Edit Note</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer text-xl" onClick={handleDelete}>
                ❌
              </span>
            </TooltipTrigger>
            <TooltipContent>Delete Note</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <h2 className="text-lg font-bold mb-2">{sampleData.title}</h2>

      <p className="text-sm italic mb-4 text-gray-300">{sampleData.tagline}</p>

      <p className="text-sm flex-grow leading-tight text-white">{sampleData.body}</p>

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
};

export default Card;
