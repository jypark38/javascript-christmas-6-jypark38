## view

### input view

- intro
- readDate
- readUserMenu

<hr>

### output view

가격 출력할때 쉼표넣기

- printMenu
- printTotalPrice
- printGiveaway
- printBenefits
- printTotalBenefits
- printDiscountPrice
- printEventBadge

<hr>

### validator

- date

  - 숫자만 입력했는지 검사
  - 날짜 검사 `1<= date <= 31`

- menu
  - input 메뉴
  - input 메뉴 형식 검사
  - input 메뉴 중복 검사
  - 음료만 주문했는지 검사
  - 메뉴 개수 숫자 검사
    - 각 메뉴 숫자인지
    - 각 메뉴 0이상인지
    - 총 개수 20개 이하인지 검사

## discount

- 총 금액 10000원 이상부터 할인 적용
