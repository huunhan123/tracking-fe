import { HttpParams } from "@angular/common/http";

export type ResponseModel<T> = {
  data?: T,
  metadata?: {
    totalRows: number,
  },
}

export type Params = {
  search?: string,
  // orderField?: string,
  // orderType?: SortState,
  page?: number,
  rpp?: number,
}

export class ParamsModel {
  search?: string;
  page?: number;
  rpp?: number;
  // 'order-by'?: string;
  // 'order-type'?: string;

  constructor(
    params: Params
  ) {
    this.search =  params.search;
    this.page =  params.page;
    this.rpp =  params.rpp;
    // this['order-by'] =  params.orderField;
    // this['order-type'] =  params.orderType;
  }

  toHttpParams(): HttpParams {
    const params = {
      search: this.search,
      page: this.page,
      rpp: this.rpp,
      // 'order-by': this['order-by'],
      // 'order-type': this['order-type'],
    };

    return new HttpParams({fromObject: JSON.parse(JSON.stringify(params))});
  }
}

export type ConfigPage = {
  totalItems?: number,
  itemsPerPage?: number,
  currentPage?: number,
}