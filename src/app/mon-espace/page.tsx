"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecettesPage = () => {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecettes = async () => {
      const response = await fetch("/api/recettes");
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setRecettes(data);
      }
      setLoading(false);
    };

    fetchRecettes();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette recette ?"
    );
    if (confirmDelete) {
      const response = await fetch(`/api/recettes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setRecettes(recettes.filter((recette: any) => recette.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/mon-espace/recette/${id}`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Mes Recettes</h1>
      <div className="text-center mb-6">
        <button
          onClick={() => router.push("/mon-espace/recette")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Créer une recette
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recettes.map((recette: any, index) => (
          <li
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            key={recette.id}
          >
            <h2>Recette numéro°{index + 1}</h2>
            <h2 className="text-xl font-semibold text-gray-800">
              {recette.title}
            </h2>
            <p className="text-gray-600 mb-4">{recette.description}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(recette.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(recette.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecettesPage;
