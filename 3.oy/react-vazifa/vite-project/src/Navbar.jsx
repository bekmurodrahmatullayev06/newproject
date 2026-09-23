export default function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>Mening Brendim</h2>
      <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
        <li>Bosh sahifa</li>
        <li>Haqida</li>
        <li>Xizmatlar</li>
        <li>Aloqa</li>
      </ul>
    </nav>
  );
}
