declare module 'uuid' {
  function v4(options?: v4Options, buffer?: any, offset?: number): string;
  /* eslint-disable  @typescript-eslint/naming-convention */
  interface v4Options {
    random?: number[];
    rng?: any;
  }
}

declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  const template: TemplateDelegate;
  export default template;
}

declare module '*.module.scss';
declare module '*.css';
declare module '*.jpg';
declare module '*.svg';
