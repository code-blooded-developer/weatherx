import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AutoComplete } from "antd";
import type { SelectProps } from "antd/es/select";

import useDebounce from "@/hooks/use-debounce";

import { fetchCities } from "@/services/cities";

import { fetchWeather } from "@/store/fetchWeather";
import { AppDispatch } from "@/store/store";

import {
  SearchBarContainer,
  StyledSearchOutlined,
  StyledAimOutlined,
  StyledInput,
} from "./styled";

import "antd/dist/reset.css";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState<SelectProps<object>["options"]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  const fetchPlaces = useCallback(async () => {
    const cities = await fetchCities(debouncedSearchTerm);
    const massagedCities = cities.map((city) => {
      return {
        label: `${city.city}, ${city.state}, ${city.country}`,
        value: `${city.city}`,
        key: `${city.city}-${city.state}`,
      };
    });
    setPlaces(massagedCities);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length) {
      fetchPlaces();
    }
  }, [debouncedSearchTerm, fetchPlaces]);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          fetchWeather({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onCityChange = (city: string) => {
    setSearchTerm(city);
  };

  const onCitySelect = (city: string) => {
    dispatch(fetchWeather(city));
  };

  return (
    <SearchBarContainer>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: "100%" }}
        options={places}
        onSearch={onCityChange}
        onSelect={onCitySelect}
      >
        <StyledInput
          placeholder="Search location"
          size="large"
          prefix={<StyledSearchOutlined />}
          suffix={<StyledAimOutlined onClick={fetchLocation} />}
          value={searchTerm}
        />
      </AutoComplete>
    </SearchBarContainer>
  );
};

export default SearchBar;
