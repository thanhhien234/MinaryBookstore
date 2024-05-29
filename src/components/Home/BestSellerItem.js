import './BestSellerItem.css';

function BestSellerItem({ book, index }) {
    return (
        <li className="best-seller-item">
            <img src={book.book.image} alt="" />
            <h3 className="best-seller-item-title">{book.book.title}</h3>
            <h3 className="best-seller-item-title">ISBN: {book.book.isbn}</h3>
            <h3 className="best-seller-item-count">{book.count}권</h3>
            <h3 className="best-seller-item-rank">Top {index + 1}</h3>
        </li >
    );
}
export default BestSellerItem;