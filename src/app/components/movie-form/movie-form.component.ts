import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Movie } from '../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  movie: Movie = {
    id: '',
    title: '',
    description: '',
    image: '',
    time: 0,
    date: new Date()
  };
  edit = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const params = this.activatedRoute.snapshot.params;
    if ( params['id'] ) {
      this.moviesService.getMovie( params['id'] )
        .subscribe(
          res => {
            console.log(res);
            this.movie = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }


  saveNewMovie() {
    delete this.movie.id;
    delete this.movie.date;
    this.moviesService.createMovie( this.movie )
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/movies']);
        },
        err => console.error(err)
      );
  }

  updateMovie() {
    delete this.movie.date;
    this.moviesService.updateMovie( String(this.movie.id), this.movie )
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/movies']);
        },
        err => console.error(err)
      );
  }

}
