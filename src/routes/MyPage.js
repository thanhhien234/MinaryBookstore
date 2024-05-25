import { useState, useEffect } from 'react';
import './MyPage.css';
import HistoryBookItem from '../components/HistoryBookItem';
import { getCookie } from '../utils/cookieManage';

function MyPage() {
  const [activeTab, setActiveTab] = useState('sale-tab');
  const [myList, setMyList] = useState([]);

  const getMyBookList = async (myBookId) => {
    let getMyBookListUrl;
    if(activeTab === 'rent-tab') getMyBookListUrl = `${process.env.REACT_APP_API_URL}/api/bookForRent?id=${myBookId}`;
    else if(activeTab === 'sale-tab') getMyBookListUrl = `${process.env.REACT_APP_API_URL}/api/bookForSale?id=${myBookId}`;
    await fetch(getMyBookListUrl,{
        method: 'GET',
        headers:{
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
    .then(response => {
        if (response.status === 200) {
        return response.json();
        }
    })
    .then(res => {
        if(res.editable){
            setMyList((prev) => [...prev, res]);
        }
    })
    .catch(error => console.log(error));
  }

  const renderData = async() => {
    setMyList([]);
    let urlSearch;
    if(activeTab === 'sale-tab') urlSearch = `${process.env.REACT_APP_API_URL}/api/bookForSale/list`;
    else if(activeTab === 'rent-tab') urlSearch = `${process.env.REACT_APP_API_URL}/api/bookForRent/list`;
    await fetch(urlSearch,{
        method: 'GET',
        headers:{
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then((res) => {
        if (res && res.length > 0) { 
            for (let i = 0; i < res.length; i++) {
                    getMyBookList(res[i].id);
            }
        }
    })    
    .catch(error => console.log(error));
 }

    // useEffect(() => {
    //     console.log('mylist', myList);
    // },[myList]);

    useEffect(() => {
        renderData();
    },[activeTab]);

  return(
    <div className='my-page-container'>
        <div className='user-container'>
            <img src={require('../assets/images/profile-image.png')} alt='' className='user-image'/>
            <h3 className='user-info'>한승규</h3>
        </div>
        <div className='history-container'>
            <ul className='history-header'>
                <li className={`tab ${activeTab === 'sale-tab' ? 'active' : ''}`} onClick={()=>setActiveTab('sale-tab')}>판매</li>
                <li className={`tab ${activeTab === 'rent-tab' ? 'active' : ''}`} onClick={()=>setActiveTab('rent-tab')}>대여</li>
            </ul>
            <ul className='history-list'>
                {myList.length > 0 ? (
                    myList.map((item, index) => (
                        <HistoryBookItem key={index} book={item} status={activeTab} renderData={renderData}/>
                ))) : (
                    <div>기록이 없습니다.</div>
                )}
            </ul>
        </div>
    </div>
  );
}
export default MyPage;