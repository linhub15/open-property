export class PropertyAddress {
  public suite: string;
  public house: string;
  public street: string;

  constructor(suite: string, house: string, street: string) {
    this.suite = suite;
    this.house = house;
    this.street = street.toUpperCase();
    this.street = this.street.replace('AVE', 'AVENUE');
    this.street = this.street.replace('ST', 'STREET');
    if (!this.street.includes(' NW')) {
      this.street = this.street.concat(' NW');
    }
  }

  isApartment(): boolean {
    return this.suite && this.house && this.street
      ? true : false;
  }

  isHouse(): boolean {
    return !this.suite && this.house && this.street
      ? true : false;
  }

  makeApartmentUri(baseUrl: string): string {
    const suite = this.suite.replace('\s', '+');
    const house = this.house.replace('\s', '+');
    const street = this.street.replace(' ', '+');
    return `${baseUrl}?suite=${suite}&house_number=${house}&street_name=${street}`;
  }

  makeHouseUri(baseUrl: string): string {
    const house = this.house.replace('\s', '+');
    const street = this.street.replace(/\s/, '+');
    return `${baseUrl}?house_number=${house}&street_name=${street}`;
  }
}
