import React, {useState,useEffect} from "react";
import './BookSale.css';
import ConditionRadioList from '../components/ConditionRadioList';
import UploadImage from "../components/UploadImage";

function BookSale() {
  const [activeTab, setActiveTab] = useState('isbn');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <input type="text" className="isbn-input" placeholder="ISBN 코드를 입력하세요" />
              <img src={require('../assets/icons/search.png')} alt="" className="isbn-search-icon" />
            </div>
            <div className="book-info-wrapper">
              <div className="book-info-inner">
                  <h2 className="book-title">한국어능력시험 HOT TOPIK 2: 읽기</h2>
                  <p><span className="label">ISBN</span><span id="isbn" className="info-value">9791186701355</span></p>
                  <p><span className="label">저자</span><span id="author" className="info-value">김순례,조민지</span></p>
                  <p><span className="label">출판사</span><span id="publisher" className="info-value">한글파크</span></p>
                  <p><span className="label">출판일</span><span id="publicationDate" className="info-value">2022년 1일 1월</span></p>
                  <p><span className="label">정가</span><span id="price" className="info-value">16800원</span></p>
              </div>
              <div className="book-cover">
                  <img src={require('../assets/images/exampleBook.png')} alt="" />
              </div>
            </div>
          </div>
        ) : (
          <div className="title-wrapper">
              <div className="form-group">
                <label htmlFor="titleInput">제목</label>
                <input type="text" id="titleInput"/>
              </div>
              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input type="text" id="isbn"/>
              </div>
              <div className="form-group">
                <label htmlFor="author">저자</label>
                <input type="text" id="author"/>
              </div>
              <div className="form-group">
                <label htmlFor="publisher">출판사</label>
                <input type="text" id="publisher"/>
              </div>
              <div className="form-group">
                <label htmlFor="publicationDate">출판일</label>
                <input type="text" id="publicationDate"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">정가</label>
                <input type="number" id="price"/>원
              </div>
              <div className="form-group">
                <label htmlFor="salePrice">판매가</label>
                <input type="number" id="salePrice"/>원
              </div>
          </div>
        )}
        <div className="book-condition-wrapper">
          <h3>책 상태가 어떤가요?</h3>
          <ConditionRadioList radioEditable={true}/>
        </div>
        {activeTab === 'isbn' && (
          <div className="book-price-wrapper">
            <h3>판매 가격을 입력해주세요</h3>
            <input type="number" className="price-input" placeholder="16800" />
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
export default BookSale;