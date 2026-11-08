'use client";'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { Destination } from "@/lib/destination";


const DeleteDestinationPage = ({id}: {id: Destination}) => {

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destination/${id}`, {
            method: "DELETE",
        });
        const deta = await res.json();
        redirect("/destinations");
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 rounded-md border-red-300 px-3 text-xs text-red-600 hover:bg-red-50">
            <Trash className="size-3.5" />
            Delete
          </Button>
        }></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationPage;
