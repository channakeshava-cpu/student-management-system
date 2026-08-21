const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;

export const validateLogin = ({ username, password }) => {
    if (!username.trim()) return "Username is required.";
    if (!password.trim()) return "Password is required.";
    return "";
};

export const validateRegister = ({ username, email, password }) => {
    if (!username.trim()) return "Username is required.";
    if (!emailPattern.test(email)) return "Enter a valid email address.";
    if (password.trim().length < 6) return "Password must be at least 6 characters.";
    return "";
};

export const validateStudent = ({ name, email, phone, department, cgpa }) => {
    if (!name.trim()) return "Student name is required.";
    if (!emailPattern.test(email)) return "Enter a valid student email.";
    if (!phonePattern.test(phone)) return "Phone number must be 10 digits.";
    if (!department) return "Department is required.";

    const numericCgpa = Number(cgpa);
    if (Number.isNaN(numericCgpa) || numericCgpa < 0 || numericCgpa > 10) {
        return "CGPA must be between 0 and 10.";
    }

    return "";
};
