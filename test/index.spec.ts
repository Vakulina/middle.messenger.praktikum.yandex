import { expect } from 'chai';
import { Button } from 'src/components/Button';
import { render } from '../src/services/renderBlock';

describe('Typescript + Babel usage suite', () => {
  const testBlock = new Button({text: '<p>Hello mocha</p>'})
  it('should return string correctly', () => {
    expect(render( testBlock , 'root'), 'Hello mocha');
  });
});
