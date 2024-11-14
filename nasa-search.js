import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class NasaSearch extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "nasa-search";
  }

  constructor() {
    super();
    this.title = "NASA Image Search";
    this.t = this.t || {};
    this.results = [];
    this.filteredResults = [];
    this.searchQuery = "";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      results: { type: Array },
      filteredResults: { type: Array },
      searchQuery: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        .search-bar {
          width: 100%;
          padding: 8px;
          margin-bottom: 16px;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .results {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .card {
          width: 240px;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          margin: 10px;
          transition: background-color 0.3s ease;
        }
        .card img {
          width: 240px;
          height: 240px;
          object-fit: cover;
        }
        .card-content {
          padding: 8px;
        }
        .title {
          font-size: 1rem;
          font-weight: bold;
        }
      `
    ];
  }

  async fetchData() {
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=Saturn`);
      const data = await response.json();
      this.results = data.collection.items;
      this.filteredResults = this.results; // Initialize with all results
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  // Handle search input changes
  handleSearch(event) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredResults = this.results.filter((item) =>
      item.data[0].title.toLowerCase().includes(this.searchQuery)
    );
  }

  render() {
    return html`
      <div class="wrapper">
        <input
          type="text"
          class="search-bar"
          placeholder="Search images..."
          @input="${this.handleSearch}"
        />
        <h3>${this.title}</h3>
        <div class="results">
          ${this.filteredResults.map(
            (item) => html`
              <div class="card" @click="${() => window.open(item.links[0].href, '_blank')}">
                <img src="${item.links[0].href}" alt="${item.data[0].title}" />
                <div class="card-content">
                  <div class="title">${item.data[0].title}</div>
                  <div class="secondary_creator">
                    Owner: ${item.data[0].secondary_creator || 'NASA'}
                  </div>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(NasaSearch.tag, NasaSearch);
