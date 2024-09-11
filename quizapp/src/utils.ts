export const shuffleArray = (array: unknown[]) =>
    [...array].sort(() => Math.random() - 0.5);
