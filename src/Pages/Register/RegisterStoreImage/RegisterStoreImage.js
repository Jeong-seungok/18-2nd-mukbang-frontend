import React from 'react';
import {
  RegistImageBox,
  ImageBoxList,
  FormInput,
  ImageNumber,
  ImageTitle,
  FormButton,
} from '../StyleData/StyleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const RegisterStoreImage = ({ selectedFile, handleFileInput, removeFile }) => {
  return (
    <RegistImageBox>
      {Array(4)
        .fill(null)
        .map((e, index) => {
          const sortType = [
            { title: '가게 이미지', name: `store${index}` },
            { title: '전체 메뉴 이미지', name: 'allMenu' },
          ];
          const { title, name } = index !== 3 ? sortType[0] : sortType[1];
          const storeFile = selectedFile[name];
          return (
            <ImageBoxList>
              <ImageNumber>{index + 1}</ImageNumber>
              {storeFile === undefined ? (
                <>
                  <ImageTitle>{title}</ImageTitle>
                  <UploadBox>
                    +등록
                    <FormInput
                      type="file"
                      hidden
                      name={name}
                      onChange={handleFileInput}
                    />
                  </UploadBox>
                </>
              ) : (
                <>
                  <Preview src={storeFile.previewURL} alt="미리보기" />
                  <FormButton
                    className="imageBtn"
                    onClick={() => {
                      removeFile(name);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </FormButton>
                </>
              )}
            </ImageBoxList>
          );
        })}
    </RegistImageBox>
  );
};

export const UploadBox = styled.label`
  padding: 10px 8px;
  border: 1px solid #666;
  border-radius: 5px;
  font-size: 12px;
  background: #fff;
  text-align: center;
  cursor: pointer;
`;
export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default RegisterStoreImage;
