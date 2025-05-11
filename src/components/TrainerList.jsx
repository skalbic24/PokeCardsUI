import React from "react";
import TrainerCard from "./TrainerCard";

const TrainerList = ({ trainers, onEdit }) => {
  if (!Array.isArray(trainers) || trainers.length === 0) {
    return <p className="text-center text-gray-500">Loading trainers...</p>;
  }

  return (
    <div className="trainer-list">
      {trainers
        .filter((trainer) => trainer && trainer.trainerId)
        .map((trainer) => (
          <TrainerCard
            key={trainer.trainerId}
            trainer={trainer}
            onEdit={onEdit}
            onDelete={() => {}}
          />
        ))}
    </div>
  );
};

export default TrainerList;
