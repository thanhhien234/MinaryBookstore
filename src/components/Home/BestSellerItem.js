import { Link } from 'react-router-dom';
import './BestSellerItem.css';

function BestSellerItem({ book, index }) {
    return (
        <li className="best-seller-item">
            <Link to={`/detail-book/${book.book.state}/${book.book.id}`} className='link'>
                <img src={book.book.image} alt="" />
                <h3 className="best-seller-item-title">{book.book.title}</h3>
                <h3 className="best-seller-item-count">{book.count}권</h3>
                <h3 className="best-seller-item-rank">Top {index + 1}</h3>
            </Link>
        </li >
    );
}
export default BestSellerItem;