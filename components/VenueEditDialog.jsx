"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAmenities } from "@/services/amenity";
import { getSportTypes } from "@/services/sport";
import { updateVenue } from "@/services/venue";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

function VenueEditDialog({ venue }) {
  const { data: amenities, isLoading: amenitiesLoading } = useQuery({
    queryKey: ["allAmenities"],
    queryFn: getAmenities,
  });
  const { data: sportTypes, isLoading: sportTypesLoading } = useQuery({
    queryKey: ["allSportTypes"],
    queryFn: getSportTypes,
  });
  const venueAmenitiesIds = venue.amenities.map((amenity) =>
    amenity.id.toString()
  );
  const [updateData, setUpdateData] = useState({
    name: venue ? venue.name : "",
    size: venue ? venue.size : 0,
    sport_type_id: venue ? venue.sportTypes.id : 0,
    description: venue ? venue.description : "",
    amenity_id: venue ? venueAmenitiesIds : [],
    photo: venue ? venue.photo : "",
  });
  console.log(updateData);
  const onChange = (e) => {
    e.preventDefault();
    if (e.target.id === "photo") {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files[0],
      }));
    } else {
      setUpdateData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = [...updateData.amenity_id];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    setUpdateData((prev) => ({
      ...prev,
      amenity_id: updatedAmenities,
    }));
  };
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      updateData.name === venue.name &&
      updateData.size === venue.size &&
      updateData.sport_type_id === venue.sportTypes.id &&
      updateData.description === venue.description &&
      JSON.stringify(updateData.amenity_id) ===
        JSON.stringify(venueAmenitiesIds)
    ) {
      setOpenAlertDialog(true);
      setAlertMessage("No Change Made");
      wait().then(() => setOpenAlertDialog(false));
    } else {
      const res = await updateVenue(venue, updateData);
      if (res.status === 204) {
        setOpenAlertDialog(true);
        setAlertMessage("Venue Edit Successfully");
        wait().then(() => setOpenAlertDialog(false));
      } else {
        setOpenAlertDialog(true);
        setAlertMessage("Venue Edit Failed");
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
            {loading || sportTypesLoading || amenitiesLoading ? (
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
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="sport_type">Sport Type</Label>
                    <Select
                      defaultValue={updateData.sport_type_id.toString()}
                      onValueChange={(value) => {
                        setUpdateData((prevState) => ({
                          ...prevState,
                          sport_type_id: value,
                        }));
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Sport Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="bg-white">
                          <SelectLabel>SportType</SelectLabel>
                          {sportTypes?.sport_types.map((sport) => (
                            <SelectItem
                              key={sport.id}
                              value={sport.id.toString()}
                            >
                              {sport.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="size">Size</Label>
                    <Input
                      id="size"
                      type="number"
                      defaultValue={updateData.size}
                      onChange={onChange}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="size">Description</Label>
                    <Textarea
                      placeholder="Type your message here."
                      id="description"
                      onChange={onChange}
                      defaultValue={updateData.description}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="amenities">Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_parking"
                          name="amenities"
                          value={1}
                          className="mr-2"
                          checked={updateData.amenity_id.includes("1")}
                          onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_wifi">Parking</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_drinking_water"
                          name="amenities"
                          value={2}
                          className="mr-2"
                          checked={updateData.amenity_id.includes("2")}
                          onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_kitchen">Drinking Water</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_first_aid"
                          name="amenities"
                          value={3}
                          className="mr-2"
                          checked={updateData.amenity_id.includes("3")}
                          onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_washer_dryer">First Aid</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="amenity_rest_room"
                          name="amenities"
                          value={4}
                          className="mr-2"
                          checked={updateData.amenity_id.includes("4")}
                          onChange={handleAmenitiesChange}
                        />
                        <label htmlFor="amenity_free_parking">
                          Free Parking
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="size">Image</Label>
                    <Input type="file" id="photo" onChange={onChange} />
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

export default VenueEditDialog;
