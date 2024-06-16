import axios from "@/lib/axios";
import { formatISO } from "date-fns";

export const getReservationReport = async () => {
  try {
    const response = await axios.get("/api/reservation/report", {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getVenueReport = async () => {
  try {
    const response = await axios.get("/api/venues/report", {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getPendingReservation = async () => {
  try {
    const response = await axios.get("/api/reservation/pending", {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

function formatDateToCustomFormat(dateString) {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export const getReservationReportByPeirod = async (period) => {
  try {
    const response = await axios.post(
      "/api/reservation/custom-report",
      {
        start_date: formatDateToCustomFormat(formatISO(period.from)),
        end_time: formatDateToCustomFormat(formatISO(period.to)),
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};
