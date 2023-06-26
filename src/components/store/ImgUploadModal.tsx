import React from 'react';
import { Modal, Group, Button, Text, rem, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import styled, { css } from 'styled-components';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload } from 'react-icons/bi';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button as CommonButton } from '../common/index';

const iconSize = css`
  width: 100px;
  height: 100px;
`;

const PhotoIcon = styled(HiOutlinePhotograph)`
  ${iconSize}
`;

const CancelIcon = styled(AiOutlineClose)`
  ${iconSize}
`;

const UploadIcon = styled(BiUpload)`
  ${iconSize}
`;

const Preview = styled.img.attrs({
  alt: '선택한 이미지',
})`
  width: 400px;
  object-fit: cover;
`;

const UploadButton = styled(CommonButton).attrs({
  type: 'button',
})`
  margin-right: 0;
  margin-left: auto;
  margin-top: 12px;
`;

const Right = styled.div`
  display: flex;
`;

const BeforeUploadButton = styled(Button)`
  width: 120px;
  height: 44px;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #000;

  background: #e3e3e3;
  &:hover {
    background: #cfcfcf;
  }
`;

const ImgUploadModal = ({ user }) => {
  const { storeId } = useParams();

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false, {
    onOpen: () => {
      if (!user) navigate('/signin');
    },
    onClose: () => setFile(null),
  });
  const [file, setFile] = React.useState(null);

  const handleImageDrop = files => {
    // 프리뷰
    const [file] = files;
    setFile(file);
  };

  // 이미지 업로드
  const handleUploadButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append('img', file);
      formData.append('filename', storeId);

      const res = await axios.post('/api/upload/store', formData);

      if (res.status !== 200) throw new Error(res.statusText);

      const { success } = res.data;

      if (success) {
        window.location.reload();
        close();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        transitionProps={{ transition: 'slide-up', duration: 300, timingFunction: 'linear' }}
        zIndex="9999"
        size="lg"
        centered>
        <Dropzone
          onDrop={handleImageDrop}
          onReject={files => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          sx={() => ({
            minHeight: rem(120),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          })}>
          {file ? (
            <Center>
              <Preview src={URL.createObjectURL(file)} />
            </Center>
          ) : (
            <>
              <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <UploadIcon />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <CancelIcon />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <PhotoIcon />
                </Dropzone.Idle>
              </Group>
              <div>
                <Text size="xl" inline>
                  Drop image here
                </Text>
              </div>
            </>
          )}
        </Dropzone>
        {file && (
          <>
            <Center>
              <Text>사진을 업로드하시겠습니까?</Text>
            </Center>
            <Right>
              <UploadButton onClick={handleUploadButtonClick}>확인</UploadButton>
            </Right>
          </>
        )}
      </Modal>
      <BeforeUploadButton onClick={open}>사진 업로드</BeforeUploadButton>
    </>
  );
};

export default ImgUploadModal;
