import { useState } from 'react';

function BookMark(props) {
  const [click, setClick] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="북마크"
        className={
          click
            ? 'bg-bookmarkCheck ' + `${props.className}`
            : 'bg-bookmark ' + `${props.className}`
        }
        onClick={() => {
          setClick(!click);
        }}
      ></button>
    </>
  );
}

export default BookMark;
