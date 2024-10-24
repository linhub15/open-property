// Based off https://github.com/socrata/soda-js

// Socrati Query Language
// https://dev.socrata.com/docs/queries/

interface SoqlComponents extends Record<string, string> {
  $select: string;
  $where: string;
  $limit: string;
}

export type SodaOptions = {
  datasetId: string;
};

export const and = (...clause: string[]) => `AND (${clause.join(" ")})`;

export const or = (...clause: string[]) => `OR (${clause.join(" ")})`;

export class Consumer {
  public connection: Connection;

  constructor(public dataSite: string, public options: SodaOptions) {
    this.connection = new Connection(dataSite);
  }

  /**
   * Creates a new Query for a given datasetId
   *
   * @param datasetId optional if provided in Consumer constructor
   */
  query(datasetId: string = this.options.datasetId) {
    if (!datasetId) {
      throw new Error(
        "datasetId is not valid! Please supply a datasetId, eg 3pdp-qp95",
      );
    }
    return new Query(datasetId, this);
  }
}

class Connection {
  constructor(public dataSite: string) {}

  async request<T>(query: Query): Promise<T[]> {
    const url = query.getUrl();
    const response = await fetch(url);
    const body = await response.json() as T[];
    return body;
  }
}

class Query {
  #select: string[] = [];
  #where: string[] = [];
  private _group = [];
  private _having = [];
  private _order = [];
  private _offset = null;
  #limit: number | null = null;

  constructor(private _datasetId: string, private _consumer: Consumer) {
    if (!_datasetId) {
      throw new Error("datasetId is required");
    }
  }

  select(...columns: string[]) {
    for (const column of columns) {
      this.#select.push(column);
    }
    return this;
  }

  where(...clauses: string[]) {
    for (const c of clauses) {
      this.#where.push(c);
    }
    return this;
  }

  limit(limit: number) {
    this.#limit = limit;
    return this;
  }

  getUrl() {
    const dataSite = this._consumer.dataSite;
    const url = new URL(`/resource/${this._datasetId}.json`, dataSite);
    url.search = this.buildSoqlQuery().toString();
    return url;
  }

  async getRows<T>(): Promise<T[]> {
    return await this._consumer.connection.request<T>(this);
  }

  private buildSoqlQuery(): URLSearchParams {
    const query: SoqlComponents = {
      $select: this.#select.length > 0 ? this.#select.join(", ") : "",
      $where: this.#where.length > 0 ? this.#where.join(" ") : this.#where[0],
      $limit: this.#limit?.toString() || "",
    };
    return new URLSearchParams(query);
  }
}
