export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>TopBar</div>
      {children}
    </div>
  );
}
