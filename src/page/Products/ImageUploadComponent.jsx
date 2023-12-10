import React, { useState } from "react";

const ImageUploadComponent = () => {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    // console.log(formData);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer 164c788c0ef1dd125cf23359fb295e7c",
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(
          `Upload successful. Image URLs: ${result.data.image.url}`
        );
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImageUploadComponent;
