import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.activateRoute.params
    .pipe(
      switchMap( ({id}) => this.countryService.searchCountryByAlphaCode( id ))
    )
    .subscribe(( country ) => {
        if (!country) {
          return this.router.navigateByUrl('')
        }
      console.log('tenemos un pais');
      return this.country = country;

    })
  }
}
