import React, { useEffect, useState } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [toFilter, setTofilter] = useState('');

  const apiFetch = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const json = await request.json();
    const apiData = json.results;
    setData(apiData);
  };

  useEffect(() => {
    apiFetch();
  }, []);

  const filtered = data.filter(({ name }) => name.includes(toFilter));

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ toFilter }
        onChange={ ({ target: { value } }) => setTofilter(value) }
      />
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        <tbody>
          {data.length > 0 && filtered.map((el) => (
            <tr key={ el.name }>
              <td>{el.name}</td>
              <td>{el.rotation_period}</td>
              <td>{el.orbital_period}</td>
              <td>{el.diameter}</td>
              <td>{el.climate}</td>
              <td>{el.gravity}</td>
              <td>{el.terrain}</td>
              <td>{el.surface_water}</td>
              <td>{el.population}</td>
              <td>{el.films}</td>
              <td>{el.created}</td>
              <td>{el.edited}</td>
              <td>{el.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
