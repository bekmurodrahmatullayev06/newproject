export default function Features() {
  return (
    <section style={{ padding: "40px 20px", textAlign: "center" }}>
      <h2>Bizning Afzalliklarimiz</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div>
          <h3>Tezkor</h3>
          <p>Yuqori tezlikda ishlaydigan tizim.</p>
        </div>
        <div>
          <h3>Xavfsiz</h3>
          <p>Ma'lumotlaringiz to'liq xavfsiz.</p>
        </div>
        <div>
          <h3>Moslashuvchan</h3>
          <p>Barcha qurilmalarga mos tushadi.</p>
        </div>
      </div>
    </section>
  );
}
