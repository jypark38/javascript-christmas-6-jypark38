import Benefit from '../src/model/Benefit';

describe('Benefit', () => {

    describe('error',()=>{
        it('에러테스트', () => {
            expect(()=>new Benefit(50)).toThrow('[ERROR]')
            expect(()=>new Benefit(0)).toThrow('[ERROR]')
        })
    })

    describe('christmas',()=>{
        it('크리스마스 이전',()=>{
            const benefit = new Benefit(9);
            const result = benefit.christmas;

            expect(result.discount).toBe(1000+800)
        })
        it('크리스마스 당일',()=>{
            const benefit = new Benefit(25);
            const result = benefit.christmas;

            expect(result.discount).toBe(1000+2400)
        })
        it('크리스마스 이후',()=>{
            const benefit = new Benefit(26);
            const result = benefit.christmas;

            expect(result.discount).toBe(0)
        })
    })

  describe('getWeeklyOff', () => {
    it('주말 할인 테스트 (메인메뉴)', () => {
      const menuData = [['해산물파스타', 2], ['바비큐립', 1]];
      const benefit = new Benefit(9); // 주말

      const result = benefit.getWeeklyOff(menuData);

      expect(result.topic).toBe('주말 할인');
      expect(result.discount).toBe(2023*3);
    });

    it('평일 할인 테스트 (디저트)', () => {
      const menuData = [['초코케이크', 2], ['아이스크림', 1]];
      const benefit = new Benefit(5);

      const result = benefit.getWeeklyOff(menuData);

      expect(result.topic).toBe('평일 할인');
      expect(result.discount).toBe(2023*3);
    });

    it('주말 할인 테스트 (디저트)', () => {
      const menuData = [['초코케이크', 2], ['아이스크림', 1]];
      const benefit = new Benefit(9);

      const result = benefit.getWeeklyOff(menuData);

      expect(result.topic).toBe('주말 할인');
      expect(result.discount).toBe(0);
    });
  });

  describe('getPresent', () => {
    it('증정이벤트 120000원 이상일때', () => {
      const totalPrice = 130000;
      const benefit = new Benefit(15); // Any date

      const result = benefit.getPresent(totalPrice);

      expect(result.topic).toBe('증정 이벤트');
      expect(result.discount).toBe(25000);
    });

    it('증정이벤트 120000원 이하일때', () => {
      const totalPrice = 110000;
      const benefit = new Benefit(15); // Any date

      const result = benefit.getPresent(totalPrice);

      expect(result.topic).toBe('증정 이벤트');
      expect(result.discount).toBe(0);
    });
  });

  // Add more test cases for other methods in Benefit class

  describe('getBadge', () => {
    it('뱃지 테스트', () => {
      const benefit = new Benefit(15); // Any date

      expect(benefit.getBadge(25000)).toBe('산타');
      expect(benefit.getBadge(15000)).toBe('트리');
      expect(benefit.getBadge(7000)).toBe('별');
      expect(benefit.getBadge(3000)).toBe('없음');
      expect(benefit.getBadge(0)).toBe('없음');
    });
  });
});

