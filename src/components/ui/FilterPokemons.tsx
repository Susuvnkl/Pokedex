import React, { useEffect, useMemo, useState } from "react";
import { Filter, usePokemonList } from "@/hooks/usePokemonList";
import { Switch } from "@/components/ui/switch";
import { Button } from "./button";
import Combobox, { ComboboxOption } from "./Combobox";
import { pokemonTypesWithColors } from "@/data/pokemonTypesWithColors";
import { pokemonAbilities } from "@/data/pokemonAbilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePokemonContext } from "@/context/PokemonContext";
import { pokemonColors } from "@/data/pokemonsColor";

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
  const [inputValues, setInputValues] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false);
  const { pokemons } = usePokemonList(filterState);
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
      setInputValues({ id: processedValue, name: "" });
    } else {
      setInputValues({ name: processedValue, id: "" });
    }
  };

  const handleComboboxChange = (field: keyof Filter, value: string) => {
    setFilterState({ ...initialState, [field]: value });
  };

  const applyFilters = () => {
    if (inputValues.id === "" && inputValues.name === "") {
      setFilterState(initialState);
    } else setFilterState({ ...initialState, ...inputValues });
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
  const colorsList = useMemo(() => generateComboboxList(pokemonColors), []);
  const abilityList = useMemo(() => generateComboboxList(pokemonAbilities), []);

  const genderList: ComboboxOption[] = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-3/5 md:w-4/5 p-5  ">
        <img className="w-full" src="/utils/logos/Pokemon.svg" alt="Pokemon Logo" />
      </div>
      <div className="flex flex-row	justify-center align-center pb-3">
        <Label className="pt-1 pr-1 stroke-black stroke-2">Advanced Filter </Label>
        <Switch
          checked={advancedFilter}
          onCheckedChange={() => setAdvancedFilter(!advancedFilter)}
        />
      </div>
      {advancedFilter ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 justify-items-center pb-3">
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
          <Combobox
            onChange={(value) => handleComboboxChange("color", value)}
            options={colorsList}
            selectedValue={filterState.color}
            label="Color"
          />
          <Combobox
            onChange={(value) => handleComboboxChange("gender", value)}
            options={genderList}
            selectedValue={filterState.gender}
            label="Gender"
          />
        </div>
      ) : (
        <div className="justify-items-center pb-3">
          <Combobox
            onChange={(value) => handleComboboxChange("type", value)}
            options={typesList}
            selectedValue={filterState.type}
            label="Type"
          />
        </div>
      )}
      <div>
        <div className="flex flex-row pb-5">
          <Input
            id="pokemonQueryFilter"
            type="text"
            value={inputValues.name || inputValues.id}
            onChange={handleQueryChange}
            placeholder="Type to filter..."
          ></Input>
          <Button className="ml-2 p-3" onClick={applyFilters}>
            🔍
          </Button>
          <Button disabled className="ml-5" onClick={applyFilters}>
            Discover
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterPokemons;
