const passwordValidator = require('password-validator');

var schema = new passwordValidator();

// password rules
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100); // Maximum length 100

export const validatePassword = (password: string) => {
    return schema.validate(password);
};
