function ProtectComponent({
  allowedRoles,
  children,
  userRole,
  customCheck = [],
}) {
  if (customCheck.length > 0) {
    if (customCheck.includes(true)) return <>{children}</>;
  } else if (allowedRoles?.includes(userRole)) return <>{children}</>;
}

export default ProtectComponent;
