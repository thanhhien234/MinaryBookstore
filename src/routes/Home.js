import { useState, useEffect } from "react";
import './Home.css'
import BookItem from "../components/BookItem";
import PickItem from "../components/PickItem";
import CreateBtn from "../components/CreateBtn";
import CategoryWrapper from "../components/CategoryWrapper";
import BestSellersList from "../components/BestSellersList";
import { getCookie } from "../utils/cookieManage";
import { statusList, bestSellersCategories } from '../utils/sharedData';
import useInterestBookList from "../hooks/useInterestBookList";

function Home() {
    const [categoryShow, setCategoryShow] = useState(false);
    const [bestSellersCategory, setBestSellersCategory] = useState('NOVEL');
    const [activeStatus, setActiveStatus] = useState('');
    const [homeBookList, setHomeBookList] = useState([]);
    const [bestSellersList, setBestSellersList] = useState([]);
    const interestList = useInterestBookList();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                setHomeBookList(prevHomeBookList => [...prevHomeBookList, ...res]);
            })
            .catch(error => console.log(error));

        fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                setHomeBookList(prevHomeBookList => [...prevHomeBookList, ...res]);
                const shuffledList = res.sort(() => Math.random() - 0.5);
                setHomeBookList(shuffledList.slice(0, 6));
            })
            .catch(error => console.log(error))
    }, []);



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/list?category=${bestSellersCategory}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('서버 오류');
                }
            })
            .then(res => {
                setBestSellersList(res.slice(0, 5));
            })
            .catch(error => console.log(error));
    }, [bestSellersCategory]);


    return (
        <div className="main-container">
            <div className="home-book-list-container">
                <div className="sorting-container">
                    {statusList.map((status, index) => (
                        <button key={index}
                            className={`all-btn ${activeStatus === status.name ? 'activeStatus' : ''}`}
                            onClick={() => {
                                if (activeStatus === status.name) {
                                    setActiveStatus('');
                                } else {
                                    setActiveStatus(status.name);
                                }
                                setCategoryShow(!categoryShow);
                            }}
                        >
                            {status.label}
                        </button>
                    ))}
                    {categoryShow && <CategoryWrapper activeStatus={activeStatus} />}
                </div>
                <div className="home-book-list-content">
                    <ul className="home-book-list-wrapper">
                        {homeBookList.slice(0, 6).map((book, index) => (
                            <BookItem key={index} book={book} />
                        ))}
                    </ul>
                </div>
            </div>

            <div className="best-sellers-container">
                <h3 className="best-sellers-title">
                    Lat<span>e</span>st B<span>o</span>o<span>k</span>s
                </h3>
                <div className="best-sellers-category-wrapper">
                    {bestSellersCategories.map((item, index) => (
                        <button
                            key={index}
                            className={`best-sellers-btn ${bestSellersCategory === item.name ? 'active' : ''}`}
                            onMouseOver={() => setBestSellersCategory(item.name)}>
                            {item.label}
                        </button>
                    ))}
                </div>
                {bestSellersCategory && <BestSellersList bestSellersList={bestSellersList} />}
            </div>

            <div className="interest-container">
                <div className="intro-wrapper">
                    <h3 className="intro-title">P<span>i</span>ck<span>s</span></h3>
                    <div className="intro-content">요즘 어떤 책에 관심을 가지고 계신가요?</div>
                    {/* <button className="show-more-btn">더보기</button> */}
                </div>
                <div className="interest-wrapper">
                    <ul className="interest-book-wrapper">
                        {interestList.slice(0, 5).map((book, index) => (
                            <PickItem key={index} book={book} />
                        ))}
                    </ul>
                </div>
            </div>
            <CreateBtn />
        </div>
    );
}

export default Home;
