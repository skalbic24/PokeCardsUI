import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X, Check, Plus, Edit, Trash } from "lucide-react";
import PokemonCardModal from "../components/PokemonCardModal";

const TrainerCard = ({ trainer, onEdit, onDelete }) => {
    const [cards, setCards] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        if (trainer?.trainerId) {
            fetchCards();
        }
    }, [trainer?.trainerId]);

    const fetchCards = () => {
        axios
            .get(`http://localhost:8080/api/trainers/${trainer.trainerId}/cards`)
            .then((res) => setCards(res.data))
            .catch((err) => console.error("Error fetching cards:", err));
    };

    const handleCardSaved = () => {
        fetchCards();
        setModalMode(null);
        setSelectedCard(null);
    };

    const handleCardDelete = async (cardId) => {
        try {
            await axios.delete(`http://localhost:8080/api/cards/${cardId}`);
            setCards((prev) => prev.filter((card) => card.cardId !== cardId));
        } catch (err) {
            console.error("Failed to delete card", err);
        }
    };

    // Only return null after hooks have been declared
    if (!trainer || !trainer.trainerId) return null;

    return (
        <div className="relative inline-block">
            {/* Trainer Edit/Delete Icons */}
            <button
                onClick={() => onEdit(trainer)}
                className="absolute -top-4 left-2 text-yellow-500 hover:text-yellow-400"
                title="Edit Trainer"
            >
                <Pencil size={20} />
            </button>
            <button
                onClick={() => setShowConfirm(true)}
                className="absolute -top-4 right-2 text-red-500 hover:text-red-400"
                title="Delete Trainer"
            >
                <Trash2 size={20} />
            </button>

            {/* Trainer Card */}
            <div className="trainer-card">
                <img
                    src={trainer.imageUrl || "/ash.png"}
                    alt={trainer.trainerName}
                    className="w-32 h-32 mx-auto rounded-full border-4 border-red-500 mt-4"
                />

                <div className="text-center mt-4">
                    <h2 className="text-xl font-bold text-gray-800">{trainer.trainerName}</h2>
                    <p className="text-gray-600">Region: {trainer.region}</p>

                    {/* Add Pokémon Button */}
                    <div className="flex justify-center mt-2 mb-4">
                        <button
                            onClick={() => {
                                setModalMode("add");
                                setSelectedCard(null);
                            }}
                            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow"
                        >
                            Add Pokémon <Plus size={14} />
                        </button>
                    </div>

                    {/* Pokémon Cards */}
                    <div className="space-y-2">
                        {cards.length > 0 ? (
                            cards.map((card) => (
                                <div key={card.cardId} className="bg-white p-2 rounded shadow">
                                    {/* Pokémon name */}
                                    <p className="font-semibold text-lg text-center mb-1">{card.name}</p>

                                    {/* Pokémon Image */}
                                    <img
                                        src={card.imageUrl || "/default-pokemon.png"}
                                        alt={card.name}
                                        className="w-full h-40 object-contain mb-2"
                                    />

                                    {/* Edit/Delete icons */}
                                    <div className="flex justify-end gap-1 text-sm mb-1">
                                        <button
                                            onClick={() => {
                                                setModalMode("edit");
                                                setSelectedCard(card);
                                            }}
                                            title="Edit"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleCardDelete(card.cardId)}
                                            title="Delete"
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>

                                    {/* Card Info */}
                                    <p>HP: {card.hp}</p>
                                    <p>Rarity: {card.rarity}</p>
                                    <p>
                                        Type:{" "}
                                        {Array.isArray(card.types)
                                            ? card.types.map((t) => (typeof t === "string" ? t : t.typeName)).join(", ")
                                            : ""}
                                    </p>

                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No cards yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirm Trainer Delete */}
            {showConfirm && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center z-10 rounded-xl">
                    <div className="bg-white p-4 text-center rounded shadow-md">
                        <p className="mb-2 font-bold text-red-600">Delete {trainer.trainerName}?</p>
                        <p className="text-sm mb-4">This will also delete all their Pokémon cards!</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                            >
                                <X size={14} /> Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(trainer.trainerId);
                                    setShowConfirm(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                <Check size={14} /> Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pokémon Modal */}
            {modalMode && (
                <PokemonCardModal
                    mode={modalMode}
                    trainerId={trainer.trainerId}
                    cardData={selectedCard}
                    onClose={() => {
                        setModalMode(null);
                        setSelectedCard(null);
                    }}
                    onSave={handleCardSaved}
                />
            )}
        </div>
    );
};

export default TrainerCard;
