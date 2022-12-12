// external imports
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  connectStorageEmulator,
  getDownloadURL,
} from "firebase/storage";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const app = initializeApp({
      storageBucket: "demo-lavamap.appspot.com",
    });

    const storage = getStorage(app);
    connectStorageEmulator(storage, "localhost", 9199);
    const storageRef = ref(storage, `${new Date().toISOString()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    
    return imageUrl;
  } catch (error) {
    console.error("..... Error Uploading Image .....", error);

    return "";
  }
};
