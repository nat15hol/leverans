import Footer from "./Footer"

export default function About() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      
      <div style={{ padding: "20px", flex: 1 }}>
        <h1>Om Leveransometer</h1>
        <p>
          Leveransometer hjälper dig att fokusera på det du faktiskt levererar.  
Appen visualiserar balansen mellan din last och dina genomförda leveranser för att göra framsteg tydliga och motiverande.
Filosofin är enkel: det viktiga är inte hur mycket du bär, utan vad du faktiskt levererar.
Leveransometer är utvecklad av Henrik Oldehed, med fokus på enkelhet, tydlig informationsdesign och ett nytt sätt att tänka kring produktivitet.
Länkar:         </p>
<div style={{ marginTop: "30px" }}>
          <h3>Kontakt</h3>

          <p>
            Portfolio:{" "}
            <a
              href="https://nat15hol.github.io/Portfolio-project/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </p>

          <p>
            GitHub:{" "}
            <a
              href="https://github.com/nat15hol/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>

          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/henrikoldehed/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>

          <p>
            Kontakt:{" "}
            <a href="mailto:henrik.oldehed@gmail.com">
              henrik.oldehed@gmail.com
            </a>
          </p>
        </div>

      </div>

      <Footer />
    </div>
  )
}