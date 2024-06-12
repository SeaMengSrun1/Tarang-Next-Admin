"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateSport } from "@/services/sport";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function SportTypeEditDialog({ sport }) {
  const [updateData, setUpdateData] = useState({
    name: sport ? sport.name : "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setUpdateData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (updateData.name === sport.name) {
      setOpenAlertDialog(true);
      setAlertMessage("No Change was made");
      wait().then(() => setOpenAlertDialog(false));
      return;
    }
    setLoading(true);
    const res = await updateSport(sport, updateData);
    if (res.status === 204) {
      setOpenAlertDialog(true);
      setAlertMessage("Sport Update Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Sport Update Failed");
      wait().then(() => setOpenAlertDialog(false));
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button className="bg-[#2ad5a5] text-white" variant="outline">
                Ok
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <form onSubmit={onSubmit}>
            {loading ? (
              <div className="flex justify-center p-10">
                <Spinner />
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Venue</DialogTitle>
                  <DialogDescription>
                    Make changes to your venue here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      onChange={onChange}
                      defaultValue={updateData.name}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SportTypeEditDialog;
