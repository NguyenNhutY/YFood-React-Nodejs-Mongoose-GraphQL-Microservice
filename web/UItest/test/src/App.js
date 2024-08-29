import "./App.css";
import Navbar from "./components/Navbar";
import List from "./components/List/List";
import Card from "./components/Card";
import Select from "./components/Select";
const cardApp = [
  {
    title: "Card 7",
    text: "Some text for Card 4",
    img: "image4.jpg",
    promoPrice: 20,
    origincalPrice: 30,
    rating: 5,
  },
];

function App() {
  return (
    <div className='App'>
      <Navbar />
      {/* Your application's components go here */}
      {/* Example: <HeroSection /> */}
      <List />
      <Card card={cardApp} />
      <div className='div-new'>
        {" "}
        <div className='div-new-right'>
          <Card card={cardApp} />
        </div>
      </div>
      <Select />
    </div>
  );
}

export default App;
