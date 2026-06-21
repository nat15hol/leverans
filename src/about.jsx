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
Länkar: Portfolio · GitHub · LinkedIn · Kontakt.
        </p>
      </div>

      <Footer />
    </div>
  )
}