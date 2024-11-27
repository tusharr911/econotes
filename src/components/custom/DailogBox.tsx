import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DialogBox = ({ open, onOpenChange, sampleData, onSave }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: sampleData ? sampleData.title : "",
      tagline: sampleData ? sampleData.tagline : "",
      body: sampleData ? sampleData.body : "",
    },
  });

  const onSubmit = (data) => {
    onSave(data);
    onOpenChange(false);
    reset();
    toast.success(
      sampleData ? "Note updated successfully!" : "Note added successfully!"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{sampleData ? "Edit Note" : "Add Note"}</DialogTitle>
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
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-sm text-muted-foreground"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </span>
                )}
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
                <Button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="bg-gray-400 hover:bg-gray-500"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogBox;
