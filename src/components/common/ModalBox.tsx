import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Modal } from '@mantine/core';
import { userState, themeState } from '../../recoil/atoms';
import { CategorySelector, SameCategoryChecker, SameStoreChecker, SuccessVerifier, ToggleButton } from '../modal';
import { Loader } from '.';
import { StoreDataType, CategoryCode } from 'types';
import { StoreType } from 'components/searchmap/types';

interface PopupModalProps {
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
  phase: string;
  setPhase: (state: string) => void;
  storeId: string;
  store?: StoreType;
}

interface responseType {
  newStore?: StoreDataType;
}

const PopupModal = ({ isOpened, setIsOpened, phase, setPhase, storeId, store }: PopupModalProps) => {
  const theme = useRecoilValue(themeState);
  const [categoryCode, setCategoryCode] = React.useState<CategoryCode | 'none'>('none');
  const [taskQueue, setTaskQueue] = React.useState<Array<() => Promise<responseType>>>([]);

  return (
    <Modal
      opened={isOpened}
      onClose={() => {
        setIsOpened(false);
        setPhase('none');
      }}
      transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
      zIndex={9999}
      size="lg"
      centered
      styles={{
        header: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}` },
        body: { backgroundColor: `${theme === 'light' ? '#fff' : '#22272e'}`, paddingTop: '1px !important' },
      }}>
      <React.Suspense fallback={<Loader />}>
        {phase === 'select' && (
          <CategorySelector
            setIsOpened={setIsOpened}
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store as StoreType}
            categoryCode={categoryCode}
            setCategoryCode={setCategoryCode}
          />
        )}
        {phase === 'category' && (
          <SameCategoryChecker
            setPhase={setPhase}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            store={store as StoreType}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'store' && (
          <SameStoreChecker
            setPhase={setPhase}
            setIsOpened={setIsOpened}
            setTaskQueue={setTaskQueue}
            storeId={storeId}
            categoryCode={categoryCode}
          />
        )}
        {phase === 'success' && <SuccessVerifier setIsOpened={setIsOpened} storeId={storeId} taskQueue={taskQueue} />}
      </React.Suspense>
    </Modal>
  );
};

interface ModalBoxProps {
  store?: StoreType;
  storeId: string;
  width?: string;
}

const ModalBox = ({ store, storeId, width }: ModalBoxProps) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = React.useState(false);
  const [phase, setPhase] = React.useState('none');

  if (!isOpened)
    return (
      <ToggleButton
        onClick={() => {
          if (!user) {
            navigate('/signin', { state: pathname });
          } else {
            setIsOpened(true);
            setPhase('select');
          }
        }}
        width={width as string}
      />
    );

  return (
    <PopupModal
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      phase={phase}
      setPhase={setPhase}
      storeId={storeId}
      store={store}
    />
  );
};

export default ModalBox;
