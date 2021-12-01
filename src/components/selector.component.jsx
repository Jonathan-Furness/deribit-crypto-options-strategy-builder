import Reast, {useState, useEffect} from 'react';

const Selector = ({items, setSelected}) => {
  const [value, setValue] = useState(items[0])

  const valueChange = (e) => {
    setValue(e.target.value)
    setSelected(e.target.value)
  }

  return (
    <select onChange={valueChange} value={value}>
      {
        items.map(item => (
          <option value={item}>{item}</option>
        ))
      }
    </select>
  )
}

export default Selector;