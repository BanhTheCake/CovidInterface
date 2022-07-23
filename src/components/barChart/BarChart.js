import React, { useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Stack, Button } from '@mui/material';

const setOptions = (data = []) => {
    const categories = data.map((item) =>
        moment(item.Date).format('DD/MM/YYYY')
    );

    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Tổng ca nhiễm',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Tổng Ca nhiễm',
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};

export default function BarChart({ countryArray }) {

    const [dataCharts, setDataCharts] = useState([]);

    const [dateSelect, setDateSelect] = useState('All');

    useEffect(() => {
        let data = []
        if (dateSelect && dateSelect === 'All') {
            const countryArrayCopy = countryArray.length > 365 ? countryArray.splice(countryArray.length - 365) : countryArray
            data = setOptions(countryArrayCopy);
        }
        if (dateSelect && dateSelect === '30') {
            const countryArray30Day = countryArray.splice(countryArray.length - 30);
            data = setOptions(countryArray30Day);
        }
        if (dateSelect && dateSelect === '7') {
            const countryArray7Day = countryArray.splice(countryArray.length - 7);
            data = setOptions(countryArray7Day);
        }
        setDataCharts(data);
    }, [countryArray, dateSelect]);

    return (
        <>
            <Stack
                sx={{ display: 'flex', justifyContent: {xs: 'center', md: 'flex-end'}, marginBottom: 2 }}
                spacing={2}
                direction="row"
            >
                <Button
                    color="error"
                    variant={dateSelect === 'All' ? 'contained' : 'outlined'}
                    onClick={() => setDateSelect('All')}
                >
                    Tất cả
                </Button>
                <Button
                    color="error"
                    variant={dateSelect === '30' ? 'contained' : 'outlined'}
                    onClick={() => setDateSelect('30')}
                >
                    30 ngày
                </Button>
                <Button
                    color="error"
                    variant={dateSelect === '7' ? 'contained' : 'outlined'}
                    onClick={() => setDateSelect('7')}
                >
                    7 ngày
                </Button>
            </Stack>
            <HighchartsReact highcharts={Highcharts} options={dataCharts} />
        </>
    );
}
