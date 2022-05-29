export const getDatabaseUri = () => {
    if (process.env.DB_PASSWORD && process.env.DB_URI) {
        return process.env.DB_URI.replace('<password>', process.env.DB_PASSWORD);
    }

    return '';
};