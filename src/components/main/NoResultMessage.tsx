import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { searchInputState } from '../../recoil/atoms';

const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 500px;
`;

const SearchmapPageDirector = styled.span`
  font-style: italic;
  text-decoration: underline;
`;

const NoMatchingSearchInput = styled.span`
  font-weight: 700;
`;

const NoResultMessage = () => {
  const searchInput = useRecoilValue(searchInputState);

  return (
    <NoResultContainer>
      <p>
        <NoMatchingSearchInput>{`'${searchInput}'`}</NoMatchingSearchInput>에 해당하는 결과가 없습니다.
      </p>
      <Link to={`/searchmap?keyword=${searchInput}`}>
        <SearchmapPageDirector>새로운 가게를 추가하고 최초 투표자가 되어보세요!</SearchmapPageDirector>
      </Link>
    </NoResultContainer>
  );
};

export default NoResultMessage;
