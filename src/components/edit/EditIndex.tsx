import EditHero from "./EditHero";
import EditShowcase from "./EditShowcase";
import EditBrands from "./EditBrands";
import EditStats from "./EditStats";
import EditClosing from "./EditClosing";

export default function EditIndex() {
  return (
    <div>
      <EditHero />
      <EditShowcase />
      <EditBrands />
      <EditStats />
      <EditClosing />
    </div>
  );
}
