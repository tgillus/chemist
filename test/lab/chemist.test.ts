import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Chemist } from '../../src/lab/chemist.js';
import type { LabTech } from '../../src/lab/lab-tech.js';
import type { Operation } from '../../src/operation/operation.js';
import type { Runner } from '../../src/vendor/runner/runner.js';
import { variablesFactory } from '../factory/variables.js';

const runner = td.object<Runner>();
const tech = td.object<LabTech>();
const operation = td.object<Operation>();
const variables = variablesFactory.build();

beforeEach(() => {
  td.when(tech.prep('synth', variables)).thenReturn<Operation>(operation);
});

afterEach(() => {
  td.reset();
});

test('runs an operation', async () => {
  const chemist = new Chemist(runner, tech);

  await chemist.run('synth', variables);

  td.verify(runner.run(operation));
});

test('builds a chemist', () => {
  expect(Chemist.build()).toBeInstanceOf(Chemist);
});
