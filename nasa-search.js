/**
 * Copyright 2024 
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `nasa-search`
 * 
 * @demo index.html
 * @element nasa-search
 */
export class NasaSearch extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "nasa-search";
  }

  constructor() {
    super();
    this.title = "NASA Image Search";
    this.t = this.t || {};
    this.t = {
      ...this.t,
    };
    this.results = []; // Store fetched NASA data here
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/nasa-search.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      results: { type: Array }
    };
  }

  // Lit scoped styles
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
        .card {
          width: 240px;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          margin: 10px;
          transition: background-color 0.3s ease;
        }
        .results {
          display: flex;
          flex-wrap: wrap;
          gap: 10px; /* space between cards */
          justify-content: center; /* centers cards within container */
        }
        .card:hover {
          background-color: #f0f0f0;
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
        .secondary_creator {
          font-size: 0.8rem;
          color: #777;
        }
      `
    ];
  }

  // Fetch data from NASA API
  async fetchData() {
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=Saturn`);
      const data = await response.json();
      this.results = data.collection.items;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.title}</h3>
        <div class="results">
          ${this.results.map(
            item => html`
              <div
                class="card"
                tabindex="0"
                @click="${() => window.open(item.links[0].href, '_blank')}"
                role="button"
              >
                <img
                  src="${item.links[0].href}"
                  alt="${item.data[0].title}"
                />
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

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(NasaSearch.tag, NasaSearch);