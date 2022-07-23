import React, { useEffect, useState } from 'react';
import BarChart from '../barChart/BarChart';
import MapChart from '../MapChart/MapChart';
import { Grid } from '@mui/material';
import axios from 'axios';

export default function HighCharts({ countryArray, country, ISO2 }) {

    const [mapData, setMapData] = useState({});

    useEffect(() => {
       if (country) {
            axios.get(`https://code.highcharts.com/mapdata/countries/${ISO2}/${ISO2}-all.geo.json`)
                .then(res => setMapData(res.data))
       }
    }, [country, ISO2]);

    return (
        <Grid sx={{ marginTop: 1 }} container spacing={3}>
            <Grid item md={8} xs={12}>
                <BarChart countryArray={countryArray} />
            </Grid>
            <Grid item md={4} xs={12}>
                <MapChart mapData={mapData} />
            </Grid>
        </Grid>
    );
}
