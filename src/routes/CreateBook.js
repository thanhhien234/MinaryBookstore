import React, {useState,useEffect} from "react";
import './CreateBook.css';
import ConditionRadioList from '../components/ConditionRadioList';
import UploadImage from "../components/UploadImage";
import { useParams } from 'react-router-dom';
import { getCookie } from "../utils/cookieManage";

function CreateBook() {
  const { option } = useParams();
  const [activeTab, setActiveTab] = useState('isbn');
  const [isbnBookInfo, setIsbnBookInfo] = useState(null);
  const [isbn, setIsbn] = useState(''); 
  const [publicationDate, setPublicationDate] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const isbnSearch = () => {
    const isbnValue = document.querySelector('.isbn-input').value;
    if (isbnValue === '') {
      alert('ISBN 코드를 입력해주세요.');
      return;
    }
    else {
      setIsbn(document.querySelector('.isbn-input').value);
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/isbn?isbn=${isbnValue}`, {
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
      else if (response.status === 404) {
        alert('해당 도서가 없습니다. 다시 입력하세요.');
      }
      else{
        throw new Error();
      }
    })
    .then(data => {
      setIsbnBookInfo(data);
    })
    .catch(error => {
      alert('서버 오류입니다. 잠시 후 다시 시도해주세요.');
    });
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  }
  const handlePublicationDateChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{4})(\d{1,2})/, "$1-$2");
    value = value.replace(/^(\d{4}-\d{2})(\d{1,2})/, "$1-$2");
    setPublicationDate(value);
  };

  return (
    <div className="book-sale-main-container">
      <div className="book-sale-header-container">
        <div className={`book-sale-header ${activeTab==='isbn' ? 'active-tab':''}`} onClick={()=>setActiveTab('isbn')}>ISBN 코드로 입력</div>
        <div className={`book-sale-header ${activeTab==='title' ? 'active-tab':''}`} onClick={()=>setActiveTab('title')}>수동으로 입력</div>
      </div>
      <div className="book-sale-content">
        {activeTab === 'isbn' ? (
          <div className="isbn-wrapper">
            <div className="isbn-input-wrapper">
              <input type="number" className="isbn-input" placeholder="ISBN 코드를 입력하세요" />
              <img src={require('../assets/icons/search.png')} alt="" className="isbn-search-icon" onClick={isbnSearch}/>
            </div>
            {isbn && isbnBookInfo && (
              <div className="book-info-wrapper">
                  <div className="book-info-inner">
                      <h2 className="book-title">{isbnBookInfo.title}</h2>
                      <p><span className="label">ISBN</span><span id="isbn" className="info-value">{isbn}</span></p>
                      <p><span className="label">저자</span><span id="author" className="info-value">{isbnBookInfo.author.join(', ')}</span></p>
                      <p><span className="label">출판사</span><span id="publisher" className="info-value">{isbnBookInfo.publisher}</span></p>
                      <p><span className="label">출판일</span><span id="publicationDate" className="info-value">{formatDate(isbnBookInfo.publicationDate)}</span></p>
                      <p><span className="label">정가</span><span id="price" className="info-value">{isbnBookInfo.price}원</span></p>
                  </div>
                <div className="book-cover">
                    <img src={isbnBookInfo.img} alt="" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="title-wrapper">
              <div className="form-group">
                <label htmlFor="titleInput">제목</label>
                <input type="text" id="titleInput" placeholder="예: 명품 웹 프로그래밍"/>
              </div>
              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input type="number" id="isbn" placeholder="예: 9788970505459"/>
              </div>
              <div className="form-group">
                <label htmlFor="author">저자</label>
                <input type="text" id="author" placeholder="예: 황기태"/>
              </div>
              <div className="form-group">
                <label htmlFor="publisher">출판사</label>
                <input type="text" id="publisher" placeholder="예: 생능출판"/>
              </div>
              <div className="form-group">
                <label htmlFor="publicationDate">출판일</label>
                <input type="text" id="publicationDate" placeholder="예: 2022-02-10" value={publicationDate} onChange={handlePublicationDateChange} maxLength="10"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">정가</label>
                <input type="number" id="price" placeholder="예: 30000"/>원
              </div>
              <div className="form-group">
                <label htmlFor="salePrice">{option === 'sell' ? '판매가' : '대여가'}</label>
                <input type="number" id="salePrice" placeholder="예: 20000"/>원
              </div>              
          </div>
        )}
        <div className="book-condition-wrapper">
          <h3>책 상태가 어떤가요?</h3>
          <ConditionRadioList radioEditable={true}/>
        </div>
        {option === 'rent' && (
          <div className="book-rent-period-wrapper">
            <h3>대여 가능 기간을 입력하세요</h3>
            <div className="rent-period-input">
              <div>
                <label htmlFor="fromTime">시작일: </label>
                <input type="date" id="fromTime" />
              </div>
              <div>
                <label htmlFor="toTime">종료일:</label>
                <input type="date" id="toTime" />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'isbn' && (
          <div className="book-price-wrapper">
            {option === 'sale' ? (<h3>판매 가격을 입력해주세요</h3>) : (<h3>대여 가격을 입력해주세요</h3>)}
            <input type="number" className="price-input" placeholder={isbnBookInfo ? isbnBookInfo.price : ""} />
            <span>원</span>
          </div>
        )}
        <div className="book-real-image-wrapper">
          <h3>실제 사진을 업로드하세요</h3>
          <div className="book-real-image-inner">
            <UploadImage />
        </div>
        </div>
        <div className="book-description-wrapper">
          <h3>추가 설명을 적어주세요</h3>
          <textarea className="description-input" rows='6' cols='60' placeholder="내용을 입력하세요 (200자 이내)" />
        </div>
        <div className="book-sale-address-wrapper">
          <h3>거래 장소를 선택해주세요</h3>
          <div className="book-address-input-wrapper">
            <input type="text" className="address-input" placeholder="거래 장소를 입력해주세요" />
            <img src={require('../assets/icons/search.png')} alt="" className="location-icon" />
          </div>
        </div>
        <button className="sale-save-btn">저장</button>
      </div>
    </div>
  );
}
export default CreateBook;