import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-[#F5F3F4]">
      <NavBar />
      <div className="flex-1"></div>
      <MenuBar />
    </div>
  );
}
