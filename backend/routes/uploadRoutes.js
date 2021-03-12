import express from "express";
import multer from "multer";
import path from "path";
import { createBrotliCompress } from "zlib";
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}--${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/;
    // if file extension comply with regular expression (jpg or jpeg or png)
    const extName = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // check mime type:
    const mimeType = filetypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb("Image files only!");
    }
};

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;
