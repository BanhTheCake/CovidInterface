import React from 'react';
import { Paper, Typography } from '@mui/material';
import CountUp from 'react-countup';

const typeColor = {
    infection: 'tomato',
    cure: '#10ac84',
    death: '#576574',
};

export default function CardInfo({ color, data, children }) {
    return (
        <Paper
            sx={{
                padding: '12px',
                borderLeft: `5px solid ${typeColor[color]}`,
            }}
            elevation={3}
        >
            <Typography variant="subtitle1" component="p">
                {children}
            </Typography>
            <Typography variant="subtitle2" component="p">
                <CountUp end={data || 0} duration={5} separator=" " />
            </Typography>
        </Paper>
    );
}
