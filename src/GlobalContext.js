import { createContext, useState } from 'react';

export const GlobalContext = createContext();

const ConverToText = category => {
  const totalCateogory = [...category.first, ...category.second];
  const CovertCategory = totalCateogory
    .map((select, index) => (select ? storeCategory[index] : false))
    .filter(Boolean);
  if (category.first[0] && !category.second[0]) {
    CovertCategory.shift();
    CovertCategory.unshift(...storeCategory.slice(1, 6));
  } else if (CovertCategory.filter(e => e === '전체').length === 2)
    CovertCategory.length = 0;
  else if (category.second[0]) {
    CovertCategory.pop();
    CovertCategory.push(...storeCategory.slice(7, storeCategory.length));
  }
  return CovertCategory;
};

const GlobalProvider = ({ children }) => {
  const [price, setPrice] = useState([0, 20000]);
  const [category, setCategory] = useState({
    first: Array(6).fill(false),
    second: Array(7).fill(false),
  });
  const [mapInstance, setMapInstance] = useState(null);
  const [markList, setMarkList] = useState([]);
  const [overlayList, setOverlayList] = useState([]);

  const handleReset = selectOption => {
    selectOption === 1
      ? setPrice([0, 20000])
      : setCategory({
          ...category,
          first: Array(6).fill(false),
          second: Array(7).fill(false),
        });
  };

  const handleCategorySubOrAll = (target, saveType, targetCategory, name) => {
    const nowCheck = targetCategory.filter(Boolean).length;
    const nowSub = targetCategory[Number(target - 1)];
    return nowCheck === targetCategory.length - 2 && !nowSub
      ? setCategory({ ...category, [name]: saveType[0] })
      : setCategory({ ...category, [name]: saveType[1] });
  };

  const checkCategory = (index, target) => {
    const name = ['first', 'second'];
    const targetCategory = index === 0 ? category.first : category.second;
    const saveType = [
      targetCategory.map((select, index) => (index === 0 ? !select : false)),
      targetCategory.map((select, index) =>
        index === 0 ? false : index + 1 === Number(target) ? !select : select
      ),
    ];
    const targetCondition = Number(target) === 1;

    targetCondition
      ? setCategory({ ...category, [name[index]]: saveType[0] })
      : handleCategorySubOrAll(target, saveType, targetCategory, name[index]);
  };

  const handlePrice = changePrice => {
    setPrice(changePrice);
  };

  const handleMarkList = (MarkList, OverlayList) => {
    setMarkList(MarkList);
    setOverlayList(OverlayList);
  };

  const priceQuery = price.map(price => `&price_range=${price}`).join('');
  const categoryQuery = ConverToText(category)
    ?.map(category => `&category=${category}`)
    .join('');

  const value = {
    query: { priceQuery, categoryQuery },
    filter: { price, category },
    map: { mapInstance, markList, overlayList },
    filterAction: {
      handleReset,
      handlePrice,
      checkCategory,
    },
    mapAction: {
      setMapInstance,
      handleMarkList,
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
const { Consumer: GlobalConsumer } = GlobalContext;
export { GlobalProvider, GlobalConsumer };

const storeCategory = [
  '전체',
  '베이커리',
  '카페',
  '패스트푸드',
  '분식',
  '치킨',
  '전체',
  '한식',
  '일식',
  '중식',
  '퓨전',
  '양식/레스토랑',
  '기타주점',
];
