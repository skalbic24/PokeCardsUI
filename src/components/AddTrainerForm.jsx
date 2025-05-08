import React, { useState } from "react";
import axios from "axios";

const AddTrainerForm = ({ onTrainerAdded }) => {
  const [formData, setFormData] = useState({
    trainerName: "",
    region: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/trainers", formData);
      onTrainerAdded(res.data);
      setFormData({ trainerName: "", region: "", imageUrl: "" }); // reset form
    } catch (err) {
      console.error("Failed to add trainer", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Add New Trainer</h2>
      <input
        type="text"
        name="trainerName"
        value={formData.trainerName}
        onChange={handleChange}
        placeholder="Trainer Name"
        className="w-full border rounded px-3 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        placeholder="Region"
        className="w-full border rounded px-3 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        Add Trainer
      </button>
    </form>
  );
};

export default AddTrainerForm;
