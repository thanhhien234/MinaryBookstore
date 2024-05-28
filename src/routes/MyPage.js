import { useState, useEffect } from 'react';
import './MyPage.css';
import HistoryBookItem from '../components/HistoryBookItem';
import { getCookie } from '../utils/cookieManage';
import { useSelector } from 'react-redux';

function MyPage() {
    const [activeTab, setActiveTab] = useState('sale-tab');
    const [myList, setMyList] = useState([]);
    const [activeList, setActiveList] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/book/upload`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getCookie('accessToken') }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                setMyList(res);
            })
            .catch(error => console.log(error));
    }, [myList]);

    useEffect(() => {
        if (activeTab === 'sale-tab' && myList.bookForSaleGetResList) {
            setActiveList(myList.bookForSaleGetResList);
        } else if (activeTab === 'rent-tab' && myList.bookForRentGetResList) {
            setActiveList(myList.bookForRentGetResList);
        } else if (activeTab === 'request-tab' && myList.bookForRequestGetResList) {
            setActiveList(myList.bookForRequestGetResList);
        }
    }, [activeTab, myList]);

    useEffect(() => {
        console.log(activeList);
    }, [activeTab]);

    return (
        <div className='my-page-container'>
            <div className='user-container'>
                <img src={user.img} alt='' className='user-image' />
                <h3 className='user-info'>{user.name}</h3>
            </div>
            <div className='history-container'>
                <ul className='history-header'>
                    <li className={`tab ${activeTab === 'sale-tab' ? 'active' : ''}`} onClick={() => setActiveTab('sale-tab')}>판매</li>
                    <li className={`tab ${activeTab === 'rent-tab' ? 'active' : ''}`} onClick={() => setActiveTab('rent-tab')}>대여</li>
                    <li className={`tab ${activeTab === 'request-tab' ? 'active' : ''}`} onClick={() => setActiveTab('request-tab')}>요청</li>
                </ul>
                <ul className='history-list'>
                    {activeList.length > 0 ? (
                        activeList.map((item, index) => (
                            <HistoryBookItem key={index} book={item} option={activeTab} />
                        ))) : (
                        <div>기록이 없습니다.</div>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default MyPage;