import React from 'react';
import {
  InfoBox,
  InfoList,
  DetailBox,
  FormTable,
} from '../StyleData/StyleData';

const ImageInfo = () => {
  return (
    <FormTable>
      <DetailBox>
        <InfoBox>
          {comment.map((text, index) => {
            const redColor = index > 2;
            return (
              <InfoList key={index} redColor={redColor}>
                {text}
              </InfoList>
            );
          })}
        </InfoBox>
      </DetailBox>
    </FormTable>
  );
};

const comment = [
  '사진은 최소 2장 최대 4장 까지 등록할 수 있습니다.',
  '아래에 등록 버튼을 클릭하여 사진을 등록할 수도 있습니다.',
  '직접 찍은 실제 가게 사진의 원본을 등록해야 합니다.',
  '워터마크, 날짜, 전화번호 등이 포함된 사진이나 가게와 관련없는 사진을 등록할 경우 등록이 삭제될 수 있습니다.',
];

export default ImageInfo;
