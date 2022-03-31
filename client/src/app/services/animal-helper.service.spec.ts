import { getLatestCalving, getLatestMlp } from './animal-helper.service';
import { ICellRendererParams } from 'ag-grid-community';

describe('animalHelper', () => {
  it('should mlp give latest date', () => {
    const date = '2020-01-01';
    const date2 = '2011-02-22';
    const date3 = '2010-03-03';
    const params = {
      data: {
        milkPerformanceData: [{ date2 }, { date }, { date3 }],
      },
    } as ICellRendererParams;
    const latestMlp = getLatestMlp(params);

    expect(latestMlp.date).toBe(date);
  });

  it('should mlp not crash', () => {
    const params = {
      data: {
        milkPerformanceData: [],
      },
    } as ICellRendererParams;
    const latestMlp = getLatestMlp(params);

    expect(latestMlp).toBeUndefined();
  });

  it('should calving give latest date', () => {
    const date = '2020-01-01';
    const date2 = '2011-02-22';
    const date3 = '2010-03-03';
    const params = {
      data: {
        calvings: [{ birthdate: date2 }, { birthdate: date }, { birthdate: date3 }],
      },
    } as ICellRendererParams;
    const latestCalving = getLatestCalving(params);

    expect(latestCalving.birthdate).toBe(date);
  });

  it('should calving not crash', () => {
    const params = {
      data: {
        calvings: [],
      },
    } as ICellRendererParams;
    const latestCalving = getLatestCalving(params);

    expect(latestCalving).toBeUndefined();
  });
});
