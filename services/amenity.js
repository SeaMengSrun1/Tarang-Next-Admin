import axios from "@/lib/axios";

export const createAmenity = async (amenity) => {
  try {
    const res = await axios.post("/api/amenities", amenity, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const editAmenity = async (amenity, updateAmenity) => {
  try {
    const res = await axios.put(`/api/amenities/${amenity.id}`, updateAmenity, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const deleteAmenity = async (amenity) => {
  try {
    const res = await axios.delete(`/api/amenities/${amenity.id}`, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const getAmenities = async () => {
  try {
    const res = await axios.get("/api/amenities", {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
    return e.response.data;
  }
};
