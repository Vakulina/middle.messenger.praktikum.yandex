declare module "uuid" {
  function v4(options?: v4Options, buffer?: any, offset?: number): string;
  interface v4Options {
    random?: number[];
    rng?: any;
  }
}

declare module "*.hbs" {
  import { TemplateDelegate } from 'handlebars';

  const template: TemplateDelegate;
  export default template;
}

declare module "*.module.scss";
declare module "*.css";
