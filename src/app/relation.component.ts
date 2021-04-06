import { Component, OnInit } from '@angular/core';
import { Country } from './_models/country.model';
import { Relation } from './_models/relation.model';
import { HttpService } from './_services/service.http';
import { NgForm} from '@angular/forms';
import { Category } from './_models/category.model';

@Component({
    selector: 'app',
    templateUrl: './relation.component.html',
    providers: [HttpService]
})
export class RelationComponent implements OnInit
{
    relations: Array<Relation>;
    relation: Relation = new Relation();
    countries:Array<Country>;
    categories:Array<Category>;
    tableMode:boolean = true;
    filterByCategoryName!:string;
    sortByProperty!:string;
    orderBy!:number;
    relationsToDelete:Array<Relation> = [];
 
    constructor(private http:HttpService)
    {
        this.categories = new Array<Category>();
        this.relations = new Array<Relation>();
        this.countries = new Array<Country>();
    }
   
    ngOnInit(): void {
        this.LoadCategories();
        this.LoadRelations();
        this.LoadCountries();
    }

    
    LoadRelations()
    {
        var result = this.http.GetRelations(this.filterByCategoryName,this.sortByProperty,this.orderBy);
        
        result.subscribe((response) => 
        {
            console.log("Response recieved");
            console.log(response);
            this.relations = response;
        },
        (error) => 
        {
            console.log("Request faied with error");
            alert(error);
        },
        ()=>
        {
            console.log("request complete");
        });
    }

    LoadCountries()
    {
        var countries = this.http.GetCountries();
        countries.subscribe((response) =>
        {
            console.log("Response recieved");
            console.log(response);
            this.countries = response;
        },(error) => 
        {
            console.log("Request faied with error");
            alert(error);
        },() =>
        {
            console.log("request complete")
        })
    }

    LoadCategories()
    {
        var categories = this.http.GetCategories();
        categories.subscribe((response) =>
        {
            console.log("Response recieved");
            console.log(response);
            this.categories = response;
        },(error) => 
        {
            console.log("Request faied with error");
            alert(error);
        },() =>
        {
            console.log("request complete")
        })
    }

    markForDelete(relation:Relation){
        console.log(this.relationsToDelete);
        if(this.relationsToDelete.includes(relation)){
            return;
        }
        else{
            this.relationsToDelete.push(relation);
        }
    }

    Save(form:NgForm)
    {
        console.log(form);;
        if(this.relation.Id == undefined)
        {
            console.log(this.relation)
            
            this.http.CreateRelation(this.relation)
                .subscribe(result => 
            this.LoadRelations());
            
        }
        else{
            
            this.http.UpdateRelation(this.relation)
                .subscribe(result => 
                    this.LoadRelations());
        }
        this.Cancel();
    }

    Cancel()
    {
        this.relation = new Relation();
        this.tableMode = true;
    }

    EditRelation(r:Relation)
    {
        this.relation = r;
    }

    DeleteRelations()
    {
        let identificators:Array<number> = [];
        this.relationsToDelete.forEach(relation =>{
            identificators.push(relation.Id as number);
        })
        console.log(identificators)
        this.http.DeleteRelations(identificators)
            .subscribe(result => 
                this.LoadRelations());
    }

    add()
    {
        this.Cancel();
        this.tableMode = false;
    }

    ApplyFilter()
    {
        this.LoadRelations();
    }
}
