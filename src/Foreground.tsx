import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import {
  NoteSliceSelector,
  initializeNotes,
  addNote,
  updateNote,
  deleteNote,
} from "./store/NoteSlice";
import DialogBox from "./components/custom/DailogBox";
import { toast } from "sonner";
import { db } from "./firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

export default function Foreground() {
  const notes = useSelector(NoteSliceSelector);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(initializeNotes(notesData));
    };

    fetchNotes();
  }, [dispatch]);

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

  const handleSave = async (data) => {
    if (selectedData) {
      const noteRef = doc(db, "notes", selectedData.id);
      await updateDoc(noteRef, data);
      dispatch(
        updateNote({
          id: selectedData.id,
          ...data,
        })
      );
    } else {
      const docRef = await addDoc(collection(db, "notes"), {
        ...data,
        date: new Date().toISOString(),
        pinned: false,
        pinnedDate: null,
      });
      dispatch(
        addNote({
          id: docRef.id,
          ...data,
          date: new Date().toISOString(),
          pinned: false,
          pinnedDate: null,
        })
      );
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    dispatch(deleteNote(id));
    toast.success("Note deleted successfully!");
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
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto">
        <button
          onClick={handleAdd}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Note
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedNotes.map((note) => (
            <Card
              key={note.id}
              sampleData={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
      <div className="mt-4 flex justify-center bg-white py-4">
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
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
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
