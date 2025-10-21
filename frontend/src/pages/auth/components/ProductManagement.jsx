/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

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
      toast.success("Product created successfully!");
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
      toast.success("Product updated successfully!");
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
    setKeptAdditional(
      Array.isArray(product.additional_images) ? product.additional_images : []
    );
    setDefaultFile(null);
    setAdditionalFiles([]);
    setShowEditModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success("Product deleted successfully!");
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
      toast.success("Variant created successfully!");
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
      toast.success("Variant updated successfully!");
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
    setKeptVariantImages(Array.isArray(variant.images) ? variant.images : []);
    setVariantFiles([]);
    setShowEditVariantModal(true);
  };

  const handleDeleteVariant = async (id) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      try {
        await axios.delete(`/api/variants/${id}`);
        toast.success("Variant deleted successfully!");
        fetchData();
      } catch (err) {
        toast.error("Failed to delete variant");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 p-6 text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Product <span className="text-red-500">Management</span>
            </h1>
            <p className="text-gray-400">
              Manage your skincare products and variants
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="px-4 py-3 bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl text-red-500 focus:outline-none focus:border-red-500 transition-colors"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all" className="text-black">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              onClick={() => {
                resetProductForm();
                setShowCreateModal(true);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {product.category_id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-red-500 font-bold">
                        ${product.base_price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.default_image && (
                        <img
                          src={`http://localhost:5000${product.default_image}`}
                          alt="default"
                          className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors border border-blue-500/30 flex items-center gap-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30 flex items-center gap-2"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                        <button
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors border border-purple-500/30 flex items-center gap-2"
                          onClick={() => openVariantsModal(product)}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                          Variants
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">
                Create New Product
              </h3>
              <p className="text-gray-400 mt-1">
                Add a new product to your collection
              </p>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={formData.name}
                onChange={handleInputChange}
              />
              <select
                name="category_id"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={formData.base_price}
                onChange={handleInputChange}
              />

              <div>
                <label className="block text-white mb-2">Default Image</label>
                <DefaultDropzone onDrop={onDropDefault} />
                {defaultFile && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(defaultFile)}
                        alt="default preview"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                      />
                      <button
                        onClick={removeDefault}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white mb-2">
                  Additional Images
                </label>
                <AdditionalDropzone onDrop={onDropAdditional} />
                {additionalFiles.length > 0 && (
                  <div className="mt-3 flex gap-3 overflow-x-auto py-2">
                    {additionalFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`additional ${index}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                        />
                        <button
                          onClick={() => removeAdditional(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 flex gap-3">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={handleCreateProduct}
              >
                Create Product
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Edit Product</h3>
              <p className="text-gray-400 mt-1">Update product details</p>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={formData.name}
                onChange={handleInputChange}
              />
              <select
                name="category_id"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={formData.base_price}
                onChange={handleInputChange}
              />

              <div>
                <label className="block text-white mb-2">Default Image</label>
                {existingDefault && !defaultFile && (
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-2">Current Image:</p>
                    <img
                      src={existingDefault}
                      alt="current default"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                    />
                  </div>
                )}
                <DefaultDropzone onDrop={onDropDefault} />
                {defaultFile && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-sm mb-2">New Image:</p>
                    <div className="relative inline-block">
                      <img
                        src={URL.createObjectURL(defaultFile)}
                        alt="new default"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                      />
                      <button
                        onClick={removeDefault}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white mb-2">
                  Additional Images
                </label>
                {keptAdditional.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-2">
                      Current Images:
                    </p>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {keptAdditional.map((img, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={img}
                            alt={`current ${index}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            onClick={() => removeKeptAdditional(img)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
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
                  <div className="mt-3">
                    <p className="text-gray-400 text-sm mb-2">New Images:</p>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {additionalFiles.map((file, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`new ${index}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            onClick={() => removeAdditional(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
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
            <div className="p-6 border-t border-gray-800 flex gap-3">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={handleUpdateProduct}
              >
                Update Product
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Variants Management Modal */}
      {showVariantsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">
                Manage Variants - {currentProduct?.name}
              </h3>
              <p className="text-gray-400 mt-1">
                Manage product variants and inventory
              </p>
            </div>
            <div className="p-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mb-6"
                onClick={() => {
                  resetVariantForm();
                  setShowCreateVariantModal(true);
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Variant
              </button>

              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Variant Name
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProductVariants.map((v) => (
                      <tr
                        key={v._id}
                        className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/20 transition-colors"
                      >
                        <td className="px-6 py-4 text-white">
                          {v.variant_name}
                        </td>
                        <td className="px-6 py-4 text-red-500 font-bold">
                          ${v.price}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{v.stock}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors border border-blue-500/30 text-sm"
                              onClick={() => handleEditVariant(v)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30 text-sm"
                              onClick={() => handleDeleteVariant(v._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800">
              <button
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setShowVariantsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Variant Modal */}
      {showCreateVariantModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Create Variant</h3>
              <p className="text-gray-400 mt-1">
                Add a new variant to {currentProduct?.name}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                name="variant_name"
                placeholder="Variant Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.variant_name}
                onChange={handleVariantInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.price}
                onChange={handleVariantInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.stock}
                onChange={handleVariantInputChange}
              />
              <input
                type="text"
                name="size"
                placeholder="Size"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.attributes.size}
                onChange={handleAttributeChange}
              />
              <input
                type="text"
                name="scent"
                placeholder="Scent"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.attributes.scent}
                onChange={handleAttributeChange}
              />

              <div>
                <label className="block text-white mb-2">Variant Images</label>
                <VariantDropzone onDrop={onDropVariant} />
                {variantFiles.length > 0 && (
                  <div className="mt-3 flex gap-3 overflow-x-auto py-2">
                    {variantFiles.map((file, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`variant ${index}`}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                        />
                        <button
                          onClick={() => removeVariantImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 flex gap-3">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={handleCreateVariant}
              >
                Create Variant
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setShowCreateVariantModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Variant Modal */}
      {showEditVariantModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Edit Variant</h3>
              <p className="text-gray-400 mt-1">Update variant details</p>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                name="variant_name"
                placeholder="Variant Name"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.variant_name}
                onChange={handleVariantInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.price}
                onChange={handleVariantInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.stock}
                onChange={handleVariantInputChange}
              />
              <input
                type="text"
                name="size"
                placeholder="Size"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.attributes.size}
                onChange={handleAttributeChange}
              />
              <input
                type="text"
                name="scent"
                placeholder="Scent"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                value={variantFormData.attributes.scent}
                onChange={handleAttributeChange}
              />

              <div>
                <label className="block text-white mb-2">Variant Images</label>
                {keptVariantImages.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-400 text-sm mb-2">
                      Current Images:
                    </p>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {keptVariantImages.map((img, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={img}
                            alt={`existing ${index}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            onClick={() => removeKeptVariantImage(img)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <VariantDropzone onDrop={onDropVariant} />
                {variantFiles.length > 0 && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-sm mb-2">New Images:</p>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {variantFiles.map((file, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`new ${index}`}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            onClick={() => removeVariantImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
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
            <div className="p-6 border-t border-gray-800 flex gap-3">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={handleUpdateVariant}
              >
                Update Variant
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                onClick={() => setShowEditVariantModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Beautiful Dropzone Components
const DefaultDropzone = ({ onDrop, multiple = false, accept = "image/*" }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isDragActive
          ? "border-red-500 bg-red-500/10"
          : "border-gray-600 hover:border-red-500 hover:bg-red-500/5"
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-300">
          {isDragActive
            ? "Drop the image here..."
            : "Drag 'n' drop or click to select default image"}
        </p>
        <p className="text-gray-500 text-sm mt-1">Single image only</p>
      </div>
    </div>
  );
};

const AdditionalDropzone = ({
  onDrop,
  multiple = true,
  accept = "image/*",
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isDragActive
          ? "border-red-500 bg-red-500/10"
          : "border-gray-600 hover:border-red-500 hover:bg-red-500/5"
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-300">
          {isDragActive
            ? "Drop images here..."
            : "Drag 'n' drop or click to select additional images"}
        </p>
        <p className="text-gray-500 text-sm mt-1">Multiple images allowed</p>
      </div>
    </div>
  );
};

const VariantDropzone = ({ onDrop, multiple = true, accept = "image/*" }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isDragActive
          ? "border-red-500 bg-red-500/10"
          : "border-gray-600 hover:border-red-500 hover:bg-red-500/5"
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-300">
          {isDragActive
            ? "Drop images here..."
            : "Drag 'n' drop or click to select variant images"}
        </p>
        <p className="text-gray-500 text-sm mt-1">Multiple images allowed</p>
      </div>
    </div>
  );
};

export default ProductManagement;
