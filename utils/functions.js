export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getUserCollection(userId) {
  return `user_${userId}`;
}
