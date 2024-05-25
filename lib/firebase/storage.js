import { storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

export const uploadTeamLogo = async (teamId, image) => {
  try {
    const filePath = `team-logo/${teamId}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytes(newImageRef, image);
    return await getDownloadURL(newImageRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTeamLogo = async (teamId, image) => {
  try {
    const filePath = `team-logo/${teamId}`;
    const imageRef = ref(storage, filePath);
    deleteObject(imageRef);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTeamLogo = async (teamId) => {
  const filePath = `team-logo/${teamId}`;
  const ImageRef = ref(storage, filePath);
  await deleteObject(ImageRef);
};

export const uploadUserAvatar = async (user, image) => {
  const filePath = `user-avatar/${user.id}`;
  const newImageRef = ref(storage, filePath);
  const fileUrl = await getDownloadURL(newImageRef).catch(() => null);
  if (fileUrl) {
    await deleteObject(newImageRef);
  }
  await uploadBytesResumable(newImageRef, image);
  return await getDownloadURL(newImageRef);
};

export const uploadVenueImg = async (venueId, image) => {
  try {
    const filePath = `venue-img/${venueId}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytes(newImageRef, image);
    return await getDownloadURL(newImageRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateVenueImg = async (venueId, image) => {
  try {
    const filePath = `venue-img/${venueId}`;
    const imageRef = ref(storage, filePath);
    deleteObject(imageRef);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVenueImg = async (venueId) => {
  const filePath = `venue-img/${venueId}`;
  const ImageRef = ref(storage, filePath);
  await deleteObject(ImageRef);
};
