import { router } from './Router'
import { expect } from 'chai';
import Block from './Block';
import Route from './Route'

describe('Router', () => {
  const BlockMock = class {} as unknown as Block;

  it('use() возвращает instance класса Router(т.к. используется паттерн singlton) ', () => {
    const result = router.use('/', BlockMock);
    expect(result).to.eq(router);
  });

  it('getRoute() возвращает существующий роут', () => {
    router.use('/logout', BlockMock);
    const existedRoute = router.getRoute('/logout');
    expect(existedRoute instanceof Route).to.eq(true);
  });

  it('go() добавляет запись в историю', () => {
    router.go('/login');
    expect(window.location.pathname).to.eq('/login');
  });
});
