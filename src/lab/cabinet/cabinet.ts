import { Variables } from '../../operation/variables.js';
import { Loader } from '../../vendor/loader/loader.js';
import { Is } from '../../vendor/type/is.js';
import { CliSubstance, ConfigSubstance } from './material/substance.js';

export class Cabinet {
  constructor(
    private readonly loader: Loader,
    private readonly is: Is
  ) {}

  config(): ConfigSubstance {
    const configSubstance = this.loader.load();

    if (this.is.nullOrUndefined(configSubstance)) {
      throw new Error('chemist configuration not found');
    }

    return {
      ...configSubstance,
      download: configSubstance.download ?? { destination: '.chemist' },
    };
  }

  variables({ branch }: Variables = { branch: 'main' }): CliSubstance {
    return { git: { branch } };
  }

  static build() {
    return new Cabinet(new Loader(), new Is());
  }
}
