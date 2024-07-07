export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
}

export const validateUser = async ({ email, phoneNumber, fullName }) => {  
    const errors = [];
    if (!validateEmail(email)) {
        errors.push('Invalid email address');
    }

    if (phoneNumber && phoneNumber.length>10 && phoneNumber.length<6 ) {
        errors.push('phone number length should be equal to 10');
    }

    if(fullName && fullName.length<3){
        errors.push('full name chars length should be greater than length 3')
    }
    return errors;
}