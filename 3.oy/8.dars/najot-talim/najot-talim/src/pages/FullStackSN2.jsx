import DarsJadvali from "../components/DarsJadvali";

const darslar = [
  { mavzu: "Dars 7 (3oy)", holat: "Bajarilmagan" },
  { mavzu: "Dars 6 (3oy)", holat: "Kutayotganlar" },
  { mavzu: "Dars 5 (3oy)", holat: "Berilmagan" },
  { mavzu: "Dars 4 (3oy)", holat: "Berilmagan" },
  { mavzu: "Dars 3 (3oy)", holat: "Kutayotganlar" },
  { mavzu: "Dars 2 (3oy)", holat: "Berilmagan" },
  { mavzu: "Dars 1 (3oy)", holat: "Kutayotganlar" },
 
];

function FullStackSN2() {
  return <DarsJadvali nom="FullStack SN2" darslar={darslar} />;
}

export default FullStackSN2;