export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const sumBy = (arr, fn) => arr.reduce((prev, cur) => prev + fn(cur), 0);


// export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
