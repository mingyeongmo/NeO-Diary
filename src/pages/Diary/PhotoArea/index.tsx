import React from "react";
import { Delete, Edit } from "components/Icon/Icons";
import styled from "styled-components";
import useDiary from "hooks/useDiary";

const PhotoArea = () => {
  const { handleFileRemove, onFileChange, fileInputRef, file, imgFile } =
    useDiary();
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
        {file && (
          <>
            <AttachFileBtn htmlFor="file">
              <Edit />
            </AttachFileBtn>
            <RemoveFileBtn onClick={handleFileRemove}>
              <Delete />
            </RemoveFileBtn>
          </>
        )}
        <AttachFileInput
          onChange={onFileChange}
          ref={fileInputRef}
          required
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
        {file ? (
          <PreviewImage src={imgFile} alt="preview" />
        ) : (
          <AttachFileBtn as="label" htmlFor="file">
            <NoneImage>사진을 넣어주세요</NoneImage>
          </AttachFileBtn>
        )}
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

const RemoveFileBtn = styled.label`
  cursor: pointer;
  margin-left: 10px;
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

const NoneImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #dedede;
`;

export default PhotoArea;
