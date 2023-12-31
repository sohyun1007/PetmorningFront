import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import * as API from '../../../../api/API';
import { useNavigate } from 'react-router-dom';

export type ProfileInfo = {
  petName: string;
  userNickname: string;
  profileImageUrl: string;
  petImageUrl: string;
  description: string;
  petAge: number;
  petType: string;
};

type TextInfo = {
  name: string;
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  placeholder: string;
};

const TextForm = () => {
  const [profile, setProfile] = useState<ProfileInfo | null>(null); // Change initial state to null
  const [id, setId] = useState('');
  const [subInfo, setSubInfo] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [petImage, setPetImage] = useState<File | null>(null);

  const fileInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [selectedFileName1, setSelectedFileName1] = useState('');
  const [selectedFileName2, setSelectedFileName2] = useState('');

  const TextInfo: TextInfo[] = [
    { name: '닉네임', state: [id, setId], placeholder: '아이디를 수정해주세요.' },
    {
      name: '마이펫 이름',
      state: [nickname, setNickname],
      placeholder: '마이펫 이름을 적어주세요..',
    },
    {
      name: '마이펫 한 줄 설명',
      state: [subInfo, setSubInfo],
      placeholder: '한 줄 설명을 적어주세요.',
    },
    { name: '품종', state: [breed, setBreed], placeholder: '품종을 입력해주세요.' },
    { name: '나이', state: [age, setAge], placeholder: '나이를 입력해주세요. (숫자로 기입)' },
  ];
  
  /*Server STate*/
  const getProfileAndSetProfileInfo = async () => {
    const data = await API.get('/user/mypet');
    setProfile(data);

    if (data) {
      setId(data.userNickname)
      setSubInfo(data.description)
      setNickname(data.petName)
      setBreed(data.petType)
      setAge(data.petAge)
      const parsedValue1 = data.profileImageUrl.substring(data.profileImageUrl.indexOf(".com/") + 5);
      const parsedValue2 = data.petImageUrl.substring(data.petImageUrl.indexOf(".com/") + 5);
      setSelectedFileName1(parsedValue1)
      setSelectedFileName2(parsedValue2)
    }
  }

  useEffect(() => {
    getProfileAndSetProfileInfo();
  }, []);


  const ImgInfo: {
    name: string;
    state: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
    stateName: [string, React.Dispatch<React.SetStateAction<string>>];
    placeholder: string;
  }[] = [
      {
        name: '프로필 사진',
        state: [profileImage, setProfileImage],
        stateName: [selectedFileName1, setSelectedFileName1],
        placeholder: '프로필 사진을 첨부하세요.',
      },
      {
        name: '마이펫 사진',
        state: [petImage, setPetImage],
        stateName: [selectedFileName2, setSelectedFileName2],
        placeholder: '마이펫 사진을 첨부하세요.',
      },
    ];

  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<File | null>>,
      setNameState: React.Dispatch<React.SetStateAction<string>>,
    ) => {
      if (!e.target.files) {
        return;
      }
      const uploadImg = e.target.files[0];
      setNameState(uploadImg.name);
      setState(uploadImg);
    },
    [],
  );

  const handleCancel = () => {
    setId('');
    setSubInfo('');
    setBreed('');
    setAge('');
    setNickname('');
    setProfileImage(null);
    setPetImage(null);
    setSelectedFileName1('');
    setSelectedFileName2('');
  };

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const handleCancelButtonClick = () => {
    setSubmitButtonClicked(false);
    handleCancel();
  };

  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitButtonClicked) {
      const formData = new FormData();

      formData.append('petName', nickname);
      formData.append('description', subInfo);
      formData.append('petAge', age);
      formData.append('petType', breed);
      formData.append('userNickname', id);
      if (petImage) {
        formData.append('petImage', petImage);
      }
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      // 빈 값 및 파일 업로드 확인
      let hasEmptyValue = false;

      formData.forEach((value, key) => {
        if (value === '') {
          hasEmptyValue = true;
        }
      });

      if (hasEmptyValue) {
        alert('모든 항목을 입력해주세요!');
        return;
      }

      const response = await API.post('/user/mypet', formData, 'imgPost');
      alert('수정되었습니다!');
      navigate('/mypage');
      handleCancel();
    }
  };

  const handleSubmitButtonClick = () => {
    setSubmitButtonClicked(true);
  };

  return (
    <TextFormContainer>
      <Form onSubmit={handleFormSubmit}>
        {
          TextInfo.map((items, idx) => (
            <FormWrapper key={idx}>
              <div className="title">{items.name}</div>
              <input
                className="textInput"
                type="text"
                value={items.state[0]}
                placeholder={items.placeholder}
                onChange={(e) => items.state[1](e.target.value)}
              />
            </FormWrapper>
          ))
        }

        <div className="border" />

        {ImgInfo.map((items, idx) => (
          <FormWrapper key={idx}>
            <div className="title">{items.name}</div>
            <input
              className="imgInput"
              type="file"
              accept="image/*"
              // value={items.state[0]}
              ref={fileInputRefs[idx]}
              style={{ display: 'none' }}
              onChange={(e) => {
                handleFileChange(e, items.state[1], items.stateName[1]);
              }}
            />
            <label className="fileInputLabel">
              <input
                type="text"
                className="fileInputText"
                readOnly
                value={items.stateName[0]}
                placeholder={items.placeholder}
              />
              <button onClick={() => { fileInputRefs[idx].current?.click(); setSubmitButtonClicked(false); }}>사진 첨부</button>
            </label>
          </FormWrapper>
        ))}
        <BtnWrapper>
          <button className="backBtn" onClick={handleCancelButtonClick}>
            취소
          </button>
          <button className='reviseBtn' onClick={handleSubmitButtonClick}>회원 정보 수정</button>
          <DeleteBtn>
            <button>
              <img src="/img/회원탈퇴.svg" />
            </button>
          </DeleteBtn>
        </BtnWrapper>
      </Form>
    </TextFormContainer>
  );
};
export default TextForm;

