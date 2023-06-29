import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { editUserInfo } from '../../api/users';
import { logout } from '../../api/auth';
import Button from '../common/Button';
import FormInput from './FormInput';
import { User } from 'types';
import { AxiosError } from 'axios';
import { nicknameSchema, passwordSchema } from 'schema';

const Form = styled.form`
  padding-top: 1.5rem;
  position: relative;

  input {
    background-color: transparent;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  Button + Button {
    margin-left: 1rem;
  }
`;

const ButtonWithIncreased = styled(Button)`
  font-size: 0.9rem;
  border: 1px solid var(--border-primary);

  &.confirm:disabled {
    background-color: var(--bg-color);
    color: var(--font-color);
  }

  &.confirm:not(:disabled) {
    background-color: var(--font-secondary);
    color: #eee;
  }

  :hover {
    background: transparent;
  }
`;

interface EditorType {
  type: string;
  onClose: () => void;
  formSchema: typeof nicknameSchema | typeof passwordSchema;
  defaultValues: {
    nickname?: string;
    password?: string;
    confirmPassword?: string;
  };
  // defaultValues: DefaultValues<typeof nicknameSchema | typeof passwordSchema>;
}

const Editor = ({ type, onClose, formSchema, defaultValues }: EditorType) => {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const [isSamePrevious, setIsSamePrevious] = React.useState<boolean | null>(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = React.useState<boolean | null>(null);

  const onSubmit = async () => {
    const values = getValues();
    // delete values.confirmPassword;

    try {
      const editedUser = await editUserInfo((user as User).nickname, values);

      if (type !== 'nickname') {
        await logout();

        navigate('/signin');
        setUser(null);
      } else {
        setUser(editedUser);
      }
      toast.success(`${type === 'nickname' ? '닉네임' : '비밀번호'}을 수정했습니다.`);

      onClose();
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 409) toast.warn('기존 비밀번호와 동일합니다.');
      throw new Error('error');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {type === 'nickname' ? (
        <FormInput
          type="text"
          title="새로운 닉네임"
          placeholder="원하는 닉네임을 입력하세요"
          name="nickname"
          control={control}
          trigger={trigger}
          isSamePrevious={isSamePrevious as boolean}
          setIsSamePrevious={setIsSamePrevious}
          isNicknameDuplicate={isNicknameDuplicate as boolean}
          setIsNicknameDuplicate={setIsNicknameDuplicate}
        />
      ) : (
        <FormInput
          type="password"
          title="새로운 비밀번호"
          placeholder="변경할 비밀번호를 입력하세요"
          name="password"
          control={control}
          trigger={trigger}
        />
      )}
      {type === 'password' && (
        <FormInput
          type="password"
          title="비밀번호 확인"
          placeholder="비밀번호를 확인해주세요"
          name="confirmPassword"
          control={control}
          trigger={trigger}
        />
      )}
      <Buttons>
        <ButtonWithIncreased
          className="confirm"
          red
          disabled={!isValid || isSamePrevious || (type === 'nickname' && !isNicknameDuplicate)}>
          확인
        </ButtonWithIncreased>
        <ButtonWithIncreased type="button" onClick={onClose}>
          취소
        </ButtonWithIncreased>
      </Buttons>
    </Form>
  );
};

export default Editor;
