export const ingredientsArray = (ingredients: any) =>
  ingredients.split(",").map((ingredient: string) => {
    const parts = ingredient.trim().split(" ");
    const quantity = parts.shift() || "1";
    const name = parts.join(" ");
    return { name, quantity };
  });

export const stepsArray = (steps: any) =>
  steps.split("\n").map((step: string, index: number) => ({
    instruction: step.trim(),
    order: index + 1,
  }));
