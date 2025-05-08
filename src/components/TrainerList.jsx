import React from "react";
import TrainerCard from "./TrainerCard";

const TrainerList = ({ trainers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.trainerId}
          trainer={trainer}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default TrainerList;
