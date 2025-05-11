import React, { useEffect, useState } from "react";
import TrainerList from "./components/TrainerList";
import AddTrainerForm from "./components/AddTrainerForm";
import EditTrainerModal from "./components/EditTrainerModal";
import axios from "axios";

function App() {
  const [trainers, setTrainers] = useState([]);
  const [editingTrainer, setEditingTrainer] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/trainers")
      .then(res => setTrainers(res.data))
      .catch(err => console.error("Error fetching trainers:", err));
  }, []);

  const handleTrainerAdded = (newTrainer) => {
    setTrainers(prev => [...prev, newTrainer]);
  };

  const handleTrainerEdit = (trainer) => {
    console.log("Editing trainer:", trainer);
  console.log("Trainer ID is:", trainer?.trainerId);
    setEditingTrainer(trainer);
  };

  const handleTrainerDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/trainers/${id}`);
      setTrainers(prev => prev.filter(t => t.trainerId !== id));
    } catch (err) {
      console.error("Failed to delete trainer:", err);
    }
  };
  

  const handleTrainerSave = async (id, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/trainers/${id}`, updatedData);
      setTrainers(prev =>
        prev.map(t => t.trainerId === id ? res.data : t)
      );
      setEditingTrainer(null);
    } catch (err) {
      console.error("Failed to update trainer", err);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #fceabb, #f8b500)",
        minHeight: "100vh",
        paddingBottom: "2rem"
      }}
    >
      <h1 className="text-4xl text-center font-bold py-6 text-red-600 drop-shadow-md tracking-wide">
        🎴 Pokémon Base Cards
      </h1>
      <AddTrainerForm onTrainerAdded={handleTrainerAdded} />
      <TrainerList trainers={trainers} onEdit={handleTrainerEdit} />
      {editingTrainer && (
        <EditTrainerModal
          trainer={editingTrainer}
          onClose={() => setEditingTrainer(null)}
          onSave={(updatedTrainer) =>
            handleTrainerSave(updatedTrainer.trainerId, updatedTrainer)
          }
        />
      )}

    </div>
  );
}

export default App;
