"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/services/venue";
import { updateReservation } from "@/services/reservation";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "./DatePicker";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function ReservationEditDialog({ reservation }) {
  const { data: venues, isLoading: venuesLoading } = useQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  const [inputData, setInputData] = useState({
    phone: reservation ? reservation.phone : "",
    attendee: reservation ? reservation.attendee : 0,
    date: reservation
      ? new Date(
          new Date(reservation.date).getTime() -
            new Date(reservation.date).getTimezoneOffset() * 60000
        ).toISOString()
      : "",
    start_time: reservation
      ? reservation.start_time.replace(" AM", "").replace(" PM", "")
      : "",
    end_time: reservation
      ? reservation.end_time.replace(" AM", "").replace(" PM", "")
      : "",
    venue_id: reservation ? reservation.venue.id : 0,
    // team_id: 1,
  });
  console.log(inputData);
  const [teamOptions, setTeamOptions] = useState({
    find_team: false,
    find_member: false,
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleCheck = (e) => {
    e.preventDefault();
    setTeamOptions({
      ...teamOptions,
      [e.target.value]: e.target.checked,
    });
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      inputData.phone === reservation.phone &&
      inputData.attendee === reservation.attendee &&
      inputData.date === reservation.date &&
      inputData.start_time === reservation.start_time &&
      inputData.end_time === reservation.end_time &&
      inputData.venue_id === reservation.venue_id
    ) {
      setOpenAlertDialog(true);
      setAlertMessage("No Change Made");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      const res = await updateReservation(reservation, {
        ...inputData,
        ...teamOptions,
      });
      if (res.status === 204) {
        setLoading(false);
        setOpenAlertDialog(true);
        setAlertMessage("Reservation Edit Successfully");
        wait().then(() => setOpenAlertDialog(false));
      } else {
        setOpenAlertDialog(true);
        setAlertMessage("Reservation Edit Failed");
        wait().then(() => setOpenAlertDialog(false));
      }
    }
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      {/* Alert Dialog */}
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
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
            {loading || venuesLoading ? (
              <div className="flex justify-center p-10">
                <Spinner />
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Reservation</DialogTitle>
                  <DialogDescription>
                    Edit your reservation here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="name">Venue</Label>
                    <Select
                      defaultValue={inputData.venue_id.toString()}
                      onValueChange={(id) => {
                        setInputData((prevState) => ({
                          ...prevState,
                          venue_id: id,
                        }));
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <ScrollArea className="h-32">
                          <SelectGroup>
                            <SelectLabel>Venue</SelectLabel>
                            {data.venues.map((venue) => (
                              <SelectItem
                                key={venue.id}
                                value={venue.id.toString()}
                              >
                                {venue.name} - {venue.sportTypes.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Date</Label>
                    <DatePicker
                      onValue={inputData.date}
                      onDateChange={(date) => {
                        setInputData((prevState) => ({
                          ...prevState,
                          date: new Date(
                            new Date(date).getTime() -
                              new Date(date).getTimezoneOffset() * 60000
                          ).toISOString(),
                        }));
                      }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="name">Start Time</Label>
                      <Select
                        defaultValue={inputData.start_time
                          .replace(" AM", "")
                          .replace(" PM", "")}
                        onValueChange={(value) => {
                          setInputData((prevState) => ({
                            ...prevState,
                            start_time: value,
                          }));
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <ScrollArea className="h-32">
                            <SelectGroup>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 AM</SelectItem>
                              <SelectItem value="13:00">13:00 PM</SelectItem>
                              <SelectItem value="14:00">14:00 PM</SelectItem>
                              <SelectItem value="15:00">15:00 PM</SelectItem>
                              <SelectItem value="16:00">16:00 PM</SelectItem>
                              <SelectItem value="17:00">17:00 PM</SelectItem>
                              <SelectItem value="18:00">18:00 PM</SelectItem>
                              <SelectItem value="19:00">19:00 PM</SelectItem>
                              <SelectItem value="20:00">20:00 PM</SelectItem>
                              <SelectItem value="21:00">21:00 PM</SelectItem>
                              <SelectItem value="22:00">22:00 PM</SelectItem>
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label htmlFor="name">End Time</Label>
                      <Select
                        defaultValue={inputData.end_time
                          .replace(" AM", "")
                          .replace(" PM", "")}
                        onValueChange={(value) => {
                          setInputData((prevState) => ({
                            ...prevState,
                            end_time: value,
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <ScrollArea className="h-32">
                            <SelectGroup>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 AM</SelectItem>
                              <SelectItem value="13:00">13:00 PM</SelectItem>
                              <SelectItem value="14:00">14:00 PM</SelectItem>
                              <SelectItem value="15:00">15:00 PM</SelectItem>
                              <SelectItem value="16:00">16:00 PM</SelectItem>
                              <SelectItem value="17:00">17:00 PM</SelectItem>
                              <SelectItem value="18:00">18:00 PM</SelectItem>
                              <SelectItem value="19:00">19:00 PM</SelectItem>
                              <SelectItem value="20:00">20:00 PM</SelectItem>
                              <SelectItem value="21:00">21:00 PM</SelectItem>
                              <SelectItem value="22:00">22:00 PM</SelectItem>
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      type="text"
                      id="phone"
                      onChange={onChange}
                      className="rounded-lg"
                      defaultValue={inputData.phone}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="name">Number of Player</Label>
                    <Input
                      type="number"
                      id="attendee"
                      onChange={onChange}
                      className="rounded-lg"
                      defaultValue={inputData.attendee}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Optional</Label>
                    <div className="flex flex-col md:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <input
                          onChange={handleCheck}
                          checked={teamOptions.find_team}
                          type="checkbox"
                          value="find_team"
                          id="find_team"
                          name="default-checkbox"
                        />
                        <label htmlFor="find_team">
                          Find a team to play against
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          onChange={handleCheck}
                          checked={teamOptions.find_member}
                          type="checkbox"
                          value="find_member"
                          id="find_member"
                          name="default-checkbox"
                        />
                        <label htmlFor="find_member">Find team member</label>
                      </div>
                    </div>
                  </div>
                  {(teamOptions.find_member === true ||
                    teamOptions.find_team === true) && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Team Name</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Description</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
                  >
                    Save Changes
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

export default ReservationEditDialog;
