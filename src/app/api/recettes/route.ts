import { ingredientsArray, stepsArray } from "@/utils/utils";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Récupérer les recettes de l'utilisateur connecté (GET)
 */
export async function GET(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const recettes = await prisma.recipe.findMany({
      where: { authorId: "1145a33d-deea-4c15-83e9-3c28547e605f" },
      include: { ingredients: true, steps: true },
    });
    return NextResponse.json(recettes);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * Ajouter une nouvelle recette (POST)
 */
export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, difficulty, time, ingredients, steps } = body;

    const difficultyInt = parseInt(difficulty);
    const timeInt = parseInt(time);

    if (isNaN(difficultyInt) || isNaN(timeInt)) {
      return NextResponse.json(
        { error: "Difficulté et temps doivent être des nombres valides" },
        { status: 400 }
      );
    }

    const _ingredientsArray = ingredientsArray(ingredients);
    const _stepsArray = stepsArray(steps);

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        difficulty: difficultyInt,
        time: timeInt,
        authorId: "1145a33d-deea-4c15-83e9-3c28547e605f",
        ingredients: {
          create: _ingredientsArray,
        },
        steps: {
          create: _stepsArray,
        },
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return NextResponse.json(
      { error: "Erreur serveur", realError: error.message },
      { status: 500 }
    );
  }
}
