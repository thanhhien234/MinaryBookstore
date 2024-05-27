import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBook, updateBook } from '../store/slices/bookSlice';
import './EditBook.css';
import ConditionRadioList from '../components/ConditionRadioList';
import { UploadBtn, UploadedImage } from '../components/UploadImage';
import { getCookie } from '../utils/cookieManage';
import { categoryList } from '../utils/sharedData';

function EditBook() {
  const { option, bookId } = useParams();
  const dispatch = useDispatch();
  const bookInfo = useSelector((state) => state.book);

  const [images, setImages] = useState([]);
  const [addressList, setAddressList] = useState([0]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let editUrl;
    if (option === 'sale') {
      editUrl = `${process.env.REACT_APP_API_URL}/api/bookForSale?id=${bookId}`;
    } else if (option === 'rent') {
      editUrl = `${process.env.REACT_APP_API_URL}/api/bookForRent?id=${bookId}`;
    }

    fetch(editUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
      })
      .then((res) => {
        dispatch(setBook(res));
        setImages(
          res.imageList.map((item, index) => ({
            id: item.id,
            position: index,
            fileUrl: item.url,
            fileObject: null,
          }))
        );
      })
      .catch((error) => alert(error.message));
  }, [bookId, option, dispatch]);


  const saveEditBook = () => {
    let url;
    if (option === 'sale') url = `${process.env.REACT_APP_API_URL}/api/bookForSale`;
    else if (option === 'rent') url = `${process.env.REACT_APP_API_URL}/api/bookForRent`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify(bookInfo),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('책 정보가 수정되었습니다.');
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleAddressSearch = async () => {
    setSelectedAddress(null);
    const addressInput = document.getElementById('addressInput').value.trim();
    if (addressInput === '') {
      alert('장소를 입력하세요.');
      return;
    }
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(addressInput)}`;
    await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 오류입니다. 잠시 후 다시 시도해주세요.');
        }
        return response.json();
      })
      .then((data) => {
        setAddressList(data.documents);
      })
      .catch((error) => alert(error.message));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleInputChange = (field, value) => {
    dispatch(updateBook({ [field]: value }));
  };

  if (!bookInfo) {
    return <div>Loading...</div>;
  }


  return (
    <div className="edit-main-container">
      <div className="edit-header-container">책 정보 수정하기</div>
      <div className="edit-book-content">
        <div className="edit-book-info">
          <div className="edit-book-title">{bookInfo.bookGetRes.title}</div>
          <div><span>ISBN</span>{bookInfo.bookGetRes.isbn}</div>
          <div><span>저자</span>{bookInfo.bookGetRes.author.join(' ,')}</div>
          <div><span>출판사</span>{bookInfo.bookGetRes.publisher}</div>
          <div><span>출판일</span>{formatDate(bookInfo.bookGetRes.publicationDate)}</div>
          <div><span>정가</span>{bookInfo.bookGetRes.price}원</div>
          <div>
            <span>판매가</span>
            <input
              type="number"
              id="salePrice"
              defaultValue={bookInfo.salePrice}
              onBlur={(e) => handleInputChange('salePrice', parseInt(e.target.value))}
            />
            원
          </div>
          <div>
            <span>카테고리</span>
            <select
              className="edit-category"
              value={bookInfo.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              {categoryList.map((category, index) => (
                <option key={index} value={category.name}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
        <img src={bookInfo.bookGetRes.img} alt="" />
      </div>
      <div className="book-condition-wrapper">
        <h3>책 상태가 어떤가요?</h3>
        {bookInfo.conditions.length > 0 && (
          <ConditionRadioList
            radioEditable={true}
            initialConditions={bookInfo.conditions}
            handleSelectedConditions={(conditions) => handleInputChange('conditions', conditions)}
          />
        )}
      </div>
      {option === 'rent' && (
        <div className="book-rent-period-wrapper">
          <h3>대여 가능 기간을 입력하세요</h3>
          <div className="rent-period-input">
            <div>
              <label htmlFor="fromTime">시작일: </label>
              <input
                type="date"
                id="fromTime"
                defaultValue={bookInfo.startDate}
                onChange={(event) => handleInputChange('startDate', event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="toTime">종료일:</label>
              <input
                type="date"
                id="toTime"
                defaultValue={bookInfo.endDate}
                onChange={(event) => handleInputChange('endDate', event.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="book-real-image-wrapper">
        <h3>실제 사진을 업로드하세요</h3>
        <div className="book-real-image-inner">
          {images.map((image, index) => (
            <UploadedImage
              key={index}
              position={index}
              uploadedImage={image.fileUrl}
              setImages={setImages}
              images={images}
            />
          ))}
          {images.length < 5 && (
            <UploadBtn position={images.length} images={images} setImages={setImages} />
          )}
        </div>
      </div>
      <div className="book-description-wrapper">
        <h3>추가 설명을 입력하세요</h3>
        <textarea
          id="descriptionInput"
          rows="6"
          cols="60"
          defaultValue={bookInfo.detail}
          onBlur={(e) => handleInputChange('detail', e.target.value)}
        />
      </div>
      <div className="book-sale-address-wrapper">
        <h3>거래 장소를 입력하세요</h3>
        <div className="book-address-input-wrapper">
          <input type="text" id="addressInput" defaultValue={bookInfo.address} />
          <img
            src={require('../assets/icons/search.png')}
            alt=""
            onClick={handleAddressSearch}
          />
        </div>
        {!selectedAddress && (
          <div className="book-address-list">
            {addressList.length > 0 ? (
              addressList.map((address, index) => (
                <div
                  key={index}
                  className="address-item"
                  onClick={() => {
                    setSelectedAddress(address);
                    handleInputChange('address', address.address_name);
                    handleInputChange('longitude', parseFloat(address.x));
                    handleInputChange('latitude', parseFloat(address.y));
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
      <button className="sale-save-btn" onClick={saveEditBook}>저장</button>
    </div>
  );
}

export default EditBook;
