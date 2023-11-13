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
- pritnPresentation
- printBenefits
- printTotalBenefits
- printDiscountPrice
- printEventBadge

<hr>

### validator

- date

  - 숫자만 입력했는지 검사
    - invalidDate
  - 날짜 검사 `1<= date <= 31`
    - invalidDate

- menu

  - input 메뉴 형식 검사
    - invalidOrder
  - input 메뉴 중복 검사

    - invalidOrder

  - 음료만 주문했는지 검사

    - invalidOrder

  - 메뉴 개수 숫자 검사

    - 각 메뉴 숫자인지

      - invalidOrder

    - 각 메뉴 0이상인지
      - invalidOrder
    - 총 개수 20개 이하인지 검사
      - invalidTotalRange

## discount

- 총 금액 10000원 이상부터 할인 적용

## flow

날짜 입력 -> 모델 생성 -> 모델에서 validate 검사 -> 오류나면 입력시점으로 돌아감

메뉴 입력 -> 모델 생성 -> 모델에서 validate 검사 -> 오류나면 입력시점으로 돌아감
