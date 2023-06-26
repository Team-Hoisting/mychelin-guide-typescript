import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useController } from 'react-hook-form';
import { userState } from '../../recoil/atoms';
import { checkNickname } from '../../api/auth';
import Button from '../common/Button';

const Container = styled.div`
  position: relative;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: var(--font-color);
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid #ababab;
  font-size: 1rem;
  color: var(--font-color);

  &:focus {
    border-bottom: 1px solid #000;
  }

  & + ${Title} {
    margin-top: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  height: 3px;
`;

const ButtonWithPosition = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 15px;
  padding: 0.5rem;
  display: flex;
  /* color: var(--font-secondary); */

  &:disabled {
    background-color: var(--bg-color);
    color: var(--font-color);
  }

  &:not(:disabled) {
    background-color: var(--font-secondary) !important;
    color: #eee;
  }
`;

const Hint = styled.span`
  margin-left: 1rem;
  font-size: 0.5rem;
  color: ${props => (props.isValid ? 'green' : 'red')};
  position: absolute;
  top: 2px;
  left: 70px;
`;

const FormInput = ({
  type,
  title,
  placeholder,
  name,
  control,
  trigger,
  isSamePrevious,
  setIsSamePrevious,
  isNicknameDuplicate,
  setIsNicknameDuplicate,
}) => {
  const { nickname } = useRecoilValue(userState);
  const {
    field: { value, onChange },
    fieldState: { isDirty, error },
  } = useController({
    name,
    control,
  });

  const isNicknameInput = name === 'nickname';

  const handleChange = e => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (name === 'nickname') setIsNicknameDuplicate(null);

    if (isNicknameInput && inputValue === nickname) setIsSamePrevious(true);
    if (isNicknameInput && inputValue !== nickname) setIsSamePrevious(false);

    trigger(name);
    if (name === 'password') trigger('confirmPassword');
  };

  const handleDoubleCheck = async () => {
    try {
      const { status } = await checkNickname(value);
      if (status === 200) {
        console.log(status);
        setIsNicknameDuplicate(true);
      }
    } catch (e) {
      setIsNicknameDuplicate(false);
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      {isNicknameInput && isDirty && !error && (
        <Hint isValid={isNicknameDuplicate}>
          {isNicknameDuplicate === null ? '확인 필요' : isNicknameDuplicate ? '사용 가능' : '중복'}
        </Hint>
      )}
      <Input type={type} placeholder={placeholder} onChange={handleChange} />
      {isNicknameInput && (
        <ButtonWithPosition
          type="button"
          className="confirm"
          red
          disabled={!isDirty || error || isSamePrevious || !(isNicknameDuplicate === null)}
          onClick={handleDoubleCheck}>
          중복 확인
        </ButtonWithPosition>
      )}
      <ErrorMessage>
        {isDirty ? error?.message ?? (isNicknameInput && isSamePrevious ? '기존 닉네임과 동일합니다.' : '') : ''}
      </ErrorMessage>
    </Container>
  );
};

export default FormInput;
