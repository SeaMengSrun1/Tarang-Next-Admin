"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getReservationReport,
  getVenueReport,
  getPendingReservation,
} from "@/services/report";
import Spinner from "./Spinner";

function ReportReservationTable() {
  const { data: reservationReport, isLoading } = useQuery({
    queryKey: ["reportReservation"],
    queryFn: getReservationReport,
  });
  const { data: venueReport } = useQuery({
    queryKey: ["venueReservation"],
    queryFn: getVenueReport,
  });
  const { data: pendingReservationReport } = useQuery({
    queryKey: ["pendingReservation"],
    queryFn: getPendingReservation,
  });
  console.log(reservationReport);
  console.log(venueReport);
  console.log(pendingReservationReport);
  return <div>ReportReservationTable</div>;
}

export default ReportReservationTable;
