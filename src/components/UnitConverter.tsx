import React, { useState } from 'react';

type UnitCategory = 'Length' | 'Mass' | 'Volume' | 'Temperature' | 'Pressure';

const units: Record<UnitCategory, string[]> = {
  Length: ['meters', 'feet', 'inches', 'miles', 'kilometers'],
  Mass: ['kg', 'lbs', 'grams', 'ounces'],
  Volume: ['liters', 'gallons', 'milliliters', 'cups'],
  Temperature: ['celsius', 'fahrenheit', 'kelvin'],
  Pressure: ['pascal', 'psi', 'bar', 'atm'],
};

const conversionFactors: Record<string, number> = {
  meters: 1, feet: 3.28084, inches: 39.3701, miles: 0.000621371, kilometers: 0.001,
  kg: 1, lbs: 2.20462, grams: 1000, ounces: 35.274,
  liters: 1, gallons: 0.264172, milliliters: 1000, cups: 4.22675,
  pascal: 1, psi: 0.000145038, bar: 0.00001, atm: 0.00000986923,
};

export const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<UnitCategory>('Length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const convert = (val: number, from: string, to: string) => {
    if (category === 'Temperature') {
      let celsius = 0;
      if (from === 'celsius') celsius = val;
      else if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9;
      else if (from === 'kelvin') celsius = val - 273.15;

      if (to === 'celsius') return celsius;
      if (to === 'fahrenheit') return (celsius * 9 / 5) + 32;
      if (to === 'kelvin') return celsius + 273.15;
      return val;
    }
    return val * (conversionFactors[to] / conversionFactors[from]);
  };

  const result = !isNaN(parseFloat(value)) ? convert(parseFloat(value), fromUnit, toUnit).toFixed(4) : '0.0000';

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as UnitCategory;
    setCategory(newCategory);
    setFromUnit(units[newCategory][0]);
    setToUnit(units[newCategory][1]);
  }

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Unit Converter</h3>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <select value={category} onChange={handleCategoryChange} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
          {Object.keys(units).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        <div className="flex gap-2">
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring flex-1">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring flex-1">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xl font-bold">Result: {result} {toUnit}</p>
    </div>
  );
};
