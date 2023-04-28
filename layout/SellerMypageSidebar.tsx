import { useRouter } from "next/router";
import styled from "styled-components";
import homeIcon from "../public/home.png";
import likeIcon from "../public/heart.png";
import alarmIcon from "../public/bell.png";
import Image from "next/image";
import helpIcon from "../public/help.png";
import loginIcon from "../public/login.png";
import cartIcon from "../public/cart.png";
export default function SellerMypageSidebar() {
  const router = useRouter();
  let user_id = 1; // 임시데이터

  const SellerMypageSidebar = [
    { ref: "/", label: "홈", width: 32, height: 32, icon: homeIcon },
    {
      ref: null,
      label: "상품관리",
      width: 32,
      height: 32,
      icon: likeIcon,
      undermenu: [
        { ref: "/mypage-seller/addPlan", label: "상품조회/수정" },
        { ref: "/mypage-seller/addItem", label: "상품등록" },
      ],
    },

    {
      ref: null,
      label: "주문/배송",
      width: 30,
      height: 30,
      icon: cartIcon,
      undermenu: [
        { ref: "/mypage-seller/orderedLists", label: "주문내역조회" },
        { ref: "/mypage-seller/rental", label: "대여관리" },
        { ref: "/mypage-seller/refund", label: "환불관리" },
        { ref: "/mypage-seller/return", label: "반납관리" },
      ],
    },
    {
      ref: null,
      label: "정산",
      width: 30,
      height: 30,
      icon: alarmIcon,
      undermenu: [{ ref: "/mypage-seller/calculate", label: "정산현황" }],
    },
    {
      ref: null,
      label: "고객관리",
      width: 30,
      height: 30,
      icon: alarmIcon,
      undermenu: [
        { ref: "/mypage-seller/customer", label: "고객문의" },
        { ref: "/mypage-seller/review", label: "상품평" },
      ],
    },
    {
      ref: null,
      label: "판매자정보",
      width: 30,
      height: 30,
      icon: alarmIcon,
      undermenu: [
        { ref: "/mypage-seller/review", label: "계정정보" },
        { ref: "/mypage-seller/review", label: "비밀번호변경" },
        { ref: "/mypage-seller/review", label: "주소록/배송정보 관리" },
      ],
    },
    {
      ref: null,
      label: "로그아웃",
      width: 30,
      height: 30,
      icon: loginIcon,
    },
  ];
  return (
    <>
      {SellerMypageSidebar.map((menu) => (
        <>
          <MenuButton>
            <Image
              width={menu.width}
              height={menu.height}
              src={menu.icon}
              alt=""
            />
            {menu.label}
          </MenuButton>
          {menu.undermenu &&
            menu.undermenu.map((undermenu) => (
              <UnderMenuButton onClick={() => router.push(undermenu.ref)}>
                {undermenu.label}
              </UnderMenuButton>
            ))}
        </>
      ))}
    </>
  );
}

const MenuButton = styled.div`
  height: fit-content;
  font-size: 20px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding-left: 30px;
`;
const UnderMenuButton = styled.div`
  height: fit-content;
  font-size: 15px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding-left: 30px;
`;
