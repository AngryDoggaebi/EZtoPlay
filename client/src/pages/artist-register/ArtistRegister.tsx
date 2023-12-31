import S from './ArtistRegister.style';
import { styled } from 'styled-components';
import LogoImg from '../.././images/이투플아티스트슬로건.png';
import Header from '../../components/header/Header';
import { ButtonPrimary75px, Button } from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { useState, useEffect, useRef } from 'react';
import Img from '../../images/기본이미지.jpg';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { usePostArtist, usePostArtistImg } from '../../api/fetchAPI';
import { instance } from '../../api/axios';
import { artistnameRegExp } from '../../utils/RegExp';
import { getCookie } from '../../utils/Cookie';
import { FontStyle } from '../../utils/Theme';
import { H1Title } from '../../theme/common/SlideUp';
import { categoryObj } from '../../utils/Category';

interface FormValues {
  artistName: string;
  snsLink: string;
  content: string;
}

export default function Artistregist() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const handleClickCategory = (id: number) => {
    if (categoryId === id) setCategoryId(null);
    else setCategoryId(id);
  };
  const artistImgInputRef = useRef<HTMLInputElement>(null);
  const [artistImagesrc, setArtistImagesrc] = useState<string>(Img);
  // const [videofilesrc, setVideofilesrc] = useState<string>(Img);
  // const [videoFile, setVideoFile] = useState<Blob>();
  useEffect(() => {
    if (!getCookie('userInfo')?.memberId) {
      navigate('/', { replace: true });
      alert('접근 권한이 없습니다.');
      return;
    }
    if (getCookie('userInfo')?.artistId) {
      navigate('/', { replace: true });
      alert('잘못된 접근입니다.');
      return;
    }
  }, []);
  /** 중복확인버튼 클릭 여부 */
  let [artistNameDupl, setArtistNameDupl] = useState(false);
  /** 중복확인 클릭하지 않고 submit 했을 때
   * @ture :중복확인 X
   * @false :중복확인 O
   */
  let [artistNameDuplBtnCnt, setArtistNameDuplBtnCnt] = useState(0);
  let [noArtistNameDuplBtnClickedSubmit, setNoArtistNameDuplBtnClickedSubmit] =
    useState(true);
  let [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const userInfo = getCookie('userInfo');
  const [getUrl, setGetUrl] = useState();

  /** 아티스트 정보를 등록 요청하는 함수 */
  const { handleSubmit, control } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    let formData = new FormData();
    // formData.append('image-file', videoFile as Blob, 'image');
    // useForm 적용되지 않은 값들을 넣어주기
    Object.assign(data, {
      imageUrl: getUrl,
      categoryId,
    });
    if (!getUrl) {
      return alert('이미지를 등록해야합니다.');
    }
    if (!categoryId) {
      return alert('장르를 선택해야합니다.');
    }
    // 중복확인완료 후 입력 값이 바뀌면 등록되지 않게
    if (noArtistNameDuplBtnClickedSubmit) {
      return alert('중복확인 해야합니다.');
    }
    // append메서드 사용해서 formData에 키-값 쌍으로 넣어주기
    formData.append(
      'artistpostDto',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
      'artistpostDto'
    );
    // 값을 fetch함수에 전달
    usePostArtist(data);
    navigate(`/mypage/${userInfo.memberId}`);
    location.reload();
  };

  /** 닉네임 중복검사하는 ajax 함수 */
  const useGetDuplicateArtistname = (artistNameData: string | null) => {
    instance
      .post('/artist/duplicate/artistName', {
        artistName: artistNameData,
      })
      // 응답이 갈때
      .then(response => {
        if (response.status === 200) {
          if (response.data === false) {
            setArtistNameDupl(false);
            setArtistNameDuplBtnCnt(artistNameDuplBtnCnt + 1);
            setNoArtistNameDuplBtnClickedSubmit(false);
            alert('중복확인 성공');
          } else if (response.data === true) {
            setArtistNameDupl(true);
            setArtistNameDuplBtnCnt(0);
            setNoArtistNameDuplBtnClickedSubmit(false);
          }
        }
      })
      // 응답이 잘못됐을때
      .catch(err => {
        alert(`error: ${err?.response?.data?.fieldErrors[0]?.reason}`);
      });
  };
  const handleSubmitAll = () => {
    handleSubmit(onSubmit)();
  };

  const handleDuplicat = () => {
    setSubmitClicked(true);
    if (!noArtistNameDuplBtnClickedSubmit) {
      if (!artistNameDupl) {
        return setArtistNameDuplBtnCnt(0);
      } else {
        if (artistNameDupl) {
          if (artistNameDuplBtnCnt > 0) {
            return setNoArtistNameDuplBtnClickedSubmit(true);
          }
        }
      }
    }
  };

  const onSubmitImg = (file: Blob) => {
    let formData = new FormData();
    formData.append('image-file', file);
    usePostArtistImg(formData).then((data: any) => {
      if (data) {
        setGetUrl(data.data);
      } else {
        alert('이미지 등록에 실패하였습니다.');
      }
    });
  };

  return (
    <>
      <Header precious={true} />
      <S.Main>
        <S.Section>
          <S.Title>
            <H1Title.H1span>아티스트 등록하기</H1Title.H1span>
          </S.Title>
          <S.LogoImg src={LogoImg}></S.LogoImg>
          <S.FileInput
            type="file"
            name="image"
            accept="image/*"
            ref={artistImgInputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files === undefined || files === null) return;
              const file = files[0];
              if (file) onSubmitImg(file);
            }}
          />
          <S.ArtistImg
            src={getUrl || artistImagesrc}
            onClick={() => artistImgInputRef.current?.click()}
          ></S.ArtistImg>
          <S.ArtistDetail>
            <S.SubTitle>아티스트 정보</S.SubTitle>

            <S.CategoryContainer>
              {Object.keys(categoryObj).map((key, idx) => {
                return (
                  <Button
                    key={idx}
                    theme={idx + 1 === categoryId ? 'highlight' : 'theme'}
                    value={idx + 1}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      const value = +(e.target as HTMLInputElement).value;
                      handleClickCategory(value);
                    }}
                  >
                    {categoryObj[key]}
                  </Button>
                );
              })}
            </S.CategoryContainer>
            {/* useForm에서 controller를 사용하기 위해선 form버튼으로 감싸줘야하며 새로고침 기능이 추가 되는데 없애기 위해 preventDefault() 사용 */}
            <form onSubmit={e => e.preventDefault()}>
              <S.InputContainer>
                <S.InputLabel>아티스트</S.InputLabel>
                <Controller
                  control={control}
                  name={'artistName'}
                  defaultValue={''}
                  rules={{
                    required: '반드시 입력해야 합니다',
                    pattern: {
                      value: artistnameRegExp,
                      message:
                        '아티스트명은 한,영,숫자 띄어쓰기 없이 사용해야 합니다',
                    },
                    minLength: {
                      value: 1,
                      message: '아티스트명은 1자 이상 16자 이하여야 합니다',
                    },
                    maxLength: {
                      value: 16,
                      message: '아티스트명은 1자 이상 16자 이하여야 합니다',
                    },
                    // 중복확인완료 후 입력 값이 바뀌면 message띄우기
                    onChange: () => setNoArtistNameDuplBtnClickedSubmit(true),
                  }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <Input
                        value={field.value}
                        suffix={true}
                        width={285}
                        height={30}
                        buttonText="중복확인"
                        onChange={field.onChange}
                        onClick={() => {
                          handleDuplicat();
                          useGetDuplicateArtistname(field.value);
                        }}
                        errorMessage={error?.message}
                      />
                    );
                  }}
                />
                {noArtistNameDuplBtnClickedSubmit ? (
                  submitClicked === true ? (
                    <O.DuplicateMeg>중복확인을 해주세요</O.DuplicateMeg>
                  ) : null
                ) : artistNameDupl ? (
                  <O.DuplicateMeg>
                    같은 아티스트명이 이미 존재합니다
                  </O.DuplicateMeg>
                ) : artistNameDuplBtnCnt > 0 ? (
                  <O.DuplicateMeg
                    style={{ color: 'var(--input-border-color)' }}
                  >
                    사용 가능한 아티스트명입니다
                  </O.DuplicateMeg>
                ) : null}
              </S.InputContainer>
            </form>
            <S.InputContainer>
              <S.InputLabel>SNS Link</S.InputLabel>
              <Controller
                control={control}
                name={'snsLink'}
                defaultValue={''}
                rules={{
                  required: '반드시 입력해야 합니다',
                }}
                render={({ field }) => {
                  return (
                    <Input
                      type="url"
                      value={field.value}
                      height={30}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </S.InputContainer>
            <S.InputContainer>
              <S.ArtistIntrodution>
                <S.InputLabel>아티스트 소개</S.InputLabel>
                <Controller
                  control={control}
                  name={'content'}
                  defaultValue={''}
                  rules={{
                    required: '반드시 입력해야 합니다',
                  }}
                  render={({ field }) => {
                    return (
                      <S.ArtistIntrodutionTextarea
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </S.ArtistIntrodution>
            </S.InputContainer>
            {/* 아티스트 등록시 검증단계가 있을 때 동영상 첨부 추가 */}
            {/* <S.InputContainer>
              <S.InputLabel>동영상 첨부</S.InputLabel>
              <S.FileInput
                type="file"
                accept="video/*"
                ref={videoInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files === undefined || files === null) return;
                  const file = files[0];
                  console.log(file);
                  setVideoFile(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                      if (!e.target?.result || e.target?.result === null)
                        return;
                      setVideofilesrc(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Input
                // value={}
                suffix={true}
                width={285}
                height={30}
                buttonText={'찾아보기'}
                disabled={true}
              />
            </S.InputContainer> */}
          </S.ArtistDetail>
          <S.ButtonWarppar>
            <ButtonPrimary75px onClick={() => handleSubmitAll()}>
              등록
            </ButtonPrimary75px>
          </S.ButtonWarppar>
        </S.Section>
      </S.Main>
    </>
  );
}

const ImageButton = styled(S.ButtonWarppar)`
  margin-top: -30px;
`;

const O = {
  Input: styled.input`
    border-radius: 100px;
    outline: none;
    width: 285px;
    height: 30px;
    padding-left: 15px;
    &:focus {
      border: 1.5px solid #8520ca;
    }
  `,
  ButtonSpan: styled.span`
    cursor: pointer;
    color: var(--font-primary--color);
    margin-left: 10px;
  `,
  DuplicateMeg: styled.p`
    margin-left: 15px;
    ${FontStyle.nav};
    color: var(--font-highlight-color);
  `,
};
