import React, { useMemo, useState } from "react";
import { Filter } from "@/hooks/usePokemonList"; // Adjust the import path as needed
import { Switch } from "@/components/ui/switch";
import { Button } from "./button";
import Combobox from "./Combobox";
import { pokemonTypesWithColors } from "@/data/pokemonTypesWithColors";
// import { pokemonColors } from "@/data/pokemonsColor";
import { pokemonAbilities } from "@/data/pokemonAbilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FilterPokemonsProps {
  setFilter: (filter: Filter) => void;
}
const initialState: Filter = {
  name: "",
  id: "",
  type: "",
  gender: "",
  color: "",
  ability: "",
};

function FilterPokemons({ setFilter }: FilterPokemonsProps) {
  // Temporary state to hold input values before applying them
  const [filterState, setFilterState] = useState<Filter>(initialState);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);

  // Process input value to handle numeric and string values accordingly
  function processInputValue(value: string): string {
    if (/^0\d+$/.test(value)) {
      // If numeric with leading zeros
      return parseInt(value, 10).toString();
    } else if (/^\d+$/.test(value)) {
      // If purely numeric
      return value;
    } else {
      // For strings
      return value.toLowerCase().replace(/\s+/g, "-");
    }
  }

  // Handle changes in the input field for name/id
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processedValue = processInputValue(e.target.value);
    if (/^\d+$/.test(processedValue)) {
      setFilterState((prev) => ({ ...prev, id: processedValue, name: "" }));
    } else {
      setFilterState((prev) => ({ ...prev, name: processedValue, id: "" }));
    }
  };

  // Handle changes from Combobox components
  const handleComboboxChange = (field: keyof Filter, value: string) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  // Apply filters and reset state
  const applyFilters = () => {
    setFilter(filterState);
    setFilterState(initialState);
  };

  // Generate lists for Combobox components
  const generateComboboxList = (data: { name: string }[]) => {
    return data.map((item) => ({
      value: item.name,
      label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    }));
  };

  const typesList = useMemo(() => generateComboboxList(pokemonTypesWithColors), []);
  // const colorsList = useMemo(() => generateComboboxList(pokemonColors), []);
  const abilityList = useMemo(() => generateComboboxList(pokemonAbilities), []);

  // const genderList: ComboboxOption[] = [
  //   { value: "female", label: "Female" },
  //   { value: "male", label: "Male" },
  // ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-3/5 md:w-4/5 p-5  ">
        <img className="w-full" src="/utils/logos/Pokemon.svg" alt="Pokemon Logo" />
      </div>
      <div>
        <div className="flex flex-row	justify-between">
          <Label>
            {advancedFilter ? "Advanced: Filter by Name or ID" : "Basic: Filter by Name or ID"}
          </Label>
          <Switch
            checked={advancedFilter}
            onCheckedChange={() => setAdvancedFilter(!advancedFilter)}
          />
        </div>
        <div className="flex flex-row">
          <Input
            id="pokemonQueryFilter"
            type="text"
            value={filterState.name || filterState.id}
            onChange={handleQueryChange}
            placeholder="Type to filter..."
          ></Input>
          <Button className="ml-2 p-3" onClick={applyFilters}>
            🔍
          </Button>
          <Button className="ml-5" onClick={applyFilters}>
            Discover
          </Button>
        </div>
        {advancedFilter && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center p-3">
            {/* <Combobox
              onChange={(value) => handleComboboxChange("gender", value)}
              options={genderList}
              selectedValue={filterState.gender}
              label="Gender"
            /> */}
            <Combobox
              onChange={(value) => handleComboboxChange("type", value)}
              options={typesList}
              selectedValue={filterState.type}
              label="Type"
            />
            <Combobox
              onChange={(value) => handleComboboxChange("ability", value)}
              options={abilityList}
              selectedValue={filterState.ability}
              label="Ability"
            />
            {/* <Combobox
              onChange={(value) => handleComboboxChange("color", value)}
              options={colorsList}
              selectedValue={filterState.color}
              label="Color"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPokemons;
