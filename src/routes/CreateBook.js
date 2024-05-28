import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CreateBook.css';
import ConditionRadioList from '../components/ConditionRadioList';
import { UploadBtn, UploadedImage } from "../components/UploadImage";
import { categoryList } from '../utils/sharedData';
import { uploadImageApi } from '../api/imageApi';
import { setBookInfo, setAddressList, setSelectedAddress, updateData } from '../store/slices/createBookSlice';
import { isbnSearch, titleSearch, directInput } from '../api/getBookInfoApi';
import { searchAddressApi } from "../api/searchAddressApi";
import { postBookApi } from '../api/postBookApi';

function CreateBook() {
  const { option } = useParams();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const { bookInfo, addressList, selectedAddress, data } = useSelector(state => state.createBook);


  const resetForm = () => {
    const inputIds = ['book-search-input', 'title', 'isbn', 'author', 'publisher', 'publicationDate', 'price', 'category', 'salePrice', 'descriptionInput', 'addressInput'];
    inputIds.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.value = '';
      }
    });
    dispatch(setBookInfo(null));
    dispatch(updateData({ conditions: [1, 1, 1, 1, 1, 1] }));
    setImages([]);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (bookInfo) {
      const titleIp = document.getElementById('title')
      titleIp.value = bookInfo.title;
      titleIp.disabled = bookInfo.title !== null;

      const isbnIp = document.getElementById('isbn')
      isbnIp.value = bookInfo.isbn;
      isbnIp.disabled = bookInfo.isbn !== null;

      const authorIp = document.getElementById('author')
      authorIp.value = bookInfo.author
      authorIp.disabled = bookInfo.author.length !== 0;

      const publisherIp = document.getElementById('publisher')
      publisherIp.value = bookInfo.publisher
      publisherIp.disabled = bookInfo.publisher !== null;

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const publicationDateIp = document.getElementById('publicationDate')
      publicationDateIp.value = new Date(bookInfo.publicationDate).toLocaleDateString('ko-KR', options);
      publicationDateIp.disabled = bookInfo.publicationDate !== null;

      const priceIp = document.getElementById('price')
      priceIp.value = bookInfo.price;
      priceIp.disabled = bookInfo.price !== null;

      document.getElementById('image').src = bookInfo.img;
    }
  }, [bookInfo]);


  const postBook = (updatedData) => {
    let url;
    if (option === 'sale') {
      url = `${process.env.REACT_APP_API_URL}/api/bookForSale`;
    } else if (option === 'rent') {
      url = `${process.env.REACT_APP_API_URL}/api/bookForRent`;
    }
    postBookApi(url, updatedData)
  };

  const saveBook = async () => {
    if (!data.bookId) {
      directInput(data)
        .then(res => {
          dispatch(updateData({ bookId: res.id }));
        })
        .catch(error => alert(error.message));
    }
    else if (data.category === '') {
      alert('카테고리를 선택하세요.');
    }
    else if (isNaN(data.salePrice) || data.salePrice === '') {
      alert('판매가를 입력하세요.');
    }
    else if (images.length === 0) {
      alert('실제 사진을 업로드해주세요.');
    }
    else if (option === 'rent' && (!data.startDate || !data.endDate)) {
      alert('대여 가능 기간을 입력하세요.');
    }
    else if (!data.longitude || !data.latitude) {
      alert('거래 장소를 입력해주세요.');
    }
    else {
      uploadImageApi(images)
        .then(uploaded => {
          const updatedData = { ...data, imageIdList: uploaded.imageIdList };
          postBook(updatedData);
          resetForm();
        })
        .catch(error => alert(error.message));
    };
  };
  const handleAddressSearch = async () => {
    setSelectedAddress(null);
    const addressInput = document.getElementById('addressInput').value.trim();
    searchAddressApi(addressInput)
      .then(data => {
        dispatch(setAddressList(data.documents));
      })
      .catch(error => alert(error.message));
  };

  // useEffect(() => {
  //   console.log('MyData', data);
  // }, [data]);


  return (
    <div className="book-sale-main-container">
      <div className="book-sale-header-container"> 책 {option === 'sale' ? '판매' : (option === 'rent' ? '대여' : '요청')} 정보 등록하기</div>
      <div className="book-sale-content">
        <div className="book-search-wrapper">
          <input type="text" id="book-search-input" placeholder="ISBN 13자리 숫자나 제목을 입력하세요." />
          <img src={require('../assets/icons/search.png')} alt=""
            onClick={() => {
              const inputValue = document.getElementById('book-search-input').value.trim();
              if (inputValue === '') {
                alert('ISBN 13자리 숫자나 제목을 입력하세요.');
                return;
              }
              const isbnRegex = /^\d{13}$/;
              if (isbnRegex.test(inputValue)) {
                isbnSearch(inputValue)
                  .then(res => { dispatch(setBookInfo(res)); })
                  .catch(error => alert(error.message));
              } else {
                titleSearch(inputValue)
                  .then(res => { dispatch(setBookInfo(res)); })
                  .catch(error => alert(error.message));
              }
            }} />
        </div>
        <div className="book-info-wrapper">
          <div className="book-info-inner">
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input type="text" id="title" placeholder="예: 명품 웹 프로그래밍" onBlur={(e) => dispatch(updateData({ title: e.target.value }))} />
            </div>
            <div className="form-group">
              <label htmlFor="category">카테고리</label>
              <select className="category-input-select" id="category" onChange={(e) => dispatch(updateData({ category: e.target.value }))} style={{ color: data.category === '' ? '#c3c5c5' : 'black' }} >
                <option key='none' value='' >카테고리 선택하세요</option>
                {categoryList.map((category, index) => (
                  <option key={index} value={category.name}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input type="number" id="isbn" placeholder="예: 9788970505459"
                onBlur={(e) => {
                  const isbn = e.target.value.trim();
                  if (isbn.length !== 13 || !/^\d+$/.test(isbn)) {
                    alert('ISBN 13자리 숫자를 입력하세요. 예: 9788970505459');
                    e.target.value = '';
                  }
                }} />
            </div>
            <div className="form-group">
              <label htmlFor="author">저자</label>
              <input type="text" id="author" placeholder="예: 황기태, 민지숙" onBlur={(e) => dispatch(updateData({ author: e.target.value }))} />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">출판사</label>
              <input type="text" id="publisher" placeholder="예: 생능출판" onBlur={(e) => dispatch(updateData({ publisher: e.target.value }))} />
            </div>
            <div className="form-group">
              <label htmlFor="publicationDate">출판일</label>
              <input type="text" id="publicationDate" placeholder="예: 2022-02-10" maxLength="15"
                onBlur={(event) => {
                  const enteredDate = event.target.value;
                  const date = new Date(enteredDate);
                  if (!isNaN(date.getTime())) {
                    dispatch(updateData({ publicationDate: event.target.value }));
                  } else {
                    alert('올바른 날짜를 입력하세요. 예: 2022-02-10');
                    dispatch(updateData({ publicationDate: '' }));
                    event.target.value = '';
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">정가</label>
              <input type="number" id="price" placeholder="예: 30000" onBlur={(e) => dispatch(updateData({ price: e.target.value }))} />원
            </div>
            {option !== 'request' && (
              <div className="form-group">
                <label htmlFor="salePrice">{option === 'sale' ? '판매가' : '대여가'}</label>
                <input type="number" id="salePrice" placeholder="예: 10000" onBlur={(e) => dispatch(updateData({ salePrice: e.target.value }))} />원
              </div>
            )}
          </div>
          {bookInfo && (<img id="image" alt="" />)}
        </div>
        {option !== 'request' && (
          <div className="book-condition-wrapper">
            <h3>책 상태가 어떤가요?</h3>
            <ConditionRadioList radioEditable={true} initialConditions={[1, 1, 1, 1, 1, 1]}
              handleSelectedConditions={(conditions) => {
                dispatch(updateData({ conditions: conditions }));
              }} />
          </div>
        )}
        {option === 'rent' && (
          <div className="book-rent-period-wrapper">
            <h3>대여 가능 기간을 입력하세요</h3>
            <div className="rent-period-input">
              <div>
                <label htmlFor="fromTime">시작일: </label>
                <input type="date" id="fromTime" onChange={(event) => dispatch(updateData({ startDate: event.target.value }))} />
              </div>
              <div>
                <label htmlFor="toTime">종료일:</label>
                <input type="date" id="toTime" onChange={(event) => dispatch(updateData({ endDate: event.target.value }))} />
              </div>
            </div>
          </div>
        )}
        {option !== 'request' && (
          <div className="book-real-image-wrapper">
            <h3>실제 사진을 업로드하세요</h3>
            <div className="book-real-image-inner">
              {images.map((image, index) => (
                <UploadedImage
                  key={index}
                  position={index}
                  uploadedImage={image}
                  setImages={setImages}
                  setDeletedIds={() => { }}
                />
              ))}
              {images.length < 5 && (
                <UploadBtn
                  position={images.length}
                  images={images}
                  setImages={(newImages) => setImages(newImages)}
                />
              )}
            </div>
          </div>
        )}
        {option !== 'request' && (
          <div className="book-description-wrapper">
            <h3>추가 설명을 입력하세요</h3>
            <textarea id="descriptionInput" rows="6" cols="60" placeholder="내용을 입력하세요 (200자 이내)" onBlur={(e) => dispatch(updateData({ detail: e.target.value }))} />
          </div>
        )}
        {option !== 'request' && (
          <div className="book-sale-address-wrapper">
            <h3>거래 장소를 입력하세요</h3>
            <div className="book-address-input-wrapper">
              <input type="text" id="addressInput" placeholder="거래 장소를 입력하세요" />
              <img src={require('../assets/icons/search.png')} alt=""
                onClick={handleAddressSearch} />
            </div>
            {!selectedAddress && (
              <div className="book-address-list">
                {addressList.length > 0 ? (
                  addressList.map((address, index) => (
                    <div key={index} className="address-item"
                      onClick={() => {
                        dispatch(setSelectedAddress(address));
                        dispatch(updateData({
                          longitude: parseFloat(address.x),
                          latitude: parseFloat(address.y),
                          address: address.address_name
                        }));
                        document.getElementById('addressInput').value = address.address_name;
                      }}
                    >
                      <input type="radio" value={address.address_name} />
                      <span>{address.address_name}</span>
                    </div>
                  ))
                ) : (
                  <div className="address-item">검색 결과가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        )}
        <button className="sale-save-btn" onClick={saveBook}>저장</button>
      </div>
    </div>
  );
}
export default CreateBook;