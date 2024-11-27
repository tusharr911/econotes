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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Note } from "./types";
import { Button } from "@/components/ui/button";

export default function Foreground() {
  const notes = useSelector(NoteSliceSelector) as Note[];
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      dispatch(initializeNotes(notesData));
    };

    fetchNotes();
  }, [dispatch]);

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const handleEdit = (data: Note) => {
    setSelectedData(data);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedData(null);
    setIsDialogOpen(true);
  };

  const handleSave = async (
    data: Omit<Note, "id" | "date" | "pinned" | "pinnedDate">
  ) => {
    try {
      if (selectedData) {
        const noteRef = doc(db, "notes", selectedData.id);
        await updateDoc(noteRef, data);
        dispatch(
          updateNote({
            id: selectedData.id,
            ...data,
          })
        );
        toast.success("Note updated successfully!");
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
        toast.success("Note added successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while saving the note.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      dispatch(deleteNote(id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the note.");
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && b.pinned) {
      return (
        new Date(b.pinnedDate!).getTime() - new Date(a.pinnedDate!).getTime()
      );
    }
    if (a.pinned) return -1;
    if (b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const paginatedNotes = sortedNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-auto">
        <div className="flex justify-center my-4 w-full ">
          <Button
            onClick={handleAdd}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add Note
          </Button>
        </div>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
