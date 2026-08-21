export const ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
};

export const DEPARTMENTS = ["CSE", "ECE", "AIML", "IT", "MECH"];

export const SORT_OPTIONS = [
    { value: "NAME_ASC", label: "Name A-Z" },
    { value: "NAME_DESC", label: "Name Z-A" },
    { value: "CGPA_DESC", label: "CGPA High-Low" },
    { value: "DEPARTMENT", label: "Department" },
];

export const PAGE_SIZE = 5;

export const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "students", label: "Students" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
];
