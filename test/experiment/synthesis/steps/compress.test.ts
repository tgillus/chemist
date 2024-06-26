import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Material } from '../../../../src/lab/cabinet/material/material.js';
import { Compress } from '../../../../src/operation/synthesis/steps/compress.js';
import { FileSystem } from '../../../../src/vendor/file-system/file-system.js';
import type { Package } from '../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../factory/compound.js';

const pkg = td.object<Package>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());
const {
  name,
  download: { destination: downloadDir },
  compression: { destination, include },
} = material;
const version = '1.0.0';

beforeEach(() => {
  td.when(pkg.packageVersion(downloadDir)).thenResolve(version);
});

afterEach(() => {
  td.reset();
});

test('provides compress step description', () => {
  const compress = new Compress(material, FileSystem.build(), pkg);

  expect(compress.description()).toEqual(
    `Construct artifact in ${compound.compression.destination}/`
  );
});

test('makes compression destination directory', async () => {
  const fs = td.object<FileSystem>();
  const compress = new Compress(material, fs, pkg);

  await compress.action();

  td.verify(
    fs.zip(`${destination}/${name}-${version}.zip`, include, downloadDir)
  );
});
