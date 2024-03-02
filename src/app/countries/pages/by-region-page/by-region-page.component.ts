import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Region;

  constructor(private countryService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }


  searchRegion( region: Region ) {
    this.selectedRegion = region;
    this.countryService.searchRegion(region)
    .subscribe( countries => {
      this.countries = countries;
    } )
  }

}
