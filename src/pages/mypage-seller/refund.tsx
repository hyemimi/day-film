import {
  Title,
  WholeDiv,
  Wrapper,
  StatusDiv,
  StatusBox,
  StatusName,
  Number,
  SearchDiv,
  FilterDiv,
  P,
  FilterName,
  Select,
  Option,
  DeleteDiv,
  WholeLists,
  TabDiv,
  RowDiv,
} from "@/styles/MypageSellerStyle";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import RefundCompleted from "@/src/components/mypage/seller/order/refund/refundCompleted";
import RefundWaiting from "@/src/components/mypage/seller/order/refund/refundWaiting";

const Refund = () => {
  const router = useRouter();
  var ItemList = [
    {
      itemId: 1,
      title: "Canon EOS Rebel T7 18-55mm 번들 세트",
      orderedDate: "23/3/13 16:45",
      deliveryDate: "23-03-15",
      parcelCompany: "cj대한통운",
      waybillNumber: "203310022",
      price: "100000",
      customerName: "슈슈숩",
      productStatus: "환불대기",
      method: "PARCEL",
      orderNum: 1234,
      refundDate: "23-03-16",
    },

    {
      itemId: 2,
      title: "[소니] FE 28-60mm F4-5.6 표준렌즈",
      orderedDate: "23/3/13 16:45",
      deliveryDate: "23/3/15",
      parcelCompany: "cj대한통운",
      waybillNumber: "203310022",
      price: "100000",
      customerName: "슈슈숩",
      productStatus: "환불완료",
      method: "PARCEL",
      orderNum: 1234,
      refundDate: "23-03-16",
    },
    {
      itemId: 3,
      title: "소니 A7M4 미러리스 카메라",
      orderedDate: "23/3/13 16:45",
      deliveryDate: "23/3/15",
      parcelCompany: "cj대한통운",
      waybillNumber: "203310022",
      price: "100000",
      customerName: "슈슈숩",
      productStatus: "환불완료",
      method: "PARCEL",
      orderNum: 1234,
      refundDate: "23-03-16",
    },
    {
      itemId: 4,
      title: "소니 FE 24-70mm GM F2.8",
      orderedDate: "23/3/13 16:45",
      deliveryDate: "23/3/15",
      parcelCompany: "cj대한통운",
      waybillNumber: "203310022",
      price: "100000",
      customerName: "슈슈숩",
      productStatus: "환불완료",
      method: "VISIT",
      orderNum: 1234,
      refundDate: "23-03-16",
    },
  ];

  const [tab, setTab] = useState<string>("환불대기");

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const button: HTMLButtonElement = e.currentTarget;
    setTab(button.value);
  };
  return (
    <Wrapper>
      <WholeDiv>
        <Title>환불관리</Title>
        <StatusDiv>
          <StatusBox>
            <StatusName>환불대기</StatusName>
            <Number>3건</Number>
          </StatusBox>

          <StatusBox>
            <StatusName>환불완료</StatusName>
            <Number>2건</Number>
          </StatusBox>
        </StatusDiv>

        <SearchDiv>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: 20,
              width: 20,
              marginTop: 15,
              marginBottom: 15,
              marginLeft: 20,
              marginRight: 10,
            }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          <P>검색조건</P>

          <FilterDiv>
            <FilterName>거래방법</FilterName>
            <Select>
              <Option>전체</Option>
              <Option>배송</Option>
              <Option>방문</Option>
            </Select>
          </FilterDiv>
          <FilterDiv>
            <FilterName>환불신청일</FilterName>
            <Select>
              <Option>전체</Option>
              <Option>오늘</Option>
              <Option>지난 7일</Option>
              <Option>지난 30일</Option>
              <Option>지난 1년</Option>
            </Select>
          </FilterDiv>
          <FilterDiv>
            <FilterName>상품명</FilterName>
            <Select>
              <Option>전체</Option>
              {ItemList.map((item: any) => (
                <Option key={item.itemId}>{item.title}</Option>
              ))}
            </Select>
          </FilterDiv>
        </SearchDiv>
        <WholeLists>결제완료목록(총 {1}개)</WholeLists>

        {tab == "환불대기" ? (
          <>
            <TabDiv>
              <StateButton onClick={handleTabClick} value="환불대기">
                환불대기
              </StateButton>
              <WhiteButton onClick={handleTabClick} value="환불완료">
                환불완료
              </WhiteButton>
            </TabDiv>
            <RefundWaiting ItemList={ItemList} />
          </>
        ) : null}
        {tab == "환불완료" ? (
          <>
            <TabDiv>
              <WhiteButton onClick={handleTabClick} value="환불대기">
                환불대기
              </WhiteButton>
              <StateButton onClick={handleTabClick} value="환불완료">
                환불완료
              </StateButton>
            </TabDiv>
            <RefundCompleted ItemList={ItemList} />
          </>
        ) : null}
      </WholeDiv>
    </Wrapper>
  );
};
export default Refund;

const StateButton = styled.button`
  width: 480px;
  margin: 0;
  padding: 10px;
  border: none;
  font-size: 20px;

  background: ${(props) => props.theme.pointColor};
  &:active {
    background-color: #${(props) => props.theme.pointColor};
  }
`;

const WhiteButton = styled.button`
  width: 480px;
  margin: 0;
  padding: 10px;
  border: 1px solid #d9d9d9;
  font-size: 20px;
  background: white;
`;
