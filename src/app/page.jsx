import recipes from "@/data/recipes.json";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";



export default function Home() {
  return (
    <>
      <Header data={recipes} />
      Main Content
      <Footer />
    </>
  );
}
