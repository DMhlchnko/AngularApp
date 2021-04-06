export class Relation{
    constructor(public Id?:number,
        public Name?:string,
        public FullName?:string,
        public TelephoneNumber?:string,
        public Email?:string,
        public Street?:string,
        public City?:string,
        public Country?:string,
        public PostalCode?:string,
        public StreetNumber?:number,
        public Categories?:Array<string>){}
}