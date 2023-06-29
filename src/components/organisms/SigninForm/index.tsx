//サインインフォーム
import { useForm } from "react-hook-form";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import Text from "../../Atoms/Text";
import Box from "../../../components/layout/Box";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../themes";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  .circles {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }

  .circles li {
    position: relative;
    list-style: none;
    z-index: 1;
    width: 30px;
    height: 20px;
    background: #06deff82;
    animation: animate 15s linear infinite;
    bottom: -100%;
    left: -80%;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

const SigninContainer = styled.div`
  position: relative; /* positionを指定する必要があります */
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* フォームを最前面に表示するために2に設定 */
`;

const CirclesList = styled.ul`
  overflow: hidden;
  position: absolute;
  width: 150vh;
  height: 150vh;
  border-radius: 30px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 30px;
`;


export type SigninFormData = {
  username: string;
  password: string;
};

//サインインボタンが押された時の処理
interface SigninFormProps {
  onSignin?: (username: string, password: string) => void;
}

const SigninForm = ({ onSignin }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;
    onSignin && onSignin(username, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SigninContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={1}>
            <Input
              {...register("username", { required: true })}
              name="username"
              type="text"
              placeholder="ユーザー名"
              hasError={!!errors.username}
            />
            {errors.username && (
              <Text color="danger" variant="small" paddingLeft={1}>
                ユーザー名は必須です
              </Text>
            )}
          </Box>
          <Box marginBottom={2}>
            <Input
              {...register("password", { required: true })}
              name="password"
              type="password"
              placeholder="パスワード"
              hasError={!!errors.password}
            />
            {errors.password && (
              <Text color="danger" variant="small" paddingLeft={1}>
                パスワードは必須です
              </Text>
            )}
          </Box>
          <Button width="100%" type="submit">
            サインイン
          </Button>
        </form>
        <CirclesList className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </CirclesList>
      </SigninContainer>
    </ThemeProvider>
  );
};

export default SigninForm;
