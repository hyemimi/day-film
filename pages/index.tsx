import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import ProductList from "@/components/home/ProductList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>검은토끼</title>
      </Head>
      <Banner>
        <Title>검은토끼와 함께 멋진 작품을 만들어보세요</Title>
      </Banner>
      <FilterDiv>
        <Selector name="category">
          <option disabled selected>
            분류
          </option>
          <option>전체</option>
          <option>카메라</option>
          <option>렌즈</option>
          <option>캠코더</option>
          <option>드론, 액션캠</option>
          <option>음향 및 마이크</option>
          <option>조명</option>
          <option>액세서리</option>
          <option>기타</option>
        </Selector>
        <Selector name="how">
          <option disabled selected>
            거래방법
          </option>
          <option>전체</option>
          <option>픽업</option>
          <option>배송</option>
          <option>직거래</option>
        </Selector>
        <Selector name="where">
          <option disabled selected>
            지역
          </option>
          <option>전체</option>
          <option>서울</option>
          <option>경기</option>
        </Selector>
        <Input placeholder="최소" /> <h1>~</h1>
        <Input placeholder="최대" />
        <button>가격대 설정</button>
      </FilterDiv>
      <FilterDiv>
        <div>
          <FilterButton>인기순</FilterButton>
          <FilterButton>가격대순</FilterButton>
          <FilterButton>리뷰순</FilterButton>
          <FilterButton>평점순</FilterButton>
        </div>
        <div>
          <FilterButton>전체보기</FilterButton>
        </div>
      </FilterDiv>
      <ProductList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  justify-content: center;
  width: 1000px;
  padding-left: 550px;
  padding-right: 10px;
`;

const Banner = styled.div`
  background-color: ${(props) => props.theme.pointColor};
  height: 250px;
  width: 900px;
`;
const Input = styled.input`
  position: relative;
  left: 0;
  right: 0;
  padding: 5px 10px;
  padding-left: 5px;
  font-size: 16px;
  background-color: #c9c9c9;
  margin: 5px;

  border: none;
`;
const Title = styled.h1`
  padding-top: 100px;
  text-align: center;
  font-size: 30px;
`;

const Selector = styled.select`
  width: 150px;
  height: 35px;
  padding: 5px 30px 5px 10px;
  outline: 0 none;
  color: #444;
  background-color: #fff;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const FilterDiv = styled.span`
  display: flex;
  justify-content: space-between;
  width: 900px;
`;
const FilterButton = styled.button`
  margin: 10px;
  height: fit-content;
  font-size: 14px;
  padding: 5px 16px 5px 16px;
  text-align: center;
  border: none;
  color: ${(props) => props.theme.textColor};
  background-color: D9D9D9;
  border-radius: 30px;
  cursor: pointer;
  transition-duration: 50ms;
  &: hover {
    color: rgb(254, 254, 254);
    background-color: rgb(63, 63, 63);
  transition-duration: 100ms;
  }}
`;
