declare module "uuid" {
  function v4(options?: v4Options, buffer?: any, offset?: number):string;
  interface v4Options {
    random?: number[];
    rng?: any;
  }
}
