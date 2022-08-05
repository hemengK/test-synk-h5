import { default as VConsole } from 'vconsole';

const consoleEnvs: string[] = ['dev', 'test', 'uat'];

if (consoleEnvs.indexOf(process.env.env as string) !== -1) {
  var vConsole = new VConsole();
}
