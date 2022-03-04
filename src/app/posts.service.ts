import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postIsCreated=new Subject<boolean>();



  constructor(private http: HttpClient) { }   // injectime http clienti ja yleval impordime                                                 

  onCreatePost(postData: Post) {
    // Send Http request
    this.postIsCreated.next(true);
    return this.http                                                                           // postime ja m22rame millisena tagastatakse  
      .post<{[key: string]: Post}>(                                                      
        'https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json',  //1. argument on URL, endpoint lisatud
        postData                                                                                  //2. argument on meie data , body
      )
      .subscribe(responseData => {                                                                // subscribe on kohustuslik,
        console.log(responseData);                                                                // tegemist observablega
      });
      
  };



  fetchPosts(){
      // returnime observable millele app.componendis subscribeme



      return this.http
      .get<{[key: string]: Post}>('https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json')  //<> vahel
                                                                                                                            //tagastus tyyp
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

      return this.http.delete('https://angularcourse-bdbe7-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      


    }
  
}
