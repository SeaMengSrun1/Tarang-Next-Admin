import axios from "@/lib/axios";
import {
  deleteVenueImg,
  updateVenueImg,
  uploadVenueImg,
} from "@/lib/firebase/storage";

export const createVenue = async (venue) => {
  try {
    const venueId = await axios.post(
      "/api/venues",
      { ...venue, photo: "" },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const imgUrl = await uploadVenueImg(venueId.data.id, venue.photo);
    const res = await axios.put(
      `/api/venues/${venueId.data.id}`,
      {
        ...venue,
        photo: imgUrl,
      },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllVenues = async () => {
  try {
    const res = await axios.get("/api/venues?all", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVenuesWithPagination = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
    return null;
  }
};

export const getVenuesByType = async (sportType) => {
  try {
    const res = await axios.get(`/api/venues?type=${sportType}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVenuesByAmenity = async (amenity) => {
  try {
    const res = await axios.get(`/api/venues?amenity=${amenity}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVenuesByTypeAndAmenity = async (type, amenity) => {
  try {
    type = parseInt(type);
    amenity = parseInt(amenity);
    const res = await axios.get(`/api/venues?type=${type}&amenity=${amenity}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const showSingleVenue = async (venueId) => {
  try {
    const res = await axios.get(`/api/venues/${venueId}`, {
      headers: {
        Accept: "application/json",
        // Referer",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVenue = async (venue) => {
  try {
    await deleteVenueImg(venue.id);
    const response = await axios.delete(`/api/venues/${venue.id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const updateVenue = async (venue, updateVenue) => {
  try {
    let newImgUrl = "";
    if (venue.photo !== updateVenue.photo) {
      newImgUrl = await updateVenueImg(venue.id, updateVenue.photo);
    }
    updateVenue.photo = newImgUrl ? newImgUrl : venue.photo;
    updateVenue.amenity_id = updateVenue.amenity_id.map((str) => parseInt(str));
    const response = await axios.put(`/api/venues/${venue.id}`, updateVenue, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
