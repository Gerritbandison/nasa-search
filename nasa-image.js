import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.source = '';
  }

  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      .image {
        display: inline-block;
        cursor: pointer;
        outline: none;
      }
      .image div {
        max-width: 200px;
        font-size: 16px;
        font-weight: bold;
      }
      .image img {
        display: block;
        width: 200px;
        height: 200px;
        object-fit: cover;
      }
    `;
  }

  

  render() {
    return html`
      <div class="image"
      
      >
        <img src="${this.source}" alt="${this.title}" />
        <div>${this.title}</div>
      </div>
    `;
  }

  static get tag() {
    return "nasa-image";
  }
}

customElements.define(NasaImage.tag, NasaImage);
