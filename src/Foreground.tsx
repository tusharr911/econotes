import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { NoteSliceSelector, addNote, updateNote } from "./store/NoteSlice";
import DialogBox from "./components/custom/DailogBox";

export default function Foreground() {
  const notes = useSelector(NoteSliceSelector);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedData(null);
    setIsDialogOpen(true);
  };

  const handleSave = (data) => {
    if (selectedData) {
      dispatch(
        updateNote({
          id: selectedData.id,
          title: data.title,
          tagline: data.tagline,
          body: data.body,
        })
      );
    } else {
      dispatch(
        addNote({
          id: Date.now(),
          title: data.title,
          tagline: data.tagline,
          body: data.body,
          date: new Date().toISOString(),
          pinned: false,
          pinnedDate: null,
        })
      );
    }
    setIsDialogOpen(false);
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && b.pinned) {
      return new Date(b.pinnedDate) - new Date(a.pinnedDate);
    }
    if (a.pinned) return -1;
    if (b.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Note
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sortedNotes.map((note) => (
          <Card key={note.id} sampleData={note} onEdit={handleEdit} />
        ))}
      </div>
      {isDialogOpen && (
        <DialogBox
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          sampleData={selectedData}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
