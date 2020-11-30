import Discord from "discord.js";

function validateRoles(
  message: Discord.Message,
  roles: Record<string, string>
): boolean {
  const rolesValues = Object.values(roles);
  const mappedArray = rolesValues.map((r) => {
    const role = message.guild.roles.cache.get(r);
    return role ? true : false;
  });

  const hasRoles = mappedArray.every((expression) => expression);
  if (!hasRoles) return false;
  return true;
}

export { validateRoles };
