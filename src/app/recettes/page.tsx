// app/recettes/page.tsx
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function RecettesPage() {
  const recettes = await prisma.recipe.findMany();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold font-serif text-secondaire text-center mb-8">Recettes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recettes.map((recette) => (
          <Link key={recette.id} href={`/recettes/${recette.id}`}>
            <div className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{recette.title}</h2>
              <p className="text-gray-600">{recette.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Difficulté: {recette.difficulty} / 5
              </p>
              <p className="text-sm text-gray-500">Temps: {recette.time} min</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
