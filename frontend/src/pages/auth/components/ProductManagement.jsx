/* eslint-disable no-unused-vars */
// frontend/src/components/ProductManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Assume react-toastify is installed: npm i react-toastify

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    default_image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
      setVariants(res.data.variants);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post("/api/products", formData);
      toast.success("Product created");
      setShowCreateModal(false);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      default_image: product.default_image,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/products/${currentProduct.id}`, formData);
      toast.success("Product updated");
      setShowEditModal(false);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  // Similar logic for variants can be added with separate modals

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowCreateModal(true)}
      >
        Add Product
      </button>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category ID</th>
              <th>Default Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category_id}</td>
                <td>{product.default_image}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal - Using DaisyUI */}
      <dialog id="create_modal" className="modal" open={showCreateModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Product</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category_id"
              placeholder="Category ID"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="default_image"
              placeholder="Default Image URL"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
            <button className="btn" onClick={() => setShowCreateModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal" open={showEditModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Product</h3>
          <div className="py-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category_id"
              value={formData.category_id}
              placeholder="Category ID"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="default_image"
              value={formData.default_image}
              placeholder="Default Image URL"
              className="input input-bordered w-full mb-2"
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Add similar sections for variants management */}
    </div>
  );
};

export default ProductManagement;
