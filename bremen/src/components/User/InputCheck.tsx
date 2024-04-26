'use client';

import styled from 'styled-components';

const Title = styled.div`
  color: white;
  font-size: 5.5vmin;
  text-align: center;
  @media (min-width: 450px) {
    font-size: 20px;
    padding-bottom: 2px;
  }
`;
const CheckInput = styled.input<{
  borderColor: string;
  borderLightColor: string;
}>`
  width: 54vmin;
  height: 12vmin;
  background-color: var(--light-gray-color);
  border-radius: 10px;
  background-image: linear-gradient(
      var(--light-gray-color),
      var(--light-gray-color)
    ),
    linear-gradient(
      to right,
      ${props => props.borderLightColor},
      ${props => props.borderColor}
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  border: 3px solid transparent;
  padding: 0;
  display: flex;
  align-items: center;
  &::placeholder {
    padding-left: 10px;
    font-size: 2.5vmin;
    white-space: pre-line;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
  }

  @media (min-width: 450px) {
    font-size: 16px;
    width: 45vmin;
    height: 5.5vmin;
    &::placeholder {
      font-size: 12px;
    }
  }
`;
const ErrorMessage = styled.div`
  font-size: 3vmin;
  color: var(--origin-yellow-color);
  @media (min-width: 450px) {
    font-size: 12px;
    color: var(--origin-yellow-color);
  }
`;

const Vacant = styled.div`
  height: 3vmin;
  @media (min-width: 450px) {
    height: 16px;
  }
`;

const InputCheck = ({
  detail,
  placeHolderContent,
  isPass,
  setValue,
  maxLength,
  wrongMessage,
  type,
  content,
}: {
  detail: string;
  placeHolderContent: string;
  isPass: boolean;
  setValue: (newvalue: string) => void;
  maxLength: number;
  wrongMessage: string;
  type: string;
  content: boolean;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    setValue(newNickname);
  };

  const borderColor = () => {
    if (isPass && content) {
      return 'var(--origin-green-color)';
    }
    if (content) {
      return 'var(--origin-red-color)';
    }
    return 'none';
  };
  const borderLightColor = () => {
    if (isPass && content) {
      return 'var(--light-green-color)';
    }
    if (content) {
      return 'var(--light-red-color)';
    }
    return 'none';
  };

  return (
    <div>
      <Title>{detail}</Title>
      <CheckInput
        maxLength={maxLength}
        type={type}
        onChange={handleChange}
        placeholder={placeHolderContent}
        borderColor={borderColor()}
        borderLightColor={borderLightColor()}
      />
      {borderColor() === 'none' ? (
        <Vacant></Vacant>
      ) : (
        <ErrorMessage>{wrongMessage}</ErrorMessage>
      )}
    </div>
  );
};

export default InputCheck;
