export const hasRole = (userType, roles = []) => Array.isArray(roles) && roles.includes(userType);
