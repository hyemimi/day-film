import { Wrapper } from "@/components/common/Wrapper";
import UseUserSignupMutation from "@/hooks/api/auth/UserSignUpMutation";
import { useGetAllProduct } from "@/hooks/api/product/GetAllProduct";
import { useQuery } from "@tanstack/react-query";

export default function test() {
  // 커스텀 useMutation 훅 불러오기
  const {
    mutate: loginMutate,
    data: loginMutationData,
    error: loginMutationError,
  } = UseUserSignupMutation();

  const onSignUpClick = () => {
    loginMutate({
      email: "hyemi7375@gmail.com",
      nickname: "testt",
      pw: "abc1234",
    });
  };

  return (
    <Wrapper>
      <button onClick={onSignUpClick}>클릭</button>
    </Wrapper>
  );
}
