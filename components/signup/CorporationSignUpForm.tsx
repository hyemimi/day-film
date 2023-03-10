import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledButton } from "../common/Button";
import { useState, useCallback, InputHTMLAttributes } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

interface SignUp {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

const CorporationSignUpForm = () => {
  //react-hook-form 사용을 위한 함수 호출
  const { register, handleSubmit } = useForm();

  //각 입력의 조건 확인
  const [enteredEmail, setEnteredEmail] = useState<string>(
    "dayfilm@dayfilm.com"
  );
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  //오류메시지
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");

  // 유효성 검사
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log({ enteredEmail, nickname, password, passwordConfirm });
      // try {
      //   await axios
      //     .post(REGISTER_USERS_URL, {
      //       username: name,
      //       password: password,
      //       email: email,
      //     })
      //     .then((res) => {
      //       console.log('response:', res)
      //       if (res.status === 200) {
      //         router.push('/sign_up/profile_start')
      //       }
      //     })
      // } catch (err) {
      //   console.error(err)
      // }
    },
    [enteredEmail, nickname, password, router]
  );
  //사업자 등록번호 확인
  async function corporationNumberHandler() {
    try {
      const response = await axios.post("/user?ID=12345");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //이메일
  const emailChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEnteredEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("올바르지 않은 이메일 형식입니다. 다시 확인해 주세요.");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식입니다.");
        setIsEmail(true);
      }
    },
    []
  );

  //비밀번호
  const passwordChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요.");
        setIsPassword(true);
      }
    },
    []
  );

  // 비밀번호 확인
  const passwordConfirmChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호와 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호와 다릅니다. 다시 확인해 주세요.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // 닉네임
  const nicknameChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setNicknameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setIsNickname(false);
      } else {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsNickname(true);
      }
    },
    []
  );

  return (
    <SytledForm onSubmit={submitHandler}>
      <Div>
        <div>
          <StyledLabel htmlFor="corporation-number">
            사업자 등록번호*
          </StyledLabel>
          <CheckDiv>
            <StyledInput
              id="number"
              type="integer"
              placeholder="-없이 숫자만 입력"
              onChange={passwordConfirmChangeHandler}
            />
            <CheckButton onClick={corporationNumberHandler}>확인</CheckButton>
          </CheckDiv>
        </div>

        <div>
          <StyledLabel htmlFor="representator-name">대표자명*</StyledLabel>
          <StyledInput
            id="representator-name"
            type="text"
            placeholder="대표자명"
          />
        </div>
        <div>
          <StyledLabel htmlFor="brand-name">상호*</StyledLabel>
          <StyledInput id="brand-name" type="text" placeholder="상호" />
        </div>

        <div>
          <StyledLabel htmlFor="password">사업장 주소*</StyledLabel>
          <CheckDiv>
            <StyledInput
              id="address-number"
              type="integer"
              onChange={passwordChangeHandler}
              placeholder="우편번호"
            />
            <CheckButton>
              주소
              <br /> 검색
            </CheckButton>
          </CheckDiv>
          <StyledInput id="address-basic" type="text" placeholder="기본주소" />
          <StyledInput id="address-detail" type="text" placeholder="상세주소" />
        </div>

        <div>
          <StyledLabel htmlFor="passwordCheck">입점 담당자명*</StyledLabel>
          <StyledInput
            id="passwordCheck"
            type="password"
            placeholder="입점 담당자명"
            onChange={passwordConfirmChangeHandler}
          />
        </div>

        <div>
          <StyledLabel htmlFor="account-number">정산계좌*</StyledLabel>
          <CheckDiv>
            <StyledInput
              id="account-number"
              type="integer"
              placeholder="-없이 숫자만 입력"
            />
            <CheckButton>인증</CheckButton>
          </CheckDiv>
        </div>

        <StyledHr />
        <div>
          <StyledLabel htmlFor="email">입점 담당자 이메일*</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            placeholder="이메일"
            onChange={emailChangeHandler}
          />
          <br />
          {enteredEmail.length > 0 && (
            <StyledSpan className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </StyledSpan>
          )}
        </div>

        <div>
          <StyledLabel htmlFor="password">비밀번호*</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            placeholder="숫자, 영문자, 특수문자 조합 8글자 이상"
            onChange={passwordChangeHandler}
          />
          <br />
          {password.length > 0 && (
            <StyledSpan
              className={`message ${isPassword ? "success" : "error"}`}
            >
              {passwordMessage}
            </StyledSpan>
          )}
        </div>

        <div>
          <StyledLabel htmlFor="passwordCheck">비밀번호 확인*</StyledLabel>
          <StyledInput
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            onChange={passwordConfirmChangeHandler}
          />
          <br />
          {passwordConfirm.length > 0 && (
            <StyledSpan
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </StyledSpan>
          )}
        </div>
      </Div>

      <Div>
        <StyledH1>약관동의</StyledH1>
        <input type="checkbox" name="terms" />
        <StyledLabel htmlFor="allTermsAgree">
          약관에 모두 동의합니다.
        </StyledLabel>
        <StyledHr />

        <div>
          <input name="terms" type="checkbox" />
          <Link href="">
            <StyledLabel>서비스 이용 약관(필수)</StyledLabel>
          </Link>
        </div>
        <div>
          <input name="terms" type="checkbox" />
          <Link href="">
            <StyledLabel>개인정보 처리방침(필수)</StyledLabel>
          </Link>
        </div>
        <div>
          <Link href="#">
            <input name="terms" type="checkbox" />

            <StyledLabel>위치기반 서비스 이용 약관(필수)</StyledLabel>
          </Link>
        </div>
        <div>
          <input name="terms" type="checkbox" />
          <Link href="">
            <StyledLabel>프로모션 알림 메일 및 SMS 수신(선택)</StyledLabel>
          </Link>
        </div>
      </Div>

      <StyledButton type="submit">가입하기</StyledButton>
    </SytledForm>
  );
};
export default CorporationSignUpForm;

const SytledForm = styled.form`
  border-radius: 0.4em;
  margin: auto;
  width: 20rem;
  justify-content: center;
  text-align: center;
`;

const StyledLabel = styled.label`
  text-align: left;
  line-height: 2rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  text-align: left;
  margin-bottom: 0.5rem;
`;

const Div = styled.div`
  margin: 2.5rem auto;
  text-align: left;
`;

const StyledH1 = styled.h1`
  font-weight: 500;
  line-height: 2rem;
`;

const StyledHr = styled.hr`
  margin: 1rem irem 0 0;
`;

const StyledSpan = styled.span`
  font-size: small;
  color: ${(props) =>
    props.className == "message error" ? "#e01c1c" : "#02A913"};
`;

const CheckButton = styled.button`
  margin-left: 1rem;
  height: 2.5rem;
  width: 4rem;
  background: #b9d9c0;
  border-radius: 10px;
  border: 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #d9d9d9;
  }
`;

const CheckDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
