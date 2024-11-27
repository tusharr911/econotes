import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

const DialogBox = ({ open, onOpenChange, sampleData }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target);
                onOpenChange(false);
              }}
            >
              <div>
                <label
                  htmlFor="Title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="Title"
                  type="text"
                  defaultValue={sampleData.title}
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
                  defaultValue={sampleData.tagline}
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
                  defaultValue={sampleData.body}
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
