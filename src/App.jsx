import "./App.css";
import Header from "./components/header/header-component.jsx";
import ContentCard from "./components/content-card/content-card.jsx"
import Sidebar from "./components/sidebar/sidebar.jsx";

const contentData = [
  {
    title: "6FC 5357-0BB33-0AE0",
    description: "840D/DE NCU 573.2 5 ACHSEN/SPINDELN MAX. 31 SPEICHER NC 1,5MB PLC 64KB (MAX. 288KB), 8MB BIS 32MB D-RAM, STANDARD ODER",
    image: "src/assets/react.svg",
    brand: "Siemens"
  },
  {
    title: "6FC 5270-5BX30-3AH0",
    description: "SOFTWARE NCU 573.2",
    image: "src/assets/react.svg",
    brand: "Siemens"
  },
  {
    title: "6FC 5252-0AD00-0AA0",
    description: "SINUMERIK 810D/840D I/O connection via PROFIBUS DP, software option only Certificate of License",
    image: "src/assets/react.svg",
    brand: "Siemens"
  },
  {
    title: "6FC 5252-0AX21-0AB0",
    description: '840D-TOOLBOX, DISK 3,5" LICENCIA',
    image: "src/assets/react.svg",
    brand: "Siemens"
  },
  {
    title: "6ES 7153-1AA03-0XB0",
    description: "IM 153-1 ET 200M PERIFERIA DESCENTRALIZADA FUER MAXIMAL 8 S7-300 BAUGRUPPEN",
    image: "src/assets/react.svg",
    brand: "Siemens"
  }
]

function App() {
  return (
    <>
    <div className="page-container">
      <div className="header">
        <Header />
      </div>
      <div className="main-panel">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="grid-container">
          {contentData.map((content, index) => (
            <ContentCard
            className="content-card" key={index}
            title={content.title}
            description={content.description}
            image={content.image}
            brand={content.brand}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
