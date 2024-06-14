import axios from "@/lib/axios";

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

export const getReservationReportByPeirod = async (period) => {
  try {
    const response = await axios.post(
      "/api/reservation/custom-report",
      { start_date: period.from, end_time: period.to },
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
