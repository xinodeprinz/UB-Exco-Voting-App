export const loginSchema = {
    body: {
        username: { type: 'string', min: 3, max: 15 },
        password: { type: 'string', min: 3 },
    },
};