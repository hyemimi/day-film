import Head from "next/head";
import { Inter } from "@next/font/google";
import styled from "styled-components";
import ProductList from "@/src/components/home/ProductList";
import { Wrapper } from "@/styles/Wrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AllProductQueryParam,
  useGetAllProduct,
} from "@/src/hooks/api/product/GetAllProduct";

import Pagination from "react-js-pagination";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const logoVariants = {
  active: {
    backgroundColor: "rgba(0,0,0,0.3)",

    duration: 2,
  },
};

/* 카테고리 리스트 입니다*/
const CategoryList = [
  { value: "CAMERA", name: "카메라" },
  { value: "LENS", name: "렌즈" },
  { value: "CAMCORDER", name: "캠코더" },
  { value: "DRONE", name: "드론, 액션캠" },
  { value: "MIC", name: "음향 및 마이크" },
  { value: "LIGHT", name: "조명" },
  { value: "ACCESSORY", name: "액세서리" },
  { value: "ETC", name: "기타" },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState<AllProductQueryParam>({
    page: 0,
    size: 9,
  });
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [selectedMet, setSelectedMet] = useState<string>("");
  const [selectedWhe, setSelectedWhe] = useState<string>("");
  const { items, refetch } = useGetAllProduct(search);

  /* paging 구현 */

  const [page, setPage] = useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => setSearch({ ...search, page: page - 1 }), [page]);

  useEffect(() => {
    refetch();
  }, [search]);

  console.log("param ", search);

  const onSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.name === "category") {
      /* 카테고리 필터 */
      setSelectedCat(event.currentTarget.value);
      if (event.currentTarget.value === "전체") {
        delete search.category;
        setSearch({ ...search });
      } else {
        setSearch({ ...search, category: event.currentTarget.value });
      }
    }
    if (event.currentTarget.name === "method") {
      /* 거래방법 필터 */
      setSelectedMet(event.currentTarget.value);
      //setSearch({ ...search, method: event.currentTarget.value });
    }
    if (event.currentTarget.name === "where") {
      /* 지역 필터 */
      setSelectedWhe(event.currentTarget.value);
      //setSearch({ ...search, where: event.currentTarget.value });
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>데이필름</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        /> */}
      </Head>
      <Banner variants={logoVariants} whileHover="active">
        <Title>데이필름과 함께 멋진 작품을 만들어보세요</Title>
      </Banner>
      <FilterDiv>
        <Selector
          onChange={onSelectorChange}
          name="category"
          value={selectedCat}
        >
          <option value={"전체"} defaultChecked={true}>
            전체
          </option>
          {CategoryList.map((category) => (
            <option key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </Selector>
        <Selector name="method">
          <option disabled value="거래방법">
            거래방법
          </option>
          <option>전체</option>
          <option>픽업</option>
          <option>배송</option>
          <option>직거래</option>
        </Selector>
        <Selector name="where">
          <option disabled value="지역">
            지역
          </option>
          <option>전체</option>
          <option>서울</option>
          <option>경기</option>
        </Selector>

        <Input placeholder="최소금액" />
        <Span>~</Span>
        <Input placeholder="최대금액" />
        <button>가격설정</button>
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
      {items && <ProductList items={items} />}
      <footer>
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={9}
            totalItemsCount={10}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            hideNavigation={true}
          ></Pagination>
        </PaginationBox>
      </footer>
    </Wrapper>
  );
}

//linear-gradient(, rgba(0, 0, 0, 0));
const Banner = styled(motion.div)`
  height: 250px;
  width: 900px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(211, 234, 216, 1),
    rgba(0, 0, 0, 0)
  );
`;
const Input = styled.input`
  width: 180px;
  height: 35px;
  padding: 5px 10px;
  background: #f5f5f5;
  border: 1px solid white;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  color: #2b2b2b;
`;
const Span = styled.span`
  justify-content: center;
  align-items: center;
  font-size: 30px;
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

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${(props) => props.theme.pointColor};
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
