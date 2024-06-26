import { cosmiconfigSync } from 'cosmiconfig';
import type { ConfigSubstance } from '../../lab/cabinet/material/substance.js';

export class Loader {
  load = (): ConfigSubstance | undefined =>
    cosmiconfigSync('chemist').search()?.config;
}
