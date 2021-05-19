import React from 'react';
import { InfoBox, InfoList, Warning, DetailBox } from '../StyleData/StyleData';

const DetailInfo = () => {
  return (
    <DetailBox>
      <InfoBox>
        {comment.map((text, index) => (
          <InfoList key={index}>
            {text}
            {index === comment.length - 1 && (
              <>
                <br />
                <Warning>
                  (선릉 외 지역, 음식과 관련 없는 내용, 영업이 종료된 맛집)
                </Warning>
              </>
            )}
          </InfoList>
        ))}
      </InfoBox>
    </DetailBox>
  );
};
const comment = [
  '일반적인 형태의 맛집만 등록할 수 있습니다.',
  '등록된 맛집은 무기한 등록되며, 재등록이 필요 없습니다.',
  '맛집의 정보가 정확하지 않거나 가이드에 맞지 않는 경우, 등록이 종료되고 정보수정을 요청드릴 수 있습니다.',
  '가입하지 않은 위코더는 맛집 등록을 할 수 없고, 먹방 회원으로 가입해야합니다.',
  '아래와 같은 맛집은 등록이 불가하며, 등록이 종료될 수 있습니다.',
];

export default DetailInfo;
