import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_models/category.model';
import { Country } from '../_models/country.model';
import { Relation } from '../_models/relation.model';


@Injectable()
export class HttpService 
{
  
    public RelationsUrl:string = 'https://localhost:44387/api/Relation';
    public RelationInfoUrl:string = 'https://localhost:44387/';
    
    constructor(private http: HttpClient) {}

    GetRelations(filterByCategoryName?:string,sortByProperty?:string,orderBy?:number):Observable<Array<Relation>>   
    {
        let newRelationsUrl = this.RelationsUrl;
        if(filterByCategoryName != undefined || sortByProperty != undefined || orderBy != undefined)
        {
            newRelationsUrl+= '?';
        }
        if(filterByCategoryName != undefined)
        {
            newRelationsUrl += 'filterByCategoryName=' + filterByCategoryName + '&';
        }
        if(sortByProperty != undefined)
        {
            newRelationsUrl += 'sortByProperty=' + sortByProperty + '&';
        }
        if(orderBy != undefined)
        {
            newRelationsUrl += 'orderBy=' + orderBy;
        }
        return this.http.get<Array<Relation>>(newRelationsUrl);
    }

    GetCountries():Observable<Array<Country>>
    {
        return this.http.get<Array<Country>>(this.RelationInfoUrl + 'Countries');
    }

    GetCategories():Observable<Array<Category>>
    {
        return this.http.get<Array<Category>>(this.RelationInfoUrl + 'Categories');
    }
    
    GetRelation(Id:number):Observable<Relation>
    {
        return this.http.get<Relation>(this.RelationsUrl + '/' + Id);
    }

    CreateRelation(relation:Relation):Observable<Relation>
    {
        return this.http.post<Relation>(this.RelationsUrl,relation)
    }

    UpdateRelation(relation:Relation):Observable<Relation>
    {
        return this.http.put<Relation>(this.RelationsUrl,relation);
    }

    DeleteRelations(identificators:number[]):Observable<Relation>
    {
        return this.http.put(this.RelationsUrl+'/Delete',identificators);
    }
}

