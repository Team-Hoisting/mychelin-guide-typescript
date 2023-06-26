import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 30px 0;
`;

const ProfileImg = styled.img`
  margin: 15px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const NickName = styled.div`
  display: flex;
  margin: auto 5px;
  font-size: 30px;
  font-weight: 500;
`;

const CertifiedIcon = styled.img.attrs({ src: '/images/certified.png' })`
  margin: auto 5px;
  height: 30px;
`;

// imgUrl, nickname, isCertified, link
const ProfileHeader = ({ profileUserNickname, isCertified }) => (
  <Container>
    <ProfileImg
      src={`/img/users/${profileUserNickname}`}
      onError={e => {
        e.target.src = '/img/default/user.png';
      }}
    />
    <NickName>
      {profileUserNickname}
      {isCertified && <CertifiedIcon />}
    </NickName>
  </Container>
);

export default ProfileHeader;
