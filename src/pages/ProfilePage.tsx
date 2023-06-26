import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { SkinnyContainer } from '../components/common';
import { ProfileHeader, StoresViewer } from '../components/profile';

import useUserProfile from '../hooks/useUserProfile';

const ProfileWrapper = styled.main`
  width: 85%;
  margin: 0 auto;
`;

const ProfilePage = () => {
  const { nickname: profileUserNickname } = useParams();
  const { user, voteStores, emptyCategories } = useUserProfile(profileUserNickname);

  return (
    <SkinnyContainer>
      <ProfileWrapper>
        <ProfileHeader profileUserNickname={profileUserNickname} isCertified={user.isCertified} />
        <StoresViewer
          profileUserNickname={profileUserNickname}
          voteStores={voteStores}
          emptyCategories={emptyCategories}
        />
      </ProfileWrapper>
    </SkinnyContainer>
  );
};

export default ProfilePage;
