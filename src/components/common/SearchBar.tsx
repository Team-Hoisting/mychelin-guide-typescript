/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { SyntheticEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchInputState, categoryState } from '../../recoil/atoms';
import { fetchSearchedStores } from '../../api/stores';
import { useDebounce, useOnClickOutside } from '../../hooks/index.js';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
`;

const Bar = styled.input`
  width: ${({ width }) => width};
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--border-primary);
  padding: 15px;
  background-color: var(--bg-color);
  color: var(--font-color);

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  background-color: #d21312;
  position: relative;
  right: 35px;
  top: 5px;
  padding: 7px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

const SearchIcon = styled(AiOutlineArrowRight)`
  color: #fff;
`;

const Dropdown = styled.ul`
  list-style-type: none;
  padding: 5px;
  display: flex;
  width: 500px;
  max-height: 350px;
  flex-direction: column;
  position: absolute;
  top: 30px;
  border: 1px solid #ababab;
  border-radius: 15px;
  background-color: var(--bg-secondary-color);
  overflow-y: scroll;
`;

const DropdownResult = styled.li`
  padding: 10px;
  font-size: 18px;
  border-bottom: 0.5px solid #e8e8e8;

  :last-of-type {
    border-bottom: none;
  }

  :hover {
    color: var(--primary-color);
  }

  :focus {
    outline: 1px solid #e8e8e8;
    color: var(--primary-color);
  }
`;

const NoMatch = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const NoMatchMessage = styled.p`
  margin: 0;
  font-weight: 300;
`;

const RegisterSuggestion = styled.p`
  margin: 10px 0 0 0;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;

  :hover {
    font-weight: 500;
  }
`;

interface SearchBarProps {
  hasDropdown: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  width?: string;
  submitHandler?: null | (() => void);
  placeholder?: string;
  defaultValue?: string;
}

const SearchBar = ({
  hasDropdown,
  inputRef,
  width = '500px',
  submitHandler = null,
  placeholder = '맛집을 검색해보세요!',
  defaultValue = '',
}: SearchBarProps) => {
  const [dropdownStores, setDropdownStores] = React.useState([]);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const dropdownRef = useOnClickOutside(() => setOpenDropdown(false));
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategory = useSetRecoilState(categoryState);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearchSubmit = async () => {
    const userSearch = inputRef.current?.value.trim();

    if (!userSearch) return;

    setSearchInput(userSearch);
    if (pathname !== '/') navigate('/');

    setCategory('AL00');
    setOpenDropdown(false);
  };

  const handleSearchChange = async (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const userSearch = e.target.value.trim();

    if (!userSearch) {
      setOpenDropdown(false);
      setSearchInput('');

      return;
    }

    const fetched = await fetchSearchedStores(userSearch);

    setOpenDropdown(true);
    setDropdownStores(fetched);
  };

  const debouncedSearchHandler = useDebounce(handleSearchChange, 330);

  const handleRefocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) debouncedSearchHandler(e);
  };

  const alterFocus = (e: React.KeyboardEvent<HTMLLIElement>, storeId: string) => {
    e.preventDefault();

    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab' && e.key !== 'Enter') return;

    if (e.key === 'Enter') {
      navigate(`/store/${storeId}`);

      setOpenDropdown(false);
    }

    const currentActive = document.activeElement;

    if (e.key === 'ArrowUp') {
      if (currentActive?.previousElementSibling) (currentActive.previousElementSibling as HTMLElement)?.focus();
      else (currentActive?.parentElement?.lastElementChild as HTMLElement)?.focus();
    }

    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      if (currentActive?.nextElementSibling) (currentActive.nextElementSibling as HTMLElement)?.focus();
      else (currentActive?.parentElement?.firstElementChild as HTMLElement)?.focus();
    }
  };

  return (
    <Container>
      <SearchForm
        onSubmit={e => {
          e.preventDefault();

          if (submitHandler) submitHandler();
          else handleSearchSubmit();
        }}>
        <Bar
          width={width}
          placeholder={placeholder}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={debouncedSearchHandler}
          onFocus={handleRefocus}
        />
        <SearchButton tabIndex={1}>
          <SearchIcon />
        </SearchButton>
      </SearchForm>
      {hasDropdown && openDropdown && (
        <Dropdown ref={dropdownRef}>
          {dropdownStores.length ? (
            dropdownStores.map(({ storeName, storeId }) => (
              <DropdownResult key={storeName} tabIndex={0} onKeyDown={e => alterFocus(e, storeId)}>
                <Link to={`/store/${storeId}`} onClick={() => setOpenDropdown(false)}>
                  <div>{storeName}</div>
                </Link>
              </DropdownResult>
            ))
          ) : (
            <NoMatch>
              <NoMatchMessage>결과가 없습니다.</NoMatchMessage>
              <Link to={`/searchmap?keyword=${inputRef.current?.value.trim()}`}>
                <RegisterSuggestion>맛집을 공유하고 최초 투표자가 되어보세요!</RegisterSuggestion>
              </Link>
            </NoMatch>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export default SearchBar;
