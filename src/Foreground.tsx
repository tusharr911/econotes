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
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);

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

  const paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        {paginatedNotes.map((note) => (
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
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
