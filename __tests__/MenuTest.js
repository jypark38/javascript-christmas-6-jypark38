import Menu from "../src/model/Menu";

describe('Menu', () => {
    // ... 이전에 작성한 테스트 코드 ...
  
    describe('constructor', () => {
      it('에러 검사', () => {
        expect(() => new Menu('InvalidOrder')).toThrow('[ERROR]');
        expect(() => new Menu('아메리카노-2,라떼-3')).toThrow('[ERROR]'); // 없는 메뉴
        expect(() => new Menu('제로콜라-2,레드와인-3')).toThrow('[ERROR]'); // 음료만 주분
      });
    });

    describe('menuList', () => {
        it('메뉴리스트', () => {
            const menu = new Menu('해산물파스타-2,크리스마스파스타-3'); // Valid input
        
            expect(menu.menuList).toStrictEqual(["해산물파스타 2개","크리스마스파스타 3개"]);
        });
    })
  
    describe('totalPrice', () => {
        it('할인전 금액 검사', () => {
          const menu = new Menu('해산물파스타-2,크리스마스파스타-3'); // Valid input
    
          expect(menu.totalPrice).toBe(35000*2 + 25000*3);
        });
      });
  
    // Add more test cases for other methods in Menu class
  });
  