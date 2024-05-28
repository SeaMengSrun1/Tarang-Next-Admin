"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/services/venue";
import { createReservation } from "@/services/reservation";
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
import Spinner from "@/components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function ReservationCreateDialog({ isUser, venue, triggerContent, date }) {
  const { data: venues, isLoading: venuesLoading } = useQuery({
    queryKey: ["allVenues"],
    queryFn: getAllVenues,
  });
  const [inputData, setInputData] = useState({
    phone: "",
    attendee: 0,
    date: date
      ? new Date(
          new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000
        ).toISOString()
      : "",
    start_time: "07:00",
    end_time: "08:00",
    venue_id: venue ? venue.id : 0,
  });
  const [teamOptions, setTeamOptions] = useState({
    find_team: false,
    find_member: false,
  });
  // const [teamData, setTeamData] = useState({
  //   name: "",
  //   logo: "",
  //   sport_type_id: venue ? venue.sportTypes.id : 0,
  // });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // const handleCheck = (e) => {
  //   e.preventDefault();
  //   setTeamOptions({
  //     ...teamOptions,
  //     [e.target.value]: e.target.checked,
  //   });
  // };
  // const onChangeTeam = (e) => {
  //   e.preventDefault();
  //   if (e.target.id === "logo") {
  //     setTeamData((prevState) => ({
  //       ...prevState,
  //       [e.target.id]: e.target.files[0],
  //     }));
  //   } else {
  //     setTeamData((prevState) => ({
  //       ...prevState,
  //       [e.target.id]: e.target.value,
  //     }));
  //   }
  // };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (teamOptions.find_member || teamOptions.find_team) {
    //   const preRes = await createTeam(teamData);
    //   inputData.team_id = preRes.data.id;
    //   const reservation = { ...inputData, ...teamOptions };
    //   const res = await createReservation(reservation);
    //   if (res.status === 204) {
    //     setOpenAlertDialog(true);
    //     setAlertMessage("Reservation Create Successfully");
    //     wait().then(() => setOpenAlertDialog(false));
    //   } else {
    //     setOpenAlertDialog(true);
    //     setAlertMessage("Reservation Create Failed");
    //     wait().then(() => setOpenAlertDialog(false));
    //   }
    //   setOpen(false);
    //   setLoading(false);
    //   return;
    // }
    const res = await createReservation({ ...inputData, ...teamOptions });
    if (res.status === 204) {
      setOpenAlertDialog(true);
      setAlertMessage("Reservation Create Successfully");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      setOpenAlertDialog(true);
      setAlertMessage("Reservation Create Failed");
      wait().then(() => setOpenAlertDialog(false));
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
      {/*Create Reservation Dialog*/}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="bg-white">
          <form onSubmit={onSubmit}>
            {loading || venuesLoading ? (
              <div className="flex justify-center p-10">
                <Spinner />
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Create Reservation</DialogTitle>
                  <DialogDescription>
                    Create your reservation here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="name">Venue</Label>
                    <Select
                      defaultValue={inputData.venue_id.toString()}
                      disabled={isUser}
                      onValueChange={(id) => {
                        setInputData((prevState) => ({
                          ...prevState,
                          venue_id: id,
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <ScrollArea className="h-32">
                          <SelectGroup>
                            <SelectLabel>Venue</SelectLabel>
                            {venues.venues.map((venue) => (
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
                          date: date.toISOString(),
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
                  {/*<div className="flex flex-col gap-2">*/}
                  {/*  <Label htmlFor="name">Optional</Label>*/}
                  {/*  <div className="flex flex-col md:flex-row gap-4 text-sm">*/}
                  {/*    <div className="flex items-center gap-2">*/}
                  {/*      <input*/}
                  {/*        onChange={handleCheck}*/}
                  {/*        checked={teamOptions.find_team}*/}
                  {/*        type="checkbox"*/}
                  {/*        value="find_team"*/}
                  {/*        id="find_team"*/}
                  {/*        name="default-checkbox"*/}
                  {/*      />*/}
                  {/*      <label htmlFor="find_team">*/}
                  {/*        Find a team to play against*/}
                  {/*      </label>*/}
                  {/*    </div>*/}
                  {/*    <div className="flex gap-2">*/}
                  {/*      <input*/}
                  {/*        onChange={handleCheck}*/}
                  {/*        checked={teamOptions.find_member}*/}
                  {/*        type="checkbox"*/}
                  {/*        value="find_member"*/}
                  {/*        id="find_member"*/}
                  {/*        name="default-checkbox"*/}
                  {/*      />*/}
                  {/*      <label htmlFor="find_member">Find team member</label>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*{(teamOptions.find_member === true ||*/}
                  {/*  teamOptions.find_team === true) && (*/}
                  {/*  <>*/}
                  {/*    <div className="flex flex-col gap-2">*/}
                  {/*      <Label htmlFor="name">Team Name</Label>*/}
                  {/*      <Input*/}
                  {/*        type="data"*/}
                  {/*        id="name"*/}
                  {/*        className="rounded-lg"*/}
                  {/*        onChange={onChangeTeam}*/}
                  {/*      />*/}
                  {/*    </div>*/}
                  {/*    <div className="flex flex-col gap-4">*/}
                  {/*      <Label htmlFor="size">Image</Label>*/}
                  {/*      <Input type="file" id="logo" onChange={onChangeTeam} />*/}
                  {/*    </div>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
                  >
                    Confirm Reservation
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

export default ReservationCreateDialog;
