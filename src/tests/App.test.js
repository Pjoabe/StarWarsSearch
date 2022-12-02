import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Tests the app component', () => {
  const name = 'Naboo'
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => jest.clearAllTimers());

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

    userEvent.type(valueFilter, '2200');

    expect(valueFilter).toHaveValue(2200);

    const filterButton = getByTestId('button-filter');

    expect(filterButton).toBeDefined();

    userEvent.click(filterButton)

    const filterTable = await findByRole('table');
    expect(filterTable).toBeDefined();

    const naboo = await findByRole('cell', { name: name });

    expect(naboo).toBeDefined();

    const dinameter = await findByRole('cell', { name: /12120/i });
    expect(dinameter).toBeDefined();

    const rotation = await findByRole('cell', { name: /26/i });
    expect(rotation).toBeDefined();

    const orbital = await findByRole('cell', { name: /312/i });
    expect(orbital).toBeDefined();
  });
});