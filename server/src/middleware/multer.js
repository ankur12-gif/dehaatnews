import multer from "multer";

const multerUpload = multer()

export const singleUpload = multerUpload.single("photo");

export const multiUpload = multerUpload.array("photos")