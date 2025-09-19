document.addEventListener('DOMContentLoaded', function() {
  async function loadDisplayListings() {
    
    const container = document.getElementById('listings-container');

    try {
      const response = await fetch('./airbnb_sf_listings_500.json');
      const allListings = await response.json();
      const listingsDisplay = allListings.slice(0, 50);
      renderListings(listingsDisplay);

    } catch (error) {
      console.error("Failed to load property data:", error);
      container.innerHTML = `<p class="text-danger">Failed to load data. Please check the file path or refresh the page.</p>`;
    }
  }

  function renderListings(listings) {
    const container = document.getElementById('listings-container');
    container.innerHTML = '';

    const cardsHTML = listings.map(listing => {
      const shortDescription = listing.description.length > 150
      ? `${listing.description.substring(0, 150)}...`
      : listing.description;

      const amenitiesText = listing.amenities.slice(2, -2).split('", "').slice(0, 3).join(', ') + '...';

      return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card h-100">
            <img src="${listing.picture_url}" class="card-img-top" alt="${listing.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${listing.name}</h5>
              
              <p class="card-text flex-grow-1">${shortDescription}</p>
              
              <p class="card-text"><small class="text-muted"><strong>Amenities:</strong> ${amenitiesText}</small></p>

              <p class="card-text"><small class="text-muted"><strong>${listing.price}</strong> / night</small></p>
              
              <div class="d-flex align-items-center justify-content-between mt-auto">
                 <span class="fw-bold">Host: ${listing.host_name}</span>
                 <img src="${listing.host_thumbnail_url}" alt="${listing.host_name}" class="rounded-circle" width="40" height="40">
              </div>
            </div>
          </div>
        </div>
      `;
    }).join(''); 
    container.innerHTML = cardsHTML;
  }

  loadDisplayListings();
});