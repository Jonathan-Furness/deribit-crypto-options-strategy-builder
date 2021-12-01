import React from 'react';

const OptionsChainTable = ({options, dateSelected}) => {
  return (
    <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Strike</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          { 
            options.length > 0 ? 
            options
            .sort( (a, b) => {
              const aDate = new Date(a.expiration_timestamp);
              const bDate = new Date(b.expiration_timestamp);
              return aDate - bDate
            })
            .sort( (a, b) => b.strike - a.strike)
            .filter( ({expiration_timestamp}) => new Date(expiration_timestamp).toDateString() == dateSelected)
            .map(({instrument_name, strike, expiration_timestamp}) => (
              <tr>
                <td>{instrument_name}</td>
                <td>{strike}</td>
                <td>{new Date(expiration_timestamp).toDateString()}</td>
              </tr>
            )): 
            null
          }
        </tbody>
      </table>
  )
}

export default OptionsChainTable;