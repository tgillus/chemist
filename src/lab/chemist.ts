import { CatalogListing } from '../operation/catalog.js';
import { Variables } from '../operation/variables.js';
import { LabTech } from './lab-tech.js';
import { Lab } from './lab.js';

export class Chemist {
  constructor(
    private readonly lab: Lab,
    private readonly tech: LabTech
  ) {}

  run = async (listing: CatalogListing, variables?: Variables) =>
    await this.lab.run(this.tech.prep(listing, variables));

  static from = (lab: Lab) => new Chemist(lab, LabTech.build());
}
