import './App.css';
import {
    Container,
    Typography,
} from '@mui/material';
import moment from 'moment';
import 'moment/locale/vi';

import CountrySelect from './components/contrySelector/index';
import CardsInfo from './components/cardsInfo/index';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HighCharts from './components/highCharts/index'
import _ from 'lodash'

moment.locale('vi');
const day = moment().format('LLL');

function App() {
    const [country, setCountry] = useState('vietnam');
    const [countryInfo, setCountryInfo] = useState({});
    const [countryArray, setCountryArray] = useState([]);
    const [countrySelect, setCountrySelect] = useState([]);
    const [ISO2, setISO2] = useState('vn')

    useEffect(() => {
        axios
            .get('https://api.covid19api.com/countries')
            .then((res) => {
                const data = _.sortBy(res.data, ['Country'])
                setCountrySelect(data)
            });
    }, []);

    useEffect(() => {
        axios
            .get(`https://api.covid19api.com/dayone/country/${country}`)
            .then((res) => {
                const data = res.data;
                const lengthOfData = data.length;
                setCountryInfo(data[lengthOfData - 1]);
                setCountryArray(data)
            })
            .catch(err => console.log('err ', err))
    }, [country]);

    useEffect(() => {
      if (country && countrySelect.length > 0) {
        const currentCountry = countrySelect.find(item => item.Slug === country)
        setISO2(currentCountry.ISO2.toLowerCase())
      }
    }, [country, ISO2, countrySelect])

    return (
        <Container
            sx={{
                marginTop: 2,
            }}
        >
            <Typography variant="h4" component="h1">
                Số liệu COVID-19
            </Typography>
            <Typography variant="body1" component="h2" marginTop={1}>
                {day}
            </Typography>
            <CountrySelect
                countries={country}
                onChange={(e) => setCountry(e.target.value)}
                countrySelect={countrySelect}
            />
            <CardsInfo countryInfo={countryInfo} />
            <HighCharts countryArray={countryArray} country={country} ISO2={ISO2} />
        </Container>
    );
}

export default App;
