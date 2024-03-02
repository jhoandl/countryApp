import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {


  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchCountry( term: string ) {
    this.countryService.searchCountry(term)
    .subscribe( countries => {
      this.countries = countries;
    } )
  }

}
