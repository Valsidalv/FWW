import { Component, OnInit } from '@angular/core';
import { Country } from '../model/country';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  countries: Country[] = [];
  searchValue: String = '';
  isActiveChecked: boolean = true;
  countriesSortTemp: any[] = [];
  isSortAsc: boolean = false;
  allowedItemsNumber: number = 20;
  countriesCount: number = 0;
  pagnationNumber: number = 0;
  paginationArray: Array<number> = new Array();
  page: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((result) => {
      this.countries = result;
      this.countriesSortTemp = result;
      this.getCountriesCount();

      this.pagnationNumber = Math.ceil(this.countriesCount / this.allowedItemsNumber);

      this.paginationArray = new Array(this.pagnationNumber);
    });
  }


  checkUserFilter(user: any, state: any, single: any): boolean {
    if (
      (user.fullName.toUpperCase().includes(this.searchValue.toUpperCase()) ||
        user.balance.includes(this.searchValue) ||
        user.registered.includes(this.searchValue) ||
        state.name.toUpperCase().includes(this.searchValue.toUpperCase()) ||
        single.country
          .toUpperCase()
          .includes(this.searchValue.toUpperCase())) &&
      user.isActive == this.isActiveChecked
    ) {
      return true;
    }

    return false;
  }

  
  countryClick() {
    if(this.isSortAsc) {
      this.countriesSortTemp.sort(this.compare);
      this.isSortAsc = false;
    } else {
      this.countriesSortTemp.sort(this.compareDesc);
      this.isSortAsc = true;
    }
    this.countries = this.countriesSortTemp;
  }

  getCountriesCount() {
    for (let country of this.countriesSortTemp) {
      for (let state of country.state) {
        for (let user of state.users) {
          this.countriesCount++;
        }
      }
    }
  }

  selectChange() {
    this.pagnationNumber = Math.ceil(
      this.countriesCount / this.allowedItemsNumber
    );
    this.paginationArray = new Array(this.pagnationNumber);
  }

  changePage(pageNumber: number) {
    this.page = pageNumber;
  }

  paginationValidation(i, j, k) {
    if (
      (i + 1) * (j + 1) * (k + 1) <= this.allowedItemsNumber * this.page &&
      (i + 1) * (j + 1) * (k + 1) >= this.allowedItemsNumber * (this.page - 1)
    ) {
      return true;
    }
    return false;
  }

  compare(a, b) {
    if(a.country < b.country) {
      return -1;
    }

    if(a.country > b.country) {
      return 1;
    }

    return 0;
  }

  compareDesc(a, b) {
    if(a.country < b.country) {
      return 1;
    }

    if(a.country > b.country) {
      return -1;
    }

    return 0;
  }
}
