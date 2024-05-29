import { Link } from 'react-router-dom';
import './PickItem.css';

function PickItem({ book }) {
  return (
    book.bookGetRes && (
      <Link to={`/detail-book/${book.id}`} className="interest-book-item">
        {book.bookGetRes.img ? (<img src={book.bookGetRes.img} alt="" />) : (<div className='no-img'>사진 없음</div>)}
        <div className="title">{book.bookGetRes.title}</div>
        <div className="price-wrapper">
          <div className="sale-price">{book.salePrice}원</div>
          <div className="price">{book.bookGetRes && book.bookGetRes.price}원</div>
        </div>
      </Link>
    )
  );
}
export default PickItem;