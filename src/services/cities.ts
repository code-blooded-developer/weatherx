import { City } from "@/types/city";
import uniqWith from "lodash/uniqWith";

export const fetchCities = async (search: string) => {
  let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&type=locality&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;

  return transformCities(await (await fetch(url)).json());
};

const transformCities = (res: any): City[] => {
  const cities: City[] = [];
  res.features.forEach((feature: any) => {
    if (
      feature.properties &&
      feature.properties.city &&
      feature.properties.state &&
      feature.properties.country
    ) {
      const { city, state, country } = feature.properties;
      cities.push({
        city,
        state,
        country,
      });
    }
  });
  return uniqWith(
    cities,
    (cityA: City, cityB: City) => cityA.city === cityB.city
  );
};
