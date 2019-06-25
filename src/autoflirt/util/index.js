export const getRandomInt = max => {
    return Math.floor(Math.random() * (max + 1));
}

export const getRandomBoolean = () => {
    return Math.random() < 0.5;
}