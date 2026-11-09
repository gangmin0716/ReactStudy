import useCheerStore from './useCheerStore';

const CheerDisplay = () => {
  const {cheerCount} = useCheerStore();

  return (
    <>
      <h3>현재 응원: {cheerCount}회</h3>
    </>
  )
}

export default CheerDisplay;