import { Country } from '@prisma/client';

export const getCountryName = (
  countryId: string,
  countries: Country[]
): string => {
  const country = countries?.find((country) => country.id === countryId);
  return country?.name ?? '';
};
