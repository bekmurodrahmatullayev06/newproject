import { useNavigate } from 'react-router-dom';

const guruhlar = [
  {
    id: 1,
    nom: 'FullStack SN2',
    yonalish: 'Programming',
    yol: 'fullstack-sn2',
  },
  {
    id: 2,
    nom: 'FullStack SN3',
    yonalish: 'Programming',
    yol: 'fullstack-sn3',
  },
  {
    id: 3,
    nom: 'FullStack SN4',
    yonalish: 'Programming',
    yol: 'fullstack-sn4',
  },
];

function Guruhlar() {
 
  return (
    <div>
      <div className="tabs">
        <span className="tab active">Faol</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Guruh nomi</th>
              <th>Yo'nalishi</th>
            </tr>
          </thead>
          <tbody>
            {guruhlar.map((g) => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.nom}</td>
                <td>{g.yonalish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Guruhlar;
