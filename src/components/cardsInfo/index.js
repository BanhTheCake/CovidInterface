import React from 'react';
import { Grid } from '@mui/material';
import CardInfo from '../cardInfo';

export default function CardsInfo({ countryInfo }) {
    return (
        <Grid sx={{ marginTop: 1 }} container spacing={3}>
            <Grid item xs={12} md={4}>
                <CardInfo color={'infection'} data={countryInfo && countryInfo.Active}>Số Ca Nhiễm</CardInfo>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardInfo color={'cure'} data={countryInfo && countryInfo.Recovered}>Số Ca Khỏi</CardInfo>
            </Grid>
            <Grid item xs={12} md={4}>
                <CardInfo color={'death'} data={countryInfo && countryInfo.Deaths}>Tử Vong</CardInfo>
            </Grid>
        </Grid>
    );
}
