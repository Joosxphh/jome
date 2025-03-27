import { ingredientsArray, stepsArray } from "@/utils/utils";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Récupérer une recette spécifique par son id (GET)
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Utilisation de l'id extrait de l'URL
    const { id } = params;

    const recette = await prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true, steps: true },
    });

    if (!recette) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(recette);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  const { id } = params;

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

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        difficulty: difficultyInt,
        time: timeInt,
        ingredients: {
          deleteMany: {},
          create: _ingredientsArray,
        },
        steps: {
          deleteMany: {},
          create: _stepsArray,
        },
      },
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Erreur Prisma :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  const { id } = await params;

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    await prisma.ingredient.deleteMany({
      where: { recipeId: id },
    });

    await prisma.step.deleteMany({
      where: { recipeId: id },
    });

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
