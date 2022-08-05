interface IWX {
  chooseImage: (value: Record<string, any>) => void;
  ready: (callback: Function) => void;
  [key: string]: any;
}

declare var wx: IWX;
