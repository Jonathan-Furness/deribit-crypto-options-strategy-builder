import React, { useEffect, useState } from 'react';

import Selector from './selector.component';
import OptionsChainTable from './optionsChainTable.component';

const OptionsChain = (props) => {
  const ws = new WebSocket('wss://test.deribit.com/ws/api/v2');
  const [options, setOptions] = useState([]);
  // const [chainData, setChainData] = useState([]);
  const [dateSelected, setDateSelected] = useState(null);

  const msg = 
  {
    "jsonrpc" : "2.0",
    "id" : 7617,
    "method" : "public/get_instruments",
    "params" : {
      "currency" : "BTC",
      "kind" : "option",
      "expired" : false
    }
  };

  const getDates = () => (
    options
      .map(({expiration_timestamp}) => new Date(expiration_timestamp).toDateString())
      .sort ((a, b) => {
        const aDate = new Date(a);
        const bDate = new Date(b);
        return aDate - bDate
        })
      .filter((v, i, a) => a.indexOf(v) === i)
  )

  useEffect(() => {
    ws.onmessage = function (e) {
      // do something with the response...
      console.log(JSON.parse(e.data).result);
      setOptions(JSON.parse(e.data).result);
    };
    ws.onopen = function () {
        ws.send(JSON.stringify(msg));
    };
  }, [])

  return (
    <>
      <Selector items={getDates()} setSelected={setDateSelected} />
      <OptionsChainTable options={options} dateSelected={dateSelected} />
    </>
  )
}

export default OptionsChain;