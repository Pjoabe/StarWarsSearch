import React, { useEffect, useState } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [toFilter, setTofilter] = useState('');
  const [colum, setColum] = useState('population');
  const [toTreat, setToTreat] = useState('maior que');
  const [values, setValues] = useState(0);
  const [numberFilter, setNumberFilter] = useState(null);

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

  const treatConditions = (param) => {
    switch (param) {
    case 'maior que':
      setNumberFilter(filtered
        .filter((el) => (+el[colum] > +values)));
      break;
    case 'menor que':
      setNumberFilter(filtered
        .filter((el) => (+el[colum] < +values)));
      break;
    case 'igual a':
      setNumberFilter(filtered
        .filter((el) => (+el[colum] === +values)));
      break;
    default:
    }
  };
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ toFilter }
        onChange={ ({ target: { value } }) => setTofilter(value) }
      />
      <select
        data-testid="column-filter"
        value={ colum }
        onChange={ ({ target: { value } }) => setColum(value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ toTreat }
        onChange={ ({ target: { value } }) => setToTreat(value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ values }
        onChange={ ({ target: { value } }) => setValues(value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => treatConditions(toTreat) }
      >
        Filtrar
      </button>
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
          {data.length > 0 && numberFilter === null
           && filtered.map((el) => (
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
          {numberFilter !== null && numberFilter.map((el) => (
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
