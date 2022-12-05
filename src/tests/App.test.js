import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Tests the app component', () => {
const name = 'Naboo';

  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  it('test the letter search filter', async () => {
    const { getByTestId, findByRole } = render(<App />);
    const nameFilter = getByTestId('name-filter');

    expect(nameFilter).toBeDefined();

    const columnFilter = getByTestId('column-filter');

    expect(columnFilter).toBeDefined();

    const comparisonFilter = getByTestId('comparison-filter');

    expect(comparisonFilter).toBeDefined();

    const valueFilter = getByTestId('value-filter');

    expect(valueFilter).toBeDefined();

    const table = await findByRole('table');

    expect(table).toBeDefined();

    userEvent.type(nameFilter, 'o');

    expect(nameFilter).toHaveValue('o');

    const selectCollum = getByTestId('column-filter');

    userEvent.selectOptions(selectCollum, 'diameter')

    const comparison = getByTestId('comparison-filter');

    userEvent.selectOptions(comparison, 'maior que')

    userEvent.type(valueFilter, '2000');
    
    expect(valueFilter).toHaveValue(2000);

    const filterButton = getByTestId('button-filter');

    expect(filterButton).toBeDefined();

    userEvent.click(filterButton)

    const filterTable = await findByRole('table');
    expect(filterTable).toBeDefined();

  });

 
  it('test if another forms of search work correctly ', async () => {
    const { getByTestId, findByRole } = render(<App />);

    const columnFilter = getByTestId('column-filter');

    expect(columnFilter).toBeDefined();

    userEvent.selectOptions(columnFilter, 'rotation_period');

    const comparisonFilter = getByTestId('comparison-filter');

    expect(comparisonFilter).toBeDefined();

    userEvent.selectOptions(comparisonFilter, 'maior que');

    const valueFilter = getByTestId('value-filter');

    expect(valueFilter).toBeDefined();

    userEvent.type(valueFilter, '10');

    const table = await findByRole('table');

    expect(table).toBeDefined();

    const filterButton = getByTestId('button-filter');

    expect(filterButton).toBeDefined();

    act(() => userEvent.click(filterButton));

    userEvent.selectOptions(columnFilter, 'diameter');
    
    userEvent.selectOptions(comparisonFilter, 'menor que');
    
    userEvent.type(valueFilter, '10400');
    
    act(() => userEvent.click(filterButton));

    userEvent.selectOptions(columnFilter, 'population');

    userEvent.selectOptions(comparisonFilter, 'igual a');

    userEvent.type(valueFilter, '10000');
  })
  it('test the order button', async ()=>{
    const { findByText, findByTestId } = render(<App />) 

    const tatooine = await findByText(/Tatooine/i)

    const endor = await findByText(/Endor/i)

    const orderButton = await findByTestId('column-sort-button');

    userEvent.click(orderButton)

    expect(tatooine).toBeDefined();

    expect(endor).toBeDefined();

  })
  it(' test the sort radio buttons activity "ASC && DESC"', async ()=> {
   const {getByTestId, findAllByTestId } = render(<App />);
   
    const cSID = getByTestId('column-sort-input-desc');

    userEvent.click(cSID)

    const orderButton = getByTestId('column-sort-button');

    userEvent.click(orderButton)

    const planetName = await findAllByTestId('planet-name')

    expect(planetName[0]).toHaveTextContent('Tatooine');

    const cSIA = getByTestId('column-sort-input-asc');

    userEvent.click(cSIA)

    const orderButton2 = getByTestId('column-sort-button');

    userEvent.click(orderButton2)
    
  })

});