import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase.config";

export const useUploadImage = ({
  imageAsset,
  setImageAsset,
  setUploadProgressInfo,
  setIsLoading,
}) => {
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `Images/${Date.now()}-${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressInfo(() => uploadProgress.toFixed());
      },

      (error) => {
        console.log(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsLoading(false);
          setImageAsset(downloadURL);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return {
    uploadImage,
    deleteImage,
  };
};
