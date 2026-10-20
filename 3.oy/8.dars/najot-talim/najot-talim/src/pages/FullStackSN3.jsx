import DarsJadvali from "../components/DarsJadvali";

const darslar = [
  { mavzu: "Dars 5 (2oy)", holat: "Bajarilmagan" },
  { mavzu: "Dars 4 (2oy)", holat: "Kutayotganlar" },
  { mavzu: "Dars 3 (2oy)", holat: "Berilmagan" },
  { mavzu: "Dars 2 (2oy)", holat: "Kutayotganlar" },
  { mavzu: "Dars 1 (2oy)", holat: "Berilmagan" },
 
];

function FullStackSN3() {
  return <DarsJadvali nom="FullStack SN3" darslar={darslar} />;
}

export default FullStackSN3;