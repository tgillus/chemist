import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { NpmGateway } from '../../../../../src/infrastructure/npm/npm-gateway.js';
import { Material } from '../../../../../src/lab/cabinet/material/material.js';
import { InstallProdDeps } from '../../../../../src/operation/synthesis/steps/npm/install-prod-deps.js';
import { Package } from '../../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../../factory/compound.js';

const pkg = td.object<Package>();
const npmGateway = td.object<NpmGateway>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());
const {
  download: { destination: downloadDir },
} = material;

afterEach(() => {
  td.reset();
});

test('provides install production dependencies step description', () => {
  const compress = new InstallProdDeps(material, npmGateway);

  expect(compress.description()).toEqual('Install production dependencies');
});

test('installs production dependencies', async () => {
  const compress = new InstallProdDeps(material, npmGateway);

  await compress.action();

  td.verify(npmGateway.installProdDeps(downloadDir));
});
