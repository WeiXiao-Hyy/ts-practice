interface IConfig {
  a: string | number;
}

// const legacy: IConfig = {};

const legacyAs = {} as IConfig;

console.log(legacyAs.a)
