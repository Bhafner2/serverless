import { ICellRendererParams } from 'ag-grid-community';
import { CalvingDto, MilkPerformanceDataDto } from '../gen';
import { sortBy } from 'lodash';

export function getLatestMlp(params: ICellRendererParams): MilkPerformanceDataDto {
  let mlp;
  const mpd = params?.data?.milkPerformanceData;
  if (mpd && mpd.length > 0) {
    mlp = sortBy(mpd, (c) => -new Date(c.date))[0];
  }
  return mlp;
}

export function getLatestCalving(params: ICellRendererParams): CalvingDto {
  let calving;
  const calvings = params?.data?.calvings;
  if (calvings && calvings.length > 0) {
    calving = sortBy(calvings, (c) => -new Date(c.birthdate))[0];
  }
  return calving;
}

export function getLatestCalvingBirthdate(params: ICellRendererParams): string | undefined {
  const calving = getLatestCalving(params);
  if (calving && calving.birthdate) {
    return calving.birthdate;
  }
  return undefined;
}
