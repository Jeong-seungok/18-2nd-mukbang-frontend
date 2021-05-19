export const CreateMapMark = (kakao, map, mark, storeData) => {
  const {
    store_name,
    rating_average,
    category,
    store_images,
    sns_url,
  } = storeData;
  const data = {
    name: store_name,
    rate: rating_average,
    type: category,
    url: store_images,
    sns: sns_url,
  };
  // 오버레이 생성
  const overlayBox = document.createElement('div');
  const sliderBox = document.createElement('div');
  overlayBox.classList.add('overlayBox');
  sliderBox.className = 'slider';

  data.url.forEach(imageUrl => {
    const storeImage = document.createElement('img');
    storeImage.src = imageUrl;
    storeImage.alt = '가게 이미지';
    sliderBox.append(storeImage);
  });
  overlayBox.append(sliderBox);

  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  const storeDetail = document.createElement('div');
  prevBtn.className = 'prev';
  nextBtn.className = 'next';
  storeDetail.className = 'storeDetail';
  storeDetail.innerHTML = `
      <h2 class="title"><a href="${data.sns}" target="_blank">${
    data.name
  }</a></h2>
      <p class="detail">
        <span class="rate">${Number(data.rate).toFixed(1)}</span>
        <span class="type">${data.type}</span>
      </p>
    `;
  data.url.length > 0
    ? overlayBox.append(storeDetail, prevBtn, nextBtn)
    : overlayBox.append(storeDetail);

  const handleSlider = e => {
    const btnType = e.target.className;
    const imageUrls = data.url;
    const moveSize = sliderBox.offsetWidth / imageUrls.length;
    let leftValue = Number(sliderBox.style.left.split('px')[0]);

    if (btnType === 'prev') {
      leftValue += moveSize;
      leftValue <= 0 && (sliderBox.style.left = `${leftValue}px`);
    } else {
      leftValue -= moveSize;
      leftValue > sliderBox.offsetWidth * -1 &&
        (sliderBox.style.left = `${leftValue}px`);
    }
  };

  prevBtn.addEventListener('click', handleSlider);
  nextBtn.addEventListener('click', handleSlider);

  const overlay = new kakao.maps.CustomOverlay({
    content: overlayBox,
    clickable: true,
    position: mark.getPosition(),
    xAnchor: 0.5,
    yAnchor: 1.3,
    zIndex: 3,
  });

  const createOverlay = (overlay, map) => {
    return function () {
      overlay.getMap(map) === null ? overlay.setMap(map) : overlay.setMap(null);
    };
  };
  kakao.maps.event.addListener(mark, 'click', createOverlay(overlay, map));

  return overlay;
};
