import { useEffect, useState } from 'react';
import './App.css';
import Quote from './components/Quote';

function App() {
    return (
        <div>
            <div>Hello QuoLike App</div>
            <Quote key="1" title="Quote 1" body="Body 1" />
            <Quote key="2" title="Quote 2" body="Body 2" />
        </div>
    );
    
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    setForecasts(data);
    //}
}

export default App;