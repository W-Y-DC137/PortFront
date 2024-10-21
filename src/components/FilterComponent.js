// FilterComponent.js
import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

const FilterComponent = ({ columns, filterValues, onFilter }) => {
    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
        setSelectedValue(''); // Reset value when column changes
    };

    const handleValueChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const applyFilter = () => {
        onFilter(selectedColumn, selectedValue);
    };

    return (
        <div>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Column</InputLabel>
                <Select
                    value={selectedColumn}
                    onChange={handleColumnChange}
                    label="Column"
                >
                    {columns.map((column) => (
                        <MenuItem key={column} value={column}>{column}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Value</InputLabel>
                <Select
                    value={selectedValue}
                    onChange={handleValueChange}
                    label="Value"
                >
                    {filterValues[selectedColumn]?.map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button onClick={applyFilter} variant="contained" color="primary">
                Apply Filter
            </Button>
        </div>
    );
};

export default FilterComponent;
