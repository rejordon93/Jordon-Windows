import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Body from "./components/Body";
import Sections from "./components/Sections";
import Services from "./components/Services";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Body />
      <Services />
      <Sections />
    </div>
  );
}
