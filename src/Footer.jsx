import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div style={{
      padding: "10px 20px",
      borderTop: "1px solid #eee",
      fontSize: "12px",
      opacity: 0.8,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      gap: "12px"
    }}>
      <span>© 2026 Henrik Oldehed</span>

      <span>✦</span>

      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        Home
      </Link>

      <span>|</span>

      <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>
        Om
      </Link>
      
    </div>
  )
}