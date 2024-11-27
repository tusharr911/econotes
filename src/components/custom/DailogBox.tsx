import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useForm } from "react-hook-form";

const DialogBox = ({ open, onOpenChange, sampleData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: sampleData.title,
      tagline: sampleData.tagline,
      body: sampleData.body,
    },
  });

  const onSubmit = (data) => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-sm text-muted-foreground"
                />
              </div>

              <div>
                <label
                  htmlFor="tagline"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Tagline
                </label>
                <input
                  id="tagline"
                  {...register("tagline")}
                  className="w-full p-2 text-sm text-muted-foreground border border-gray-300 rounded mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Body
                </label>
                <textarea
                  id="body"
                  {...register("body")}
                  className="w-full p-2 text-sm text-muted-foreground border border-gray-300 rounded mt-1"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogBox;
