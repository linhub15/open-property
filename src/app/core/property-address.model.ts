export class PropertyAddress {
  public suite: string;
  public house: string;
  public street: string;

  constructor(suite: string, house: string, street: string) {
    this.suite = suite;
    this.house = house;
    this.street = street.toUpperCase();
    this.street = this.street.replace("AVE", "AVENUE");
    this.street = this.street.replace("ST", "STREET");
    if (!this.street.includes(" NW")) {
      this.street = this.street.concat(" NW");
    }
  }

  isApartment(): boolean {
    if (this.hasSuite() && this.hasHouse() && this.hasStreet()) {
      return true;
    }
    else {
      return false;
    }
  }

  isHouse(): boolean {
    if (!this.hasSuite() && this.hasHouse() && this.hasStreet()) {
      return true;
    }
    else {
      return false;
    }
  }


  hasSuite(): boolean {
    switch (this.suite.toString()) {
      case null:
      case undefined:
      case "":
        return false;
      default:
        return true;
    }
  }

  hasHouse(): boolean {
    switch (this.house.toString()) {
      case null:
      case undefined:
      case "":
        return false;
      default:
        return true;
    }
  }

  hasStreet(): boolean {
    switch (this.street) {
      case null:
      case undefined:
      case "":
        return false;
      default:
        return true;
    }
  }

  makeApartmentUri(BaseUrl: string): string {
    return BaseUrl.concat(
      "?suite=", this.suite,
      "&house_number=", this.house,
      "&street_name=", this.street);
  }

  makeHouseUri(BaseUrl: string): string {
    return BaseUrl.concat(
      "?house_number=", this.house,
      "&street_name=", this.street);
  }
}
