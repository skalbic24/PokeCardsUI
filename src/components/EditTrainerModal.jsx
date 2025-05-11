import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTrainerModal = ({ trainer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    trainerName: "",
    region: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        trainerName: trainer.trainerName,
        region: trainer.region,
        imageUrl: trainer.imageUrl || ""
      });
    }
  }, [trainer]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Editing trainer:", trainer);
    console.log("Trainer ID is:", trainer?.trainerId);

    try {
      const res = await axios.put(`http://localhost:8080/api/trainers/${trainer.trainerId}`, formData);
      onSave(res.data); // pass updated trainer back to App
      onClose(); // close modal
    } catch (err) {
      console.error("Failed to update trainer:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-center">Edit Trainer</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="trainerName"
            value={formData.trainerName}
            onChange={handleChange}
            placeholder="Trainer Name"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Region"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTrainerModal;
