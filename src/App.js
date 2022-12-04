import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(1);
    const [coins, setCoins] = useState([]);
    const [money, setMoney] = useState(0);
    const onChangeInput = (event) => setMoney(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChangeSelect = (event) => {
        setSelected(parseInt(event.target.value));
    };
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
            {loading ? (
                <strong>loading...</strong>
            ) : (
                <div>
                    <select onChange={onChangeSelect}>
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.rank}>
                                {coin.name} ({coin.symbol}):{" "}
                                {coin.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                    <hr />
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={onChangeInput}
                            value={money === 0 ? "" : money}
                            type="number"
                            placeholder="Write your USD"
                        ></input>
                        <button>EXCHANGE</button>
                    </form>
                    <hr />
                    <h3>{money} USD</h3>
                    <h3>EQUALS</h3>
                    {coins.map((coin) => {
                        if (coin.rank === selected) {
                            return (
                                <h3 key={coin.id}>
                                    {money / coin.quotes.USD.price}{" "}
                                    {coin.symbol}
                                </h3>
                            );
                        }
                        return;
                    })}
                </div>
            )}
        </div>
    );
}

export default App;
