import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "../ui/dialog";
  import { Button } from "../ui/button";
  
  interface ConfirmDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
  }
  
  const ConfirmDeleteDialog = ({ open, onOpenChange, onConfirm }: ConfirmDeleteDialogProps) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={onConfirm}>
                Delete
              </Button>
            </DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" className="absolute top-2 right-2">
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  };
  
  export default ConfirmDeleteDialog;