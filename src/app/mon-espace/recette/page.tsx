"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MonEspaceRecettes() {
  const { status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: 1,
    time: 10,
    ingredients: "",
    steps: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-xl font-semibold">Chargement...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/recettes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mon Espace Recettes</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Nom de la recette"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <input
          type="number"
          name="difficulty"
          min="1"
          max="5"
          placeholder="Difficulté (1-5)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="time"
          placeholder="Temps de préparation (minutes)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="ingredients"
          placeholder="Ingrédients (séparés par des virgules)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2 h-32"
        ></textarea>
        <textarea
          name="steps"
          placeholder="Étapes (séparés par des virgules)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2 h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter Recette
        </button>
      </form>
    </div>
  );
}
