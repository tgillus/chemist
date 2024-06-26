import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import type { Variables } from '../../src/operation/variables.js';

export const variablesFactory = Factory.define<Variables>(() => ({
  branch: faker.git.branch(),
}));
