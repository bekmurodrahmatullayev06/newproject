import DarsJadvali from "../components/DarsJadvali";

const darslar = [
  { mavzu: "Imtihon 1oy", holat: "Kutayotganlar" },
  { mavzu: "Dars 11", holat: "Berilmagan" },
  { mavzu: "Dars 10", holat: "Berilmagan" },
  { mavzu: "Dars 9", holat: "Kutayotganlar" },
  { mavzu: "Dars 8", holat: "Berilmagan" },
  { mavzu: "Dars 7", holat: "Bajarilmagan" },
  { mavzu: "Dars 6", holat: "Berilmagan" },
  { mavzu: "Dars 5", holat: "Kutayotganlar" },
  { mavzu: "Dars 4", holat: "Berilmagan" },
  { mavzu: "Dars 3", holat: "Berilmagan" },
  { mavzu: "Dars 2", holat: "Kutayotganlar" },
  { mavzu: "Dars 1", holat: "Berilmagan" },
];

function FullStackSN4() {
  return <DarsJadvali nom="FullStack SN4" darslar={darslar} />;
}

export default FullStackSN4;