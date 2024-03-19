import React, { useEffect, useMemo, useState } from "react";
import { Filter, usePokemonList } from "@/hooks/usePokemonList";
import { Switch } from "@/components/ui/switch";
import { Button } from "./button";
import Combobox from "./Combobox";
import { pokemonTypesWithColors } from "@/data/pokemonTypesWithColors";
import { pokemonAbilities } from "@/data/pokemonAbilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePokemonContext } from "@/context/PokemonContext";
import { useGetPokemons } from "@/hooks/useGetPokemons";

const initialState: Filter = {
  name: "",
  id: "",
  type: "",
  gender: "",
  color: "",
  ability: "",
};

function FilterPokemons() {
  const [filterState, setFilterState] = useState<Filter>(initialState);
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const { pokemons } = usePokemonList(filterState);
  const { reset } = useGetPokemons();
  const { setPokemons } = usePokemonContext();

  function processInputValue(value: string): string {
    if (/^0\d+$/.test(value)) {
      return parseInt(value, 10).toString();
    } else if (/^\d+$/.test(value)) {
      return value;
    } else {
      return value.toLowerCase().replace(/\s+/g, "-");
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const processedValue = processInputValue(e.target.value);
    if (/^\d+$/.test(processedValue)) {
      setFilterState((prev) => ({ ...prev, id: processedValue, name: "" }));
    } else {
      setFilterState((prev) => ({ ...prev, name: processedValue, id: "" }));
    }
  };

  const handleComboboxChange = (field: keyof Filter, value: string) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
    reset();
  };

  const applyFilters = () => {
    reset();
    setFilterState(initialState);
  };

  const generateComboboxList = (data: { name: string }[]) => {
    return data.map((item) => ({
      value: item.name,
      label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    }));
  };

  useEffect(() => {
    if (pokemons) {
      setPokemons(pokemons);
    }
  }, [pokemons, setPokemons]);

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
        <div className="flex flex-row px-3">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 justify-items-center p-3">
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
