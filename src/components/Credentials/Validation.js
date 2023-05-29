const Validation = (username, email, password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!username) {
        errors.username = "Username is required!";
    }
    if (email === '') {
        errors.email = "Email is required!";
    } else if (!regex.test(email)) {
        errors.email = "This is not a valid email format!";
    }
    if (password === '') {
        errors.password = "Password is required";
    }
    // else if (password.length < 8) {
    //     errors.password = "Password must be more than 8 characters";
    // } else if (password.length > 10) {
    //     errors.password = "Password cannot exceed more than 10 characters";
    // }
    return errors;
};
export default Validation;