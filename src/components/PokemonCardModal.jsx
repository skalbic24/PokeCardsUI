import React, { useEffect, useState } from "react";
import axios from "axios";


const PokemonCardModal = ({ mode, trainerId, cardData, onClose, onSave }) => {
  console.log("Trainer ID received by modal:", trainerId);
  const [formData, setFormData] = useState({
    name: "",
    hp: 0,
    rarity: "",
    imageUrl: "",
    typeIds: [],
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/types").then((res) => setTypes(res.data));
  }, []);

  useEffect(() => {
    if (cardData) {
      setFormData({
        name: cardData.name || "",
        hp: cardData.hp || 0,
        rarity: cardData.rarity || "",
        imageUrl: cardData.imageUrl || "",
        typeIds: cardData.types?.map(type => type.typeId) || [],

      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (typeId) => {
    setFormData((prev) => ({
      ...prev,
      typeIds: prev.typeIds.includes(typeId)
        ? prev.typeIds.filter((id) => id !== typeId)
        : [...prev.typeIds, typeId],
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trainerId) {
      console.error("Trainer ID is missing");
      return;
    }
  
    const payload = { ...formData, trainerId };
    console.log("Payload being submitted:", payload);
    try {
      const url =
        mode === "edit"
          ? `http://localhost:8080/api/cards/${cardData.cardId}`
          : "http://localhost:8080/api/cards";
      const method = mode === "edit" ? "put" : "post";
      const res = await axios[method](url, payload);
      onSave(res.data);
    } catch (err) {
      console.error("Failed to save card", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === "edit" ? "Edit" : "Add"} Pokémon Card
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Pokémon Name"
            className="w-full border px-3 py-2 mb-2 rounded"
            required
          />
          <input
            type="number"
            name="hp"
            value={formData.hp}
            onChange={handleChange}
            placeholder="HP"
            className="w-full border px-3 py-2 mb-2 rounded"
            required
          />
          <input
            type="text"
            name="rarity"
            value={formData.rarity}
            onChange={handleChange}
            placeholder="Rarity"
            className="w-full border px-3 py-2 mb-2 rounded"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border px-3 py-2 mb-4 rounded"
          />
          <div className="mb-4">
            <p className="font-semibold mb-1">Select Types:</p>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <label key={type.typeId} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={formData.typeIds.includes(type.typeId)}
                    onChange={() => handleCheckbox(type.typeId)}
                  />
                  {type.typeName}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PokemonCardModal;
