import React, { useEffect, useState } from "react";
import axios from "axios";

const TrainerCard = ({ trainer, onEdit, onDelete }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/trainers/${trainer.trainerId}/cards`)
      .then(res => setCards(res.data))
      .catch(err => console.error("Error fetching cards:", err));
  }, [trainer.trainerId]);

  return (
    <div className="w-full max-w-sm bg-yellow-100 shadow-xl rounded-2xl p-4">
      <img
        src={trainer.imageUrl || "/ash.png"}
        alt={trainer.trainerName}
        className="w-32 h-32 mx-auto rounded-full border-4 border-red-500"
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">{trainer.trainerName}</h2>
        <p className="text-gray-600 mb-2">Region: {trainer.region}</p>
        <div className="flex justify-center space-x-2 mb-4">
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => onEdit(trainer)}>Edit</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => onDelete(trainer.trainerId)}>Delete</button>
        </div>
        <div className="space-y-2">
          {cards.length > 0 ? (
            cards.map(card => (
              <div key={card.cardId} className="bg-white p-2 rounded shadow">
                <img
                  src={`/card-${card.cardId}.png`}
                  alt={card.name}
                  className="w-16 h-16 mx-auto mb-1"
                />
                <p className="font-semibold">{card.name}</p>
                <p>HP: {card.hp}</p>
                <p>Rarity: {card.rarity}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No cards yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
