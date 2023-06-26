import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userState from '../../recoil/atoms/userState';
import { signIn } from '../../api/auth';
import { signinSchema } from '../../schema';
import AuthForm from './AuthForm';

const defaultValues = {
  email: '',
  password: '',
};

const SigninForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const { state } = useLocation();

  const onSubmit = async data => {
    try {
      const user = await signIn(data);

      toast.success(`${user.nickname}님 환영합니다.`);
      setUser(user);

      if (state) {
        navigate(state);
      } else navigate('/');
    } catch (e) {
      toast.warn('이메일 또는 비밀번호를 확인해주세요!');
    }
  };

  return (
    <>
      <AuthForm type="login" formSchema={signinSchema} defaultValues={defaultValues} request={onSubmit} />
    </>
  );
};

export default SigninForm;
