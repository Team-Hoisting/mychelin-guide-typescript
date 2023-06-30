import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StoresDataType } from 'types';

interface SearchResultDropdownProps {
  dropdownRef: React.RefObject<HTMLUListElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  alterFocus: (e: React.KeyboardEvent<HTMLLIElement | HTMLInputElement>, storeId?: string) => void;
  closeDropdown: () => void;
  dropdownStores: StoresDataType | [];
}

const SearchResultDropdown = ({
  dropdownRef,
  inputRef,
  alterFocus,
  closeDropdown,
  dropdownStores,
}: SearchResultDropdownProps) => (
  <Dropdown ref={dropdownRef}>
    {dropdownStores.length ? (
      dropdownStores.map(({ storeName, storeId }) => (
        <DropdownResult key={storeName} tabIndex={0} onKeyDown={e => alterFocus(e, storeId)}>
          <Link to={`/store/${storeId}`} onClick={closeDropdown}>
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
);

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

export default SearchResultDropdown;
