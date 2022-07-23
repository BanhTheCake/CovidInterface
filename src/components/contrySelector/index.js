import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

export default function CountrySelect({ countries, onChange, countrySelect }) {

    return (
        <FormControl
            sx={{ maxWidth: '300px', marginTop: 3 }}
            size="small"
            fullWidth
        >
            <InputLabel id="demo-simple-select-helper-label">
                Quốc gia
            </InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Quốc gia"
                value={countries}
                onChange={onChange}
            >
                {countrySelect &&
                    countrySelect.length > 0 &&
                    countrySelect.map((country, index) => {
                        return (
                            <MenuItem key={index} value={country.Slug}>
                                {country.Country}
                            </MenuItem>
                        );
                    })}
            </Select>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}
