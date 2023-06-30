import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchInputState, categoryState } from '../../recoil/atoms';
import { fetchSearchedStores } from '../../api/stores';
import { useDebounce, useOnClickOutside } from '../../hooks/index.js';
import { StoresDataType } from '../../types';
import SearchResultDropdown from '../searchbar/SearchResultDropdown';

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
  const [dropdownStores, setDropdownStores] = React.useState<StoresDataType | []>([]);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const setSearchInput = useSetRecoilState(searchInputState);
  const setCategory = useSetRecoilState(categoryState);

  const dropdownRef = useOnClickOutside(() => setOpenDropdown(false));
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

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userSearch = e.target.value.trim();

    if (!userSearch) {
      setOpenDropdown(false);
      setSearchInput('');
    } else {
      setOpenDropdown(true);
      setDropdownStores(await fetchSearchedStores(userSearch));
    }
  };

  const debouncedSearchHandler = useDebounce(handleSearchChange, 330);

  const handleRefocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) debouncedSearchHandler(e);
  };

  const closeDropdown = () => setOpenDropdown(false);

  const alterFocus = (e: React.KeyboardEvent<HTMLLIElement | HTMLInputElement>, storeId?: string) => {
    e.preventDefault();
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab' && e.key !== 'Enter') return;

    if (e.target instanceof HTMLInputElement) {
      if (e.key === 'ArrowUp') (dropdownRef.current?.lastElementChild as HTMLElement).focus();
      else (dropdownRef.current?.firstElementChild as HTMLElement).focus();
    }

    if (e.target instanceof HTMLLIElement) {
      const currentActive = document.activeElement;

      if (e.key === 'Enter') {
        navigate(`/store/${storeId}`);
        setOpenDropdown(false);
        return;
      }

      if (e.key === 'ArrowUp') {
        if (currentActive?.previousElementSibling) (currentActive.previousElementSibling as HTMLElement)?.focus();
        else (currentActive?.parentElement?.lastElementChild as HTMLElement)?.focus();
      }

      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        if (currentActive?.nextElementSibling) (currentActive.nextElementSibling as HTMLElement)?.focus();
        else (currentActive?.parentElement?.firstElementChild as HTMLElement)?.focus();
      }
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
          onKeyDown={e => alterFocus(e)}
        />
        <SearchButton tabIndex={1}>
          <SearchIcon />
        </SearchButton>
      </SearchForm>
      {hasDropdown && openDropdown && (
        <SearchResultDropdown
          inputRef={inputRef}
          dropdownRef={dropdownRef}
          alterFocus={alterFocus}
          closeDropdown={closeDropdown}
          dropdownStores={dropdownStores}
        />
      )}
    </Container>
  );
};

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

export default SearchBar;
