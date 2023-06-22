export const sleep = (n?: number) => {
    const THIRTY_SECONDS = 10000;
    if (!n) n = THIRTY_SECONDS;
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
};
