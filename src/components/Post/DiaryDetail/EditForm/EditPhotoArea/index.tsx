import React, { useRef, useState } from "react";
import { Edit } from "components/Icon/Icons";
import styled from "styled-components";

interface EditPhotoAreaProps {
  photo: string;
}

const EditPhotoArea = ({ photo }: EditPhotoAreaProps) => {
  const [editPhoto, setEditPhoto] = useState(photo);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PhotoAreaContainer>
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <AttachFileBtn htmlFor="file">
          <Edit />
        </AttachFileBtn>
        <AttachFileInput
          onChange={onFileChange}
          ref={fileInputRef}
          // required
          type="file"
          id="file"
          accept="image/*"
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          flex: 9,
          overflow: "hidden",
        }}
      >
        {editPhoto && <PreviewImage src={editPhoto} alt="preview" />}
      </div>
    </PhotoAreaContainer>
  );
};

const PhotoAreaContainer = styled.div`
  width: auto;
  height: 350px;
  min-height: 350px;
  margin: 0 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AttachFileBtn = styled.label`
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;
export default EditPhotoArea;
