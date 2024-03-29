import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import UserMypageSidebar from "./UserMypageSidebar";
import SellerMypageSidebar from "./SellerMypageSidebar";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { UserState } from "@/src/stores/recoil/atoms";
import { motion } from "framer-motion";
export default function Sidebar() {
  const router = useRouter();
  let user_id = 1; // 임시데이터
  const [user, setUser] = useRecoilState(UserState);
  const { isuser, ismypage } = user;
  const logoVariants = {
    normal: {
      scale: 1,
    },
    active: {
      scale: 1.2,
    },
  };
  /* 사이드바 속성 */
  const menuList = [
    { ref: "/", label: "홈", width: 32, height: 32 },
    { ref: "/like", label: "좋아요", width: 30, height: 30 },
    { ref: "/cart", label: "장바구니", width: 30, height: 30 },
    { ref: "/", label: "알림", width: 30, height: 30 },
    {
      ref: "/userLogin",
      label: "로그인",
      width: 30,
      height: 30,
    },
  ];

  return (
    <Side>
      <Logo variants={logoVariants} whileHover="active" initial="normal">
        <Link href={"/"}>
          <Image
            width="100"
            height="100"
            src="/DayFilmLight.png"
            alt="logo"
          ></Image>
        </Link>
      </Logo>
      <Div>
        {!ismypage ? (
          menuList.map((menu) => (
            <>
              <MenuButton onClick={() => router.push(menu.ref)}>
                {menu.label}
              </MenuButton>
            </>
          ))
        ) : isuser && ismypage ? (
          <UserMypageSidebar />
        ) : (
          <SellerMypageSidebar />
        )}
      </Div>
    </Side>
  );
}
const Div = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Side = styled.div`
  position: fixed;
  padding-top: 30px;
  padding-left: 10px;
  left: 0px;
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.pointColor};
  border: none;
  /* -ms-overflow-style: none; */
  /* border: solid 1px white; */
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  overflow-y: scroll;
`;

const Logo = styled(motion.div)`
  margin: 10px;
  padding-right: 50px;
  padding-left: 50px;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 50px;
  }
`;

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
