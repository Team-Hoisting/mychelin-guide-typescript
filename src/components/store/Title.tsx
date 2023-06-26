import React from 'react';
import styled, { css } from 'styled-components';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ModalBox from '../common/ModalBox';
import userState from '../../recoil/atoms/userState';
import themeState from '../../recoil/atoms/themeState';
import ImgUploadModal from './ImgUploadModal';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
`;

const StoreTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.h2`
  margin-right: 12px;
`;

const Star = styled.img`
  width: 32px;
  margin: 4px;
  display: block;
`;

const StarContainer = styled.div`
  display: flex;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const bookmark = css`
  width: 40px;
  scale: 1.6;
  cursor: pointer;
`;

const EmtpyBookmarkIcon = styled(BsBookmark)`
  ${bookmark}

  :hover {
    color: #858585;
  }
`;

const FillBookMarkIcon = styled(BsFillBookmarkFill)`
  ${bookmark}

  color: #fe9602;
`;

const Header = ({ storeData: { storeName, storeId, starCnt }, addBookMark, deleteBookMark }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useRecoilValue(userState);

  const isUserVoted = user?.voteStatus.map(({ storeId }) => storeId).includes(storeId);
  const isUserArchived = user?.archived.map(({ storeId }) => storeId).includes(storeId);

  const handleAddArchiveClick = () => {
    if (!user) {
      navigate('/signin', { state: pathname });
      return;
    }
    addBookMark({ storeId, email: user?.email });
  };

  const handleDeleteArchiveClick = () => {
    deleteBookMark({ email: user?.email, storeId });
  };

  const theme = useRecoilValue(themeState);

  return (
    <Container>
      <StoreTitle>
        <TitleText>{storeName}</TitleText>
        <StarContainer>
          {[...Array(starCnt).keys()].map(val => (
            <Star key={val} src={`/images/star-${theme}.png`} />
          ))}
        </StarContainer>
      </StoreTitle>
      <Side>
        {isUserVoted && <ImgUploadModal user={user} />}
        <ModalBox storeId={storeId} width="120px" />
        {isUserArchived ? (
          <FillBookMarkIcon onClick={handleDeleteArchiveClick} />
        ) : (
          <EmtpyBookmarkIcon onClick={handleAddArchiveClick} />
        )}
      </Side>
    </Container>
  );
};

export default Header;
