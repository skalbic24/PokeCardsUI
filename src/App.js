import React, { useEffect, useState } from "react";
import TrainerList from "./components/TrainerList";
import AddTrainerForm from "./components/AddTrainerForm";
import axios from "axios";
import background from "./assets/pokemon-bg3.png";

function App() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/trainers")
      .then(res => setTrainers(res.data))
      .catch(err => console.error("Error fetching trainers:", err));
  }, []);

  const handleTrainerAdded = (newTrainer) => {
    setTrainers(prev => [...prev, newTrainer]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <h1 className="text-4xl text-center font-bold py-6 text-white drop-shadow-lg">
        Pokémon Base Cards
      </h1>
      <AddTrainerForm onTrainerAdded={handleTrainerAdded} />
      <TrainerList trainers={trainers} />
    </div>
  );
}

export default App;
