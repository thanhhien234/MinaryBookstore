import { useState } from 'react';
import { getCookie } from '../utils/cookieManage';

function useInterestBookList() {
  const [interestList, setInterestList] = useState([]);

  fetch(`${process.env.REACT_APP_API_URL}/api/book/save`, {
    headers: { 'Authorization': 'Bearer ' + getCookie('accessToken') }
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(res => {
      setInterestList([...res.bookForRentGetResList, ...res.bookForSaleGetResList])
    })
    .catch(error => console.log(error));

  return interestList;
}

export default useInterestBookList;
