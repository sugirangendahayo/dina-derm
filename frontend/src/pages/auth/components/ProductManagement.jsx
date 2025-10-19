/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
// tbody

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVariantsModal, setShowVariantsModal] = useState(false);
  const [showCreateVariantModal, setShowCreateVariantModal] = useState(false);
  const [showEditVariantModal, setShowEditVariantModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [currentProductVariants, setCurrentProductVariants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    base_price: "",
  });
  const [defaultFile, setDefaultFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [keptAdditional, setKeptAdditional] = useState([]);
  const [existingDefault, setExistingDefault] = useState("");
  const [variantFormData, setVariantFormData] = useState({
    variant_name: "",
    price: "",
    stock: "",
    attributes: { size: "", scent: "" },
  });
  const [variantFiles, setVariantFiles] = useState([]);
  const [keptVariantImages, setKeptVariantImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/products/categories"),
      ]);
      console.log(productsRes.data);
      // console.log(categoriesRes.data);
      
      setProducts(productsRes.data.products);
      setVariants(productsRes.data.variants);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category_id === parseInt(selectedCategory));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVariantInputChange = (e) => {
    setVariantFormData({ ...variantFormData, [e.target.name]: e.target.value });
  };

  const handleAttributeChange = (e) => {
    const attributes = {
      ...variantFormData.attributes,
      [e.target.name]: e.target.value,
    };
    setVariantFormData({ ...variantFormData, attributes });
  };

  const onDropDefault = (acceptedFiles) => {
    setDefaultFile(acceptedFiles[0]);
  };

  const onDropAdditional = (acceptedFiles) => {
    setAdditionalFiles([...additionalFiles, ...acceptedFiles]);
  };

  const onDropVariant = (acceptedFiles) => {
    setVariantFiles([...variantFiles, ...acceptedFiles]);
  };

  const removeAdditional = (index) => {
    const newFiles = additionalFiles.filter((_, i) => i !== index);
    setAdditionalFiles(newFiles);
  };

  const removeDefault = () => {
    setDefaultFile(null);
  };

  const removeKeptAdditional = (img) => {
    setKeptAdditional(keptAdditional.filter((i) => i !== img));
  };

  const removeVariantImage = (index) => {
    const newFiles = variantFiles.filter((_, i) => i !== index);
    setVariantFiles(newFiles);
  };

  const removeKeptVariantImage = (img) => {
    setKeptVariantImages(keptVariantImages.filter((i) => i !== img));
  };

  const handleCreateProduct = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category_id", formData.category_id);
    data.append("base_price", formData.base_price);
    if (defaultFile) data.append("default_image", defaultFile);
    additionalFiles.forEach((file) => data.append("additional_images", file));

    try {
      await axios.post("/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created");
      setShowCreateModal(false);
      resetProductForm();
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  };

  const handleUpdateProduct = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category_id", formData.category_id);
    data.append("base_price", formData.base_price);
    if (defaultFile) {
      data.append("default_image", defaultFile);
    } else {
      data.append("existing_default", existingDefault);
    }
    additionalFiles.forEach((file) => data.append("additional_images", file));
    data.append("kept_additional", JSON.stringify(keptAdditional));

    try {
      await axios.put(`/api/products/${currentProduct.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated");
      setShowEditModal(false);
      resetProductForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const resetProductForm = () => {
    setFormData({ name: "", category_id: "", base_price: "" });
    setDefaultFile(null);
    setAdditionalFiles([]);
    setKeptAdditional([]);
    setExistingDefault("");
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      base_price: product.base_price,
    });
    setExistingDefault(product.default_image);
    setKeptAdditional(product.additional_images || []);
    setDefaultFile(null);
    setAdditionalFiles([]);
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success("Product deleted");
        fetchData();
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  const openVariantsModal = (product) => {
    setCurrentProduct(product);
    setCurrentProductVariants(
      variants.filter((v) => v.product_id === product.id)
    );
    setShowVariantsModal(true);
  };

  const handleCreateVariant = async () => {
    const data = new FormData();
    data.append("product_id", currentProduct.id);
    data.append("variant_name", variantFormData.variant_name);
    data.append("price", variantFormData.price);
    data.append("stock", variantFormData.stock);
    data.append("attributes", JSON.stringify(variantFormData.attributes));
    variantFiles.forEach((file) => data.append("images", file));

    try {
      await axios.post("/api/variants", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Variant created");
      setShowCreateVariantModal(false);
      resetVariantForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to create variant");
    }
  };

  const handleUpdateVariant = async () => {
    const data = new FormData();
    data.append("variant_name", variantFormData.variant_name);
    data.append("price", variantFormData.price);
    data.append("stock", variantFormData.stock);
    data.append("attributes", JSON.stringify(variantFormData.attributes));
    data.append("kept_images", JSON.stringify(keptVariantImages));
    variantFiles.forEach((file) => data.append("images", file));

    try {
      await axios.put(`/api/variants/${currentVariant._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Variant updated");
      setShowEditVariantModal(false);
      resetVariantForm();
      fetchData();
    } catch (err) {
      toast.error("Failed to update variant");
    }
  };

  const resetVariantForm = () => {
    setVariantFormData({
      variant_name: "",
      price: "",
      stock: "",
      attributes: { size: "", scent: "" },
    });
    setVariantFiles([]);
    setKeptVariantImages([]);
  };

  const handleEditVariant = (variant) => {
    setCurrentVariant(variant);
    setVariantFormData({
      variant_name: variant.variant_name,
      price: variant.price,
      stock: variant.stock,
      attributes: variant.attributes,
    });
    setKeptVariantImages(variant.images || []);
    setVariantFiles([]);
    setShowEditVariantModal(true);
  };

  const handleDeleteVariant = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/variants/${id}`);
        toast.success("Variant deleted");
        fetchData();
      } catch (err) {
        toast.error("Failed to delete variant");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <button
        className="p-2 text-white rounded cursor-pointer bg-red-500 "
        onClick={() => {
          resetProductForm();
          setShowCreateModal(true);
        }}
      >
        Add Product
      </button>
      <select
        className="select select-bordered mb-4 backdrop-blur-md m-2 bg-white/10 border border-white/20 shadow-lg rounded-lg py-2 z-40 overflow-y-auto transition-all duration-300 ease-in-out"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-white">
              <th>ID</th>
              <th>Name</th>
              <th>Category ID</th>
              <th>Base Price</th>
              <th>Default Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category_id}</td>
                <td>${product.base_price}</td>
                <td>
                  {product.default_image && (
                    <img
                      src={`http://localhost:5000${product.default_image}`}
                      alt="default"
                      className="w-10 h-10 object-cover"
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error mr-2"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => openVariantsModal(product)}
                  >
                    Manage Variants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog open={showCreateModal} className="modal">
        <div className="modal-box backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg">
          <h3 className="font-bold text-lg">Create Product</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full mb-2 text-black"
              value={formData.name}
              onChange={handleInputChange}
            />
            <select
              name="category_id"
              className="select select-bordered w-full mb-2 text-black"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="base_price"
              placeholder="Base Price"
              className="input input-bordered w-full mb-2 text-black"
              value={formData.base_price}
              onChange={handleInputChange}
            />
            <div className="mb-4">
              <p>Default Image (single)</p>
              <DefaultDropzone onDrop={onDropDefault} />
              {defaultFile && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Selected Default Image:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    <div className="relative flex-shrink-0">
                      <img
                        src={URL.createObjectURL(defaultFile)}
                        alt="default preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        onClick={() => removeDefault()}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p>Additional Images (multiple)</p>
              <AdditionalDropzone onDrop={onDropAdditional} />
              {additionalFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Selected Additional Images:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {additionalFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`additional ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeAdditional(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreateProduct}>
              Create
            </button>
            <button className="btn" onClick={() => setShowCreateModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog open={showEditModal} className="modal">
        <div className="modal-box backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg">
          <h3 className="font-bold text-lg">Edit Product</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full mb-2 text-black"
              value={formData.name}
              onChange={handleInputChange}
            />
            <select
              name="category_id"
              className="select select-bordered w-full mb-2 text-black"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="base_price"
              placeholder="Base Price"
              className="input input-bordered w-full mb-2 text-black"
              value={formData.base_price}
              onChange={handleInputChange}
            />
            <div className="mb-4">
              <p>Default Image</p>
              {existingDefault && !defaultFile && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Current Default Image:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    <img
                      src={existingDefault}
                      alt="current default"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                </div>
              )}
              {defaultFile && (
                <div className="mt-2">
                  <p className="text-sm mb-1">New Default Image:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    <img
                      src={URL.createObjectURL(defaultFile)}
                      alt="new default"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                </div>
              )}
              <DefaultDropzone onDrop={onDropDefault} />
            </div>
            <div>
              <p>Additional Images</p>
              {keptAdditional.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Current Additional Images:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {keptAdditional.map((img, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={img}
                          alt={`current ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeKeptAdditional(img)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <AdditionalDropzone onDrop={onDropAdditional} />
              {additionalFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm mb-1">New Additional Images:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {additionalFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`new ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeAdditional(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdateProduct}>
              Update
            </button>
            <button className="btn" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog open={showVariantsModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Manage Variants for {currentProduct?.name}
          </h3>
          <button
            className="btn btn-primary mb-4"
            onClick={() => {
              resetVariantForm();
              setShowCreateVariantModal(true);
            }}
          >
            Add Variant
          </button>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProductVariants.map((v) => (
                <tr key={v._id}>
                  <td>{v.variant_name}</td>
                  <td>${v.price}</td>
                  <td>{v.stock}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => handleEditVariant(v)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteVariant(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowVariantsModal(false)}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog open={showCreateVariantModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Variant</h3>
          <div className="py-4">
            <input
              type="text"
              name="variant_name"
              placeholder="Variant Name"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.variant_name}
              onChange={handleVariantInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.price}
              onChange={handleVariantInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.stock}
              onChange={handleVariantInputChange}
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.attributes.size}
              onChange={handleAttributeChange}
            />
            <input
              type="text"
              name="scent"
              placeholder="Scent"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.attributes.scent}
              onChange={handleAttributeChange}
            />
            <div>
              <p>Images</p>
              <VariantDropzone onDrop={onDropVariant} />
              {variantFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm mb-1">Selected Variant Images:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {variantFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`variant ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeVariantImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreateVariant}>
              Create
            </button>
            <button
              className="btn"
              onClick={() => setShowCreateVariantModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog open={showEditVariantModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Variant</h3>
          <div className="py-4">
            <input
              type="text"
              name="variant_name"
              placeholder="Variant Name"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.variant_name}
              onChange={handleVariantInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.price}
              onChange={handleVariantInputChange}
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.stock}
              onChange={handleVariantInputChange}
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.attributes.size}
              onChange={handleAttributeChange}
            />
            <input
              type="text"
              name="scent"
              placeholder="Scent"
              className="input input-bordered w-full mb-2 text-black"
              value={variantFormData.attributes.scent}
              onChange={handleAttributeChange}
            />
            <div>
              {keptVariantImages.length > 0 && (
                <div className="mb-4">
                  <p>Existing Images</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {keptVariantImages.map((img, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={img}
                          alt={`existing ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeKeptVariantImage(img)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p>Add New Images</p>
              <VariantDropzone onDrop={onDropVariant} />
              {variantFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm mb-1">New Variant Images:</p>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {variantFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`new ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeVariantImage(index)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdateVariant}>
              Update
            </button>
            <button
              className="btn"
              onClick={() => setShowEditVariantModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const DefaultDropzone = ({ onDrop, multiple = false, accept = "image/*" }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select default image</p>
    </div>
  );
};

const AdditionalDropzone = ({
  onDrop,
  multiple = true,
  accept = "image/*",
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select additional images</p>
    </div>
  );
};

const VariantDropzone = ({ onDrop, multiple = true, accept = "image/*" }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop or click to select variant images</p>
    </div>
  );
};

export default ProductManagement;
