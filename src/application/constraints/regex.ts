export const validation = {
    passwordValidation: new RegExp(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g
    ),
    nameValidation: new RegExp(/^[a-zA-Z\u00E0-\u00FC ]{3,20}$/),
    emailValidation: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
};
