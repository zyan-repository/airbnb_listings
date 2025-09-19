# CS5610 - Airbnb Listings Viewer

This project is an assignment for the CS5610 course. It's a single-page application that dynamically loads and displays the first 50 Airbnb listings in San Francisco from a local JSON file.

---

##  Live Demo

The project is deployed on GitHub Pages and can be viewed live here:
**[https://zyan-repository.github.io/airbnb_listings/](https://zyan-repository.github.io/airbnb_listings/)**

---

##  Author

* **Name:** Yian Zhou

---

##  Project Features

* **Dynamic Data Loading**: Uses the `fetch` API with `async/await` to load listing data from a JSON file without reloading the page.
* **Responsive Layout**: Built with the Bootstrap 5 Grid system (`.container`, `.row`, `.col-*`) to ensure a great viewing experience on all devices, from mobile phones to desktops.
* **Component-Based Display**: Each listing is rendered as a Bootstrap Card, showing key information like name, price, host details, description, and amenities.
