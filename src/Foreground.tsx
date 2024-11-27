import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

import DialogBox from "./components/custom/DailogBox";
import { NoteSliceSelector } from "./store/NoteSlice";

export default function Foreground() {
  const notes = useSelector(NoteSliceSelector);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsDialogOpen(true);
  };

  return (
    <div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {notes.map((note) => (
          <Card key={note.id} sampleData={note} onEdit={handleEdit} />
        ))}
      </div>
      {selectedData && (
        <DialogBox
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          sampleData={selectedData}
        />
      )}
    </div>
  );
}
