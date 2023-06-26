import React from 'react';
import styled from 'styled-components';
import ImgUploadModal from './ImgUploadModal';

const Label = styled.label.attrs({
  htmlFor: 'input-file',
})`
  padding: 6px 25px;
  background-color: black;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const ImgUploadInput = styled.input.attrs({
  type: 'file',
  id: 'input-file',
})`
  display: none;
`;

const StoreImgUpload = () => {
  const [isOpened, setIsOpened] = React.useState(false); // 모달 토글

  <>
    <button>이미지업로드</button>
  </>;
};
export default StoreImgUpload;
