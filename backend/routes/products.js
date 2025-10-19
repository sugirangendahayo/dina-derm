// backend/routes/productRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import * as productController from "../controllers/productController.js";

const router = express.Router();

// Configure multer storage with proper file extensions
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check if file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.get("/categories", productController.getCategories);
router.post("/categories", productController.createCategory);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post(
  "/",
  upload.fields([
    { name: "default_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
  ]),
  productController.createProduct
);
router.put(
  "/:id",
  upload.fields([
    { name: "default_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
  ]),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

router.post(
  "/variants",
  upload.array("images", 10),
  productController.createVariant
);
router.put(
  "/variants/:id",
  upload.array("images", 10),
  productController.updateVariant
);
router.delete("/variants/:id", productController.deleteVariant);

export default router;
