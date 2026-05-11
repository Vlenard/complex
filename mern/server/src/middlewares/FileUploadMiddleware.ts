import multer from "multer";
import path from "path";
import fs from "fs";

const storageDir = "storage/";
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

export const FileUploadMiddleware = multer({ storage: storage });
