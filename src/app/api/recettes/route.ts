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
      where: { authorId: "eba4c33f-f502-4f73-9acf-7aa253a2b6f4" },
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

    const ingredientsArray = ingredients
      .split(",")
      .map((ingredient: string) => {
        const parts = ingredient.trim().split(" ");
        const quantity = parts.shift() || "1";
        const name = parts.join(" ");
        return { name, quantity };
      });

    const stepsArray = steps.split("\n").map((step: string, index: number) => ({
      instruction: step.trim(),
      order: index + 1,
    }));

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        difficulty: difficultyInt,
        time: timeInt,
        authorId: "eba4c33f-f502-4f73-9acf-7aa253a2b6f4",
        ingredients: {
          create: ingredientsArray.map(({ name, quantity }) => ({
            name,
            quantity,
          })),
        },
        steps: {
          create: stepsArray,
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

/**
 * Modifier une recette existante (PUT)
 */
export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, description, difficulty, time, ingredients, steps } =
      body;

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        time,
        ingredients: {
          deleteMany: {}, // Supprime les anciens ingrédients avant d'ajouter les nouveaux
          create: ingredients.map(
            (ing: { name: string; quantity: string }) => ({
              name: ing.name,
              quantity: ing.quantity,
            })
          ),
        },
        steps: {
          deleteMany: {}, // Supprime les anciennes étapes avant d'ajouter les nouvelles
          create: steps.map((step: { instruction: string }) => ({
            instruction: step.instruction,
          })),
        },
      },
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * Supprimer une recette (DELETE)
 */
export async function DELETE(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
