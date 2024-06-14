"use client";

import { format } from "date-fns";
import { MapPin, Clock, Users, CheckCircle, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import ReservationDeleteDialog from "./ReservationDeleteDialog";
import ReservationEditDialog from "./ReservationEditDialog";

function ReservationCard({ reservation }) {
  return (
    <Card className="bg-white rounded-xl">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {reservation.venue.name}
          </CardTitle>
          <div className="flex flex-col">
            <span className="text-center px-4 bg-red-500 rounded-t-xl text-white">
              {format(reservation.date, "MMMM")}
            </span>
            <span className="text-center px-4 bg-[#eaeaea] rounded-b-xl">
              {format(reservation.date, "dd")}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time: {reservation.start_time} - {reservation.end_time}
            </p>
            <p className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Player: {reservation.attendee}
            </p>
            {reservation.find_team === 1 && (
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Available for a match
              </p>
            )}
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {reservation.phone}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="ml-auto">
          <ReservationEditDialog reservation={reservation} />
          <ReservationDeleteDialog reservationId={reservation.id} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default ReservationCard;
