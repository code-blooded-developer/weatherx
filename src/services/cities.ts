export const fetchCities = async (search: string) => {
  let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&type=locality&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;

  return await (await fetch(url)).json();
};
