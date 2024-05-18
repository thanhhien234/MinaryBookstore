import React, {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import './CreateBook.css';
import ConditionRadioList from '../components/ConditionRadioList';
import {UploadBtn,UploadedImage} from "../components/UploadImage";
import { getCookie } from "../utils/cookieManage";

function CreateBook() {
  const { option } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [dateInput, setDateInput] = useState('');
  const [images, setImages] = useState([]);
  const categoryArr = ["소설", "인문", "컴퓨터/IT", "외국어", "역사/문화", "과학", "잡지", "어린이","자기개발","여행","요리", "기타"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const isbnSearch = (isbnValue) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/book/isbn?isbn=${isbnValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + getCookie('accessToken'),
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
        throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      }
    })
    .then(data => setBookInfo(data))
    .catch(error => alert(error.message));
  };
  const titleSearch = (titleValue) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/book/title?title=${titleValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + getCookie('accessToken'),
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
        throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
      }
    })
    .then(data => setBookInfo(data))
    .catch(error => alert(error.message));
  };


  const resetForm = () => {
      document.getElementById('title').value ='';
      document.getElementById('isbn').value = '';
      document.getElementById('author').value = '';
      document.getElementById('publisher').value = '';
      document.getElementById('publicationDate').value = '';
      document.getElementById('price').value = '';
      document.getElementById('category').value = '';
  };

  useEffect(() => {
      if (bookInfo) {
          document.getElementById('title').value = bookInfo.title;
          document.getElementById('isbn').value = bookInfo.isbn;
          document.getElementById('author').value = bookInfo.author.join(', ');
          document.getElementById('publisher').value = bookInfo.publisher;
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          document.getElementById('publicationDate').value = new Date(bookInfo.publicationDate).toLocaleDateString('ko-KR', options);
          document.getElementById('price').value = bookInfo.price;
          document.getElementById('image').src = bookInfo.img;
      }
  }, [bookInfo]);

  return (
    <div className="book-sale-main-container">
      <div className="book-sale-header-container"> 책 정보 등록하기</div>
      <div className="book-sale-content">
        <div className="book-search-wrapper">
          <input type="text" className="book-search-input" placeholder="ISBN 13자리 숫자나 제목을 입력하세요." onChange={resetForm}/>
          <img src={require('../assets/icons/search.png')} alt="" 
              onClick={() => {
                const inputValue = document.querySelector('.book-search-input').value.trim();
                if (inputValue === '') {
                  alert('ISBN 13자리 숫자나 제목을 입력하세요.');
                  return;
                }
                const isbnRegex = /^\d{13}$/;
                if (isbnRegex.test(inputValue)) {
                  isbnSearch(inputValue);
                } else {
                  titleSearch(inputValue);
                }
              }}/>
        </div>
        <div className="book-info-wrapper">
          <div className="book-info-inner">
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input type="text" id="title" placeholder="예: 명품 웹 프로그래밍" />
            </div>
            <div className="form-group">
              <label htmlFor="category">카테고리</label>
              <select className="category-input-select" id="category">
                    <option key='none' value=''>카테고리 선택하세요</option>
                    {categoryArr.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
              </select>
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
              <input type="text" id="publicationDate" placeholder="예: 2022-02-10" maxLength="10" value={dateInput}
                    onChange={(event)=> {
                      let value = event.target.value;
                      value = value.replace(/\D/g, "")
                      value = value.replace(/^(\d{4})(\d{1,2})/, "$1-$2");
                      value = value.replace(/^(\d{4}-\d{2})(\d{1,2})/, "$1-$2");
                      setDateInput(value);
                    }} />
            </div>
            <div className="form-group">
              <label htmlFor="price">정가</label>
              <input type="number" id="price" placeholder="예: 30000"/>원
            </div>
            <div className="form-group">
              <label htmlFor="salePrice">{option === 'sale' ? '판매가' : '대여가'}</label>
              <input type="number" id="salePrice" placeholder="예: 10000"/>원
            </div>  
          </div>
          {bookInfo && (<img id="image" alt="" />)}      
      </div>
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
        <div className="book-real-image-wrapper">
          <h3>실제 사진을 업로드하세요</h3>
          <div className="book-real-image-inner">
            {images.map(image => (
                <UploadedImage key={image.position} position={image.position} uploadedImage={image.file} setImages={setImages} />
            ))}
            {images.length < 5 && (
                <UploadBtn position={images.length} images={images} setImages={setImages} />
            )}
          </div>
        </div>
        <div className="book-description-wrapper">
          <h3>추가 설명을 적어주세요</h3>
          <textarea
            className="description-input"
            rows="6"
            cols="60"
            placeholder="내용을 입력하세요 (200자 이내)"
            id="description"
          />
        </div>
        <div className="book-sale-address-wrapper">
          <h3>거래 장소를 선택해주세요</h3>
          <div className="book-address-input-wrapper">
            <input
              type="text"
              className="address-input"
              placeholder="거래 장소를 입력해주세요"
              id="address"
            />
            <img src={require('../assets/icons/search.png')} alt=""/>
          </div>
        </div>
        <button className="sale-save-btn">저장</button>
      </div>
    </div>
  );
}
export default CreateBook;