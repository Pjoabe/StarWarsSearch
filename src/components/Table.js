import React, { useEffect, useState } from 'react';

function Table() {
  const [sortType, setSortType] = useState('');
  const [test, setTest] = useState(0);
  const [arraySort, setArraySort] = useState([]);
  const [filterRight, setFilterRight] = useState([]);
  const [selecType, setSelectType] = useState('population');
  const [data, setData] = useState([]);
  const [colum, setColum] = useState('population');
  const [totreat, setToTreat] = useState('maior que');
  const [values, setValues] = useState(0);
  const [numberFilter, setNumberFilter] = useState(null);
  const orbitalPeriod = 'orbital_period';
  const rotationPeriod = 'rotation_period';
  const waterSurface = 'surface_water';
  const [options, setOptions] = useState(['population', orbitalPeriod, 'diameter',
    rotationPeriod, waterSurface]);

  const apiFetch = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const json = await request.json();
    const apiData = json.results;
    setData(apiData);
    setFilterRight(apiData);
  };

  useEffect(() => {
    apiFetch();
  }, []);

  const filtered = ({ target: { value } }) => setFilterRight(data
    .filter(({ name }) => name.includes(value)));

  const treatConditions = (param) => {
    switch (param) {
    case 'maior que':
      if (numberFilter === null) {
        setNumberFilter(filterRight
          .filter((el) => +el[colum] > +values));
      } else {
        setNumberFilter(numberFilter
          .filter((el) => +el[colum] > +values));
      }
      break;
    case 'menor que':
      if (numberFilter === null) {
        setNumberFilter(filterRight
          .filter((el) => +el[colum] < +values));
      } else {
        setNumberFilter(numberFilter
          .filter((el) => +el[colum] < +values));
      }
      break;
    case 'igual a':
      if (numberFilter === null) {
        setNumberFilter(filterRight
          .filter((el) => +el[colum] === +values));
      } else {
        setNumberFilter(numberFilter
          .filter((el) => +el[colum] === +values));
      }
      break;
    default:
    }
    setOptions(options.filter((el) => el !== colum));
    setColum('population');
  };
  const arrayTypeStyle = (parem) => {
    if (numberFilter === null) {
      return setFilterRight(parem);
    }
    return setNumberFilter(parem);
  };
  const arrayType = () => {
    let tantoFaz = [];
    if (numberFilter === null) {
      tantoFaz = filterRight;
      return tantoFaz;
    }
    tantoFaz = numberFilter;
    return tantoFaz;
  };
  const makeOrder = () => {
    const ONE = -1;
    if (sortType === 'ASC') {
      return setArraySort(arrayType().sort((a, b) => {
        if (b[selecType] === 'unknown') return ONE;

        return +a[selecType] - +b[selecType];
      }));
    }
    if (sortType === 'DESC') {
      return setArraySort(arrayType().sort((a, b) => {
        if (b[selecType] === 'unknown') return ONE;
        return +b[selecType] - +a[selecType];
      }));
    }
  };
  useEffect(() => {
    arrayTypeStyle(arraySort);
  }, [test]);

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ filtered }
      />
      <select
        data-testid="column-filter"
        value={ colum }
        onChange={ ({ target: { value } }) => setColum(value) }
      >
        {options.length > 0
        && options
          .map((el) => (
            <option key={ el } value={ el }>{el}</option>
          ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ totreat }
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
        onClick={ () => treatConditions(totreat) }
      >
        Filtrar
      </button>
      <select
        name="column-sort"
        data-testid="column-sort"
        onChange={ ({ target: { value } }) => setSelectType(value) }
      >
        <option value="population">population</option>
        <option value="rotation_period">rotation_period</option>
        <option value="orbital_period">orbital_period</option>
        <option value="surface_water">surface_water</option>
        <option value="diameter">diameter</option>
      </select>
      Ascendente
      <input
        type="radio"
        value="ASC"
        data-testid="column-sort-input-asc"
        name="sort"
        onChange={ ({ target: { value } }) => setSortType(value) }
      />
      Descendente
      <input
        type="radio"
        value="DESC"
        data-testid="column-sort-input-desc"
        name="sort"
        onChange={ ({ target: { value } }) => setSortType(value) }
      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          makeOrder();
          const FIVE_HUNDRED = 500;
          setTimeout(() => {
            setTest(test + 1);
          }, FIVE_HUNDRED);
        } }
      >
        Ordernar
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
           && filterRight.map((el) => (
             <tr key={ el.name }>
               <td data-testid="planet-name">{el.name}</td>
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
              <td data-testid="planet-name">{el.name}</td>
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
