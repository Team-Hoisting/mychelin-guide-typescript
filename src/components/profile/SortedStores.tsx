import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Button } from '../common';
import { Draggable, ProfileStoreItem, EmptyStoreItem } from '.';

import userState from '../../recoil/atoms/userState';
import { changeVotedCategoryOrder } from '../../api/users';
import useDragAndDrop from '../../hooks/useDragAndDrop';

const Container = styled.div`
  text-align: right;
`;

const EditButton = styled(Button)`
  margin: 5px 5px 15px 5px;
  width: 100px;
  height: 40px;
  font-size: 15px;
  font-weight: 450;
`;

const StoresGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const SortedStores = ({ profileUserNickname, voteStores, emptyCategories }) => {
  const user = useRecoilValue(userState);

  const { order: votedStoreOrder, dragStartHandler, swap } = useDragAndDrop(voteStores);

  const [isEditing, setIsEditing] = React.useState(false);
  const [dragOverIdx, setDragOverIdx] = React.useState(-1);

  return (
    <Container>
      {user.nickname === profileUserNickname && voteStores?.length >= 2 && (
        <>
          {isEditing ? (
            <EditButton
              onClick={() => {
                changeVotedCategoryOrder(
                  profileUserNickname,
                  votedStoreOrder.map(({ categoryCode }) => categoryCode)
                );
                setIsEditing(false);
              }}
              gray>
              확인
            </EditButton>
          ) : (
            <EditButton onClick={() => setIsEditing(true)} red>
              순서 변경
            </EditButton>
          )}
        </>
      )}
      {
        <StoresGrid>
          {!isEditing
            ? votedStoreOrder.map(({ categoryCode, store }) => (
                <ProfileStoreItem
                  key={categoryCode}
                  categoryCode={categoryCode}
                  storeId={store.storeId}
                  storeName={store.storeName}
                />
              ))
            : votedStoreOrder.map(({ categoryCode, store }, idx) => (
                <Draggable
                  key={categoryCode}
                  dragStartHandler={() => {
                    dragStartHandler(idx);
                  }}
                  dropHandler={() => {
                    swap(idx);
                  }}
                  dragEnterHandler={() => {
                    setDragOverIdx(idx);
                  }}
                  dragEndHandler={() => {
                    setDragOverIdx(-1);
                  }}>
                  <ProfileStoreItem
                    categoryCode={categoryCode}
                    storeId={store.storeId}
                    storeName={store.storeName}
                    isEditing={true}
                    isOverlaid={idx === dragOverIdx}
                  />
                </Draggable>
              ))}
          {emptyCategories?.map(code => (
            <EmptyStoreItem key={code} categoryCode={code} />
          ))}
        </StoresGrid>
      }
    </Container>
  );
};

export default SortedStores;
