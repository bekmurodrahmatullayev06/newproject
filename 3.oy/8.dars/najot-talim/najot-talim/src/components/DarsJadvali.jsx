function DarsJadvali({ nom, darslar }) {
  return (
    <div>
      <h2 className="sahifa-sarlavha">{nom}</h2>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Mavzular</th>
              <th>Uyga vazifa holati</th>
            </tr>
          </thead>
          <tbody>
            {darslar.map((d, i) => (
              <tr key={i}>
                <td>{d.mavzu}</td>
                <td>
                  <span className={`holat ${d.holat.toLowerCase()}`}>
                    {d.holat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DarsJadvali;