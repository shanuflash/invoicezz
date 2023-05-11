import Menu from "@/components/menu/menu";
import Total from "@/components/total";
import Preview from "@/components/preview";
import Details from "@/components/details";

export default function Home() {
  return (
    <>
      <Details />
      <Menu />
      <Total />
      <Preview />
    </>
  );
}