const TextFormContainer = styled.div`
  margin-top: 2vw;
  width: 80vw;
  font-family: ${(props) => props.theme.font.family.pretendard_bold};
  font-size: 1vw;
  margin-bottom: 70px;

  div.border {
    width: 100%;
    border: 1px solid ${(props) => props.theme.color.grayScale.brightGray};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
`;
const FormWrapper = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vw;
  div.title {
    width: 12vw;
  }
  input.textInput {
    width: 100%;
    height: 100%;
    padding-left: 22px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.grayScale.lightGray};
    border: none;
    font-family: ${(props) => props.theme.font.family.pretendard_medium};
  }
  input.imgInput {
    width: 87%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.grayScale.lightGray};
    border: none;
  }

  label.fileInputLabel {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    // display: inline-block;
  }
  input.fileInputText {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.grayScale.lightGray};
    border: none;
    padding-left: 22px;
    font-family: ${(props) => props.theme.font.family.pretendard_medium};
  }
  button {
    position: absolute;
    right: 0;
    height: 100%;
    color: white;
    background-color: black;
    border-radius: 6px;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    font-size: 0.8vw;
    font-family: ${(props) => props.theme.font.family.pretendard_bold};
    cursor: pointer;
  }
  imgSrc {
    position: absolute;
    z-index: 1000;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1vw;
  font-size: 1vw;
  position: relative;

  button.backBtn {
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 1vw;
    background-color: ${(props) => props.theme.color.grayScale.lightGray};
    color: ${(props) => props.theme.color.grayScale.gray};
    font-family: ${(props) => props.theme.font.family.pretendard_medium};
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }

  button.reviseBtn {
    border: none;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 1vw;
    background-color: ${(props) => props.theme.color.main.orange};
    color: white;
    font-family: ${(props) => props.theme.font.family.pretendard_medium};
    cursor: pointer;
    &:hover {
      filter: brightness(1.2);
    }
  }
`;
const DeleteBtn = styled.div`
  position: absolute;
  right: 0;
  button {
    border: none;
    cursor: pointer;
    background-color: white;
  }
  img {
    width: 80%;
    height: auto;
    over-fit: cover;
  }
`;
