import { useState, useEffect, useContext } from "react";
import './Home.css'
import BookItem from "../components/BookItem";
import PickItem from "../components/PickItem";
import CreateBtn from "../components/CreateBtn";
import CategoryWrapper from "../components/CategoryWrapper";
import BestSellersList from "../components/BestSellersList";
import { statusList, bestSellersCategories } from '../utils/sharedData';
import { getInterestBookApi } from '../api/getInterestBookApi';
import { getCookie } from '../utils/cookieManage';

function Home() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [categoryShow, setCategoryShow] = useState(false);
    const [bestSellersCategory, setBestSellersCategory] = useState('NOVEL');
    const [activeStatus, setActiveStatus] = useState('');
    const [homeBookList, setHomeBookList] = useState([]);
    const [bestSellersList, setBestSellersList] = useState([]);
    const [interestList, setInterestList] = useState([]);
    const [allBook, setAllBook] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (getCookie("accessToken")) setLoggedIn(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/bookForSale/list`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                setAllBook(prevAllBook => [...prevAllBook, ...res]);
            })
            .catch(error => console.log(error));

        fetch(`${process.env.REACT_APP_API_URL}/api/bookForRent/list`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(res => {
                setAllBook(prevAllBook => [...prevAllBook, ...res]);
            })
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        const shuffledList = allBook.sort(() => Math.random() - 0.5);
        setHomeBookList(shuffledList.slice(0, 6));
    }, [allBook]);


    useEffect(() => {
        const bestList = allBook.filter(book => book.category === bestSellersCategory);
        setBestSellersList(bestList.slice(0, 5));
    }, [bestSellersCategory, allBook]);

    useEffect(() => {
        getInterestBookApi()
            .then(res => {
                setInterestList([...res.bookForRentGetResList, ...res.bookForSaleGetResList])
            })
            .catch(error => console.log(error));
    }, []);

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

            {loggedIn && (
                <div className="interest-container">
                    <div className="intro-wrapper">
                        <h3 className="intro-title">P<span>i</span>ck<span>s</span></h3>
                        <div className="intro-content">요즘 어떤 책에 관심을 가지고 계신가요?</div>
                    </div>
                    <div className="interest-wrapper">
                        <ul className="interest-book-wrapper">
                            {interestList.slice(0, 5).map((book, index) => (
                                <PickItem key={index} book={book} />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {loggedIn && <CreateBtn />}

        </div>
    );
}

export default Home;
