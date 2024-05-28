import React from "react";
import './UploadImage.css';

function UploadBtn({ position, setImages, images }) {
    return (
        <div className="book-upload" onClick={() => document.getElementById(`uploadImg-${position}`).click()}>
            <input type="file" id={`uploadImg-${position}`} accept="image/*" style={{ display: "none" }}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            setImages(prevImages => [...prevImages, { id: null, position: images.length, fileUrl: reader.result, fileObject: file }]);
                        };
                        reader.readAsDataURL(file);
                    }
                    e.target.value = '';
                }} />
            <img className="add-icon" src={require('../../assets/icons/add.png')} alt="" />
        </div>
    );
}

function UploadedImage({ position, uploadedImage, setImages, setDeletedImages }) {
    return (
        <div className="book-img" style={{ backgroundImage: `url(${uploadedImage.fileUrl})` }}
            onClick={() => {
                if (!uploadedImage.fileUrl) {
                    document.getElementById(`uploadImg-${position}`).click();
                }
            }} >
            {uploadedImage.fileUrl &&
                <img className="delete-icon" src={require('../../assets/icons/delete.png')} alt="" onClick={() => {
                    setImages(prevImages => prevImages.filter(image => image.position !== position));
                    if (uploadedImage.id !== null) {
                        setDeletedImages(prevIds => [...prevIds, uploadedImage.id]);
                    }
                }} />
            }
        </div>
    );
}

export { UploadBtn, UploadedImage };