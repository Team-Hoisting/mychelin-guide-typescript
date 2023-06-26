import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/auth';
import { signupSchema } from '../../schema';
import AuthForm from './AuthForm';

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
};

const SignupForm = () => {
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await signUp(data);

      toast.success(`회원가입이 완료되었습니다.`);
      navigate('/signin');
    } catch (e) {
      toast.error('회원가입을 실패했습니다.');
      throw new Error(e);
    }
  };

  return <AuthForm type="register" formSchema={signupSchema} defaultValues={defaultValues} request={onSubmit} />;
};

export default SignupForm;
