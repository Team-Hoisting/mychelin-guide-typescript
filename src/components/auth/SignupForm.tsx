import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/auth';
import { signupSchema } from '../../schema';
import AuthForm from './AuthForm';
import type { defaultValues } from '../../types';

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
};

const SignupForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: defaultValues) => {
    try {
      await signUp(data);

      toast.success(`회원가입이 완료되었습니다.`);
      navigate('/signin');
    } catch (e) {
      toast.error('회원가입을 실패했습니다.');
      throw new Error(e as string);
    }
  };

  return <AuthForm type="register" formSchema={signupSchema as any} defaultValues={defaultValues} request={onSubmit} />;
};

export default SignupForm;
