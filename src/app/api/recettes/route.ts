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
      where: { userId: session.user.id },
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

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        difficulty,
        time,
        userId: session.user.id,
        ingredients: {
          create: ingredients.map(
            (ing: { name: string; quantity: string }) => ({
              name: ing.name,
              quantity: ing.quantity,
            })
          ),
        },
        steps: {
          create: steps.map((step: { instruction: string }) => ({
            instruction: step.instruction,
          })),
        },
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
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
