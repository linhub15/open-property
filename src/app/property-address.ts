export class PropertyAddress {
    public suite: number;
    public house: number;
    public street: string;

    constructor(suite: number, house: number, street: string){
        this.suite = suite;
        this.house = house;
        this.street = street;
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


    hasSuite():boolean {
        switch(this.suite.toString()){
            case null:
            case undefined:
            case "":
                return false;
            default:
                return true;
        }
    }

    hasHouse():boolean {
        switch(this.house.toString()){
            case null:
            case undefined:
            case "":
                return false;
            default:
                return true;
        }
    }

    hasStreet(): boolean {
        switch(this.street){
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
            "?suite=",this.suite.toString(),
            "&house_number=",this.house.toString(),
            "&street_name=",this.street.toUpperCase());
    }

    makeHouseUri(BaseUrl: string): string {
        return BaseUrl.concat(
            "?house_number=",this.house.toString(),
            "&street_name=",this.street.toUpperCase());
    }
}
