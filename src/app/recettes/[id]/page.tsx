import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RecetteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const recette = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: true,
      steps: true,
    },
  });

  if (!recette) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">{recette.title}</h1>
      <p className="text-gray-700 mb-4">{recette.description}</p>
      <p className="text-sm text-gray-500">
        Difficulté: {recette.difficulty} / 5
      </p>
      <p className="text-sm text-gray-500">Temps: {recette.time} min</p>

      <h2 className="text-2xl font-semibold mt-6">Ingrédients</h2>
      <ul className="list-disc list-inside">
        {recette.ingredients.map((ingredient) => (
          <li key={ingredient.id} className="text-gray-600">
            {ingredient.quantity} de {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Étapes</h2>
      <ol className="list-decimal list-inside">
        {recette.steps.map((step, index) => (
          <li key={step.id} className="text-gray-600">
            {index + 1}. {step.instruction}
          </li>
        ))}
      </ol>
    </div>
  );
}
