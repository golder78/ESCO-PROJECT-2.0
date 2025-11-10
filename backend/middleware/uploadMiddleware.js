import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // store files in /uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    );
  },
});

// Validate file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only images (jpg, jpeg, png, webp) are allowed!"));
};

export const upload = multer({ storage, fileFilter });
