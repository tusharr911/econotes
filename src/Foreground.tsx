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
      // Update existing note
      dispatch(updateNote({
        id: selectedData.id,
        title: data.title,
        tagline: data.tagline,
        body: data.body,
      }));
    } else {
      // Add new note
      dispatch(addNote({
        id: Date.now(), // Generate a unique ID
        title: data.title,
        tagline: data.tagline,
        body: data.body,
        date: new Date().toISOString(),
      }));
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Note
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {notes.map((note) => (
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
