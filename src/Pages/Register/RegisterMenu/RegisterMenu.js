import React from 'react';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Preview, UploadBox } from '../RegisterStoreImage/RegisterStoreImage';
import {
  RegisterMenuBox,
  ImageBoxList,
  ImageTitle,
  FormInput,
  MenuDetailBox,
  MenuDetailList,
  MenuDetailSpan,
  FormButton,
  RegistImageBox,
  ImageNumber,
} from '../StyleData/StyleData';

const RegisterMenu = ({
  selectedFile,
  menuImageList,
  storeInput,
  handleStoreInput,
  handleFileInput,
  addMenu,
  removeMenu,
}) => {
  const menuFile = selectedFile['menu'];
  return (
    <>
      <RegisterMenuBox list={menuImageList.length === 0}>
        <ImageBoxList menu>
          {menuFile === undefined ? (
            <>
              <ImageTitle>메뉴 이미지</ImageTitle>
              <UploadBox>
                +등록
                <FormInput
                  name="menu"
                  type="file"
                  hidden
                  onChange={handleFileInput}
                />
              </UploadBox>
            </>
          ) : (
            <Preview src={menuFile.previewURL} alt="미리보기" />
          )}
        </ImageBoxList>
        <MenuDetailBox>
          {inputList.map((input, index) => (
            <MenuDetailList key={index}>
              <MenuDetailSpan className="mr5">{input.title}:</MenuDetailSpan>
              <FormInput
                type="text"
                className="text w50"
                name={input.name}
                value={storeInput[input.name]}
                placeholder="내용을 작성해주세요"
                onChange={handleStoreInput}
              />
              <MenuDetailSpan className="ml5">({input.sub})</MenuDetailSpan>
            </MenuDetailList>
          ))}
        </MenuDetailBox>
        <FormButton
          className="menuBtn"
          onClick={() => {
            menuFile === undefined
              ? alert('파일을 업로드해주세요.')
              : addMenu(menuFile.previewURL);
          }}
        >
          등록하기
        </FormButton>
      </RegisterMenuBox>
      <RegistImageBox className="menu" list={menuImageList.length}>
        {menuImageList?.map((list, index) => (
          <ImageBoxList key={index}>
            <ImageNumber>{index + 1}</ImageNumber>
            <PreviewImage src={list.preview} alt="미리보기" />
            <FormButton
              className="imageBtn"
              onClick={() => {
                removeMenu(index);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </FormButton>
          </ImageBoxList>
        ))}
      </RegistImageBox>
    </>
  );
};

const inputList = [
  { title: '이름', name: 'menuName', sub: '메뉴명' },
  { title: '가격', name: 'price', sub: '단위:원' },
];

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default RegisterMenu;
