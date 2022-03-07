import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
 error= new Subject<string>();



  constructor(private http: HttpClient) { }   // injectime http clienti ja yleval impordime                                                 

onCreatePost(postData: Post) {
    // Send Http request
    
    return this.http                                                                           // postime ja m22rame millisena tagastatakse  
      .post<{[key: string]: Post}>(                                                      
        'https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',  //1. argument on URL, endpoint lisatud
        postData,{                                                                                //2. argument on meie data , body

        observe: 'response'  // 3. millist datat tagasi saame                                                           
        
        }                                                                                  
      )
      .subscribe(responseData => {                                                                // subscribe on kohustuslik,
        console.log(responseData);  
        
                                                                       // tegemist observablega
      }, error=>{
        this.error.next(error.message);
      });
      
      
  };



  fetchPosts(){
      // returnime observable millele app.componendis subscribeme



      return this.http
      .get<{[key: string]: Post}>('https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',  //<> vahel
                                                                                                                            //tagastus tyyp
        {
          headers: new HttpHeaders({"Custom-Header": 'Hello'}),     // lisame custom header data
          params: new HttpParams().set('print','pretty'),            // lisame URLI paramsid juurde
          responseType:'json'                                       // default on json nagunii 

        }
      )  
                                                                                                                            
      .pipe(map((responseData)=>{               // transformeerime saadud data l2bi pipe, v2ljastame array of observables
          const postArray:Post[]=[];

          for(const key in responseData){         // loopime yle responsedata ja lykkame meie arraysse

            if(responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id: key});      // 3 puntki on spread operaator, mis t6mbab v2lja nested objektist
            }                                                       // key value paarid, p2rast koma saame juurde lisada
                                                                    // id sisse s2ilitame objekti cryptic key, et vajadusel kasutada

                  
          }                                                       
          return postArray;


      }))
      
      
    }
    deletePost(){

      return this.http.delete('https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType: 'json',




      }).pipe(tap((event) =>{               // tap iga saame ligi eventile
        console.log(event);

        if(event.type === HttpEventType.Sent){
          console.log(event)
        }
        if(event.type === HttpEventType.Response){
          console.log(event.body)
        }
      }))
      


    }
  
}
