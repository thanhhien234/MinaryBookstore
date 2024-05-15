import React, { useState } from "react";
import './UploadImage.css';

function UploadImage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
  
    return (
        <div className="book-img-input">
            <div className="input-img" style={{ backgroundImage: `url(${uploadedImage})` }}
                    onClick={() => {
                        if (!uploadedImage) {
                            document.getElementById('uploadImg').click();
                        }
                    }} >
                {uploadedImage && 
                    <img src={require('../assets/icons/delete.png')} alt="" className="delete-icon" onClick={()=>setUploadedImage(null)} />}
                {!uploadedImage && (
                    <React.Fragment>
                        <input type="file" id="uploadImg" accept="image/*" onChange={handleImageChange}/>
                        <img src={(require('../assets/icons/add.png'))} alt="" className="add-icon"/>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default UploadImage;
