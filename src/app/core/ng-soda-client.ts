// Based off https://github.com/socrata/soda-js

// Socrati Query Language
// https://dev.socrata.com/docs/queries/

import { Observable, from } from 'rxjs';

interface SoqlComponents {
  select: string;
  where: string;
  limit: string;
}

export interface SodaOptions {
  datasetId?: string;
}

export function and(...clause: string[]) {
  return `AND (${clause.join(' ')})`;
}

export function or(...clause: string[]) {
  return `OR (${clause.join(' ')})`;
}

export class Consumer {
  public connection: Connection;

  constructor(public dataSite: string, public options: SodaOptions) {
    this.connection = new Connection(dataSite);
  }

  /**
   * Creates a new Query for a given datasetId
   * @param datasetId optional if provided in Consumer constructor
   */
  query(datasetId: string = this.options.datasetId) {
    if (!datasetId) {
      throw new Error(
        'datasetId is not valid! Please supply a datasetId, eg 3pdp-qp95'
      );
    }
    return new Query(datasetId, this);
  }
}

class Connection {
  constructor(public dataSite: string) {
    if (!/^[a-z0-9-_.]+(:[0-9]+)?$/i.test(dataSite)) {
      throw new Error(
        'dataSite does not appear to be valid! Please supply a domain name, eg data.seattle.gov'
      );
    }
  }

  request<T>(query: Query): Observable<T[]> {
    const url = query.getUrl();
    const response = fetch(url).then(
      response => response.json() as Promise<T[]>
    );
    return from(response);
  }
}

class Query {
  private _select = [];
  private _where = [];
  private _group = [];
  private _having = [];
  private _order = [];
  private _offset = null;
  private _limit = null;

  constructor(private _datasetId: string, private _consumer: Consumer) {
    if (!_datasetId) {
      throw new Error('datasetId is required');
    }
  }

  select(...columns: string[]) {
    for (const column of columns) {
      this._select.push(column);
    }
    return this;
  }

  where(...clauses: string[]) {
    for (const c of clauses) {
      this._where.push(c);
    }
    return this;
  }

  limit(limit: number) {
    this._limit = limit;
    return this;
  }

  getUrl() {
    const dataSite = this._consumer.dataSite;
    const path = `/resource/${this._datasetId}.json`;
    const query = this.buildSoqlQuery();
    return `https://${dataSite}${path}?${query}`;
  }

  getRows<T>(): Observable<T[]> {
    return this._consumer.connection.request<T>(this);
  }

  private buildSoqlQuery(): string {
    const query: SoqlComponents = {
      select: this._select.length > 0 ? this._select.join(', ') : null,
      where: this._where.length > 0 ? this._where.join(' ') : this._where[0],
      limit: this._limit.length || this._limit
    };
    return this.serializeSoqlComponents(query);
  }

  private serializeSoqlComponents(components: SoqlComponents): string {
    const str = [];
    for (const key of Object.keys(components || {})) {
      const val = components[key];
      if (!val) {
        continue;
      }
      str.push(`$${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    }
    return str.join('&');
  }
}
