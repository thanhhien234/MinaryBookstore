import React, { useEffect } from "react";
import './UploadImage.css';
import { getCookie } from "../utils/cookieManage";

function UploadBtn({ position, setImages, images }) {
    const uploadImage = async (file, fileUrl) => {
        const formData = new FormData();
        formData.append('multipartFileList', file);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/image`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getCookie('accessToken')
            },
            body: formData
        });

        if (response.status === 200) {
            const result = await response.json();
            setImages(prevImages => [...prevImages, { id: result.imageIdList[0], position: images.length, fileUrl: fileUrl, fileObject: file }]);
        } else {
            throw new Error('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <div className="book-upload" onClick={() => document.getElementById(`uploadImg-${position}`).click()}>
            <input type="file" id={`uploadImg-${position}`} accept="image/*" style={{ display: "none" }}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            uploadImage(file, reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                    e.target.value = '';
                }} />
            <img className="add-icon" src={require('../assets/icons/add.png')} alt="Add" />
        </div>
    );
}

function UploadedImage({ position, uploadedImage, setImages ,images }) {
    const deleteImgs = async (imageId) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/image?imageIdList=${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + getCookie('accessToken')
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('삭제에 실패했습니다.');
          }
        })
        .catch(error => console.log(error.message));
      };
    return (
        <div className="book-img" style={{ backgroundImage: `url(${uploadedImage})` }}
                onClick={() => {
                    if (!uploadedImage) {
                        document.getElementById(`uploadImg-${position}`).click();
                    }
                }} >
                {uploadedImage &&
                    <img className="delete-icon" src={require('../assets/icons/delete.png')} alt="" onClick={()=>{
                        setImages(prevImages => prevImages.filter(image => image.position !== position));
                        if (images[position].id) deleteImgs(images[position].id);
                    }}/>
                }

        </div>
    );
}

export { UploadBtn, UploadedImage };
