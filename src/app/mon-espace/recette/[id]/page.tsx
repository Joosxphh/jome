"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditRecettePage({
  params,
}: {
  params: { id: string };
}) {
  const { status } = useSession();
  const router = useRouter();
  const { id } = params;

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

  // Si l'id est disponible (avant de charger les données)
  useEffect(() => {
    const fetchRecette = async () => {
      if (!id) return;

      const response = await fetch(`/api/recettes/${id}`);
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setFormData({
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          time: data.time,
          ingredients: data.ingredients.map((ing: any) => ing.name).join(", "), // Convertir les ingrédients en texte
          steps: data.steps.map((step: any) => step.instruction).join("\n"), // Convertir les étapes en texte
        });
      }
    };

    fetchRecette();
  }, [id]);

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
    const response = await fetch(`/api/recettes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push(`/recettes/${id}`); // Rediriger vers la page de la recette après la modification
    } else {
      const data = await response.json();
      alert(data.error || "Erreur lors de la modification");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <Link href={"/mon-espace"}>Retour</Link>
      <h1 className="text-3xl font-bold mb-6">Modifier la Recette</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Nom de la recette"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          value={formData.description}
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
          value={formData.difficulty}
          placeholder="Difficulté (1-5)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="time"
          value={formData.time}
          placeholder="Temps de préparation (minutes)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="ingredients"
          value={formData.ingredients}
          placeholder="Ingrédients (séparés par des virgules)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2 h-32"
        ></textarea>
        <textarea
          name="steps"
          value={formData.steps}
          placeholder="Étapes (séparés par des virgules)"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-2 h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Modifier Recette
        </button>
      </form>
    </div>
  );
}
