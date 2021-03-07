import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState ([]);
  const [search, setSearch] = useState ('');

  useEffect (() => {
    //this is for getting the api
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    //this is like, it will import the API and then get the data
    .then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error));
    //this catch is if there is an error
  }, []);

  //this is for searching the value of the coin
  const handleChange = e => {
    setSearch(e.target.value);
  }

  //this is for filtering the search of the coin
  const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1>Cryptocurrency Tracker</h1>
        <h3 className="coin-text">Search a currency</h3>
        <form>
          <input type="text" placeholder="Search"
          className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.market_cap}
            price={coin.current_price}
          />
        );
        
      })}
    </div>
  );
}

export default App;
