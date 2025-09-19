// document.addEventListener('DOMContentLoaded', function() {
//   async function loadDisplayListings() {
    
//     const container = document.getElementById('listings-container');

//     try {
//       const response = await fetch('./airbnb_sf_listings_500.json');
//       const allListings = await response.json();
//       const listingsDisplay = allListings.slice(0, 50);
//       renderListings(listingsDisplay);

//     } catch (error) {
//       console.error("Failed to load property data:", error);
//       container.innerHTML = `<p class="text-danger">Failed to load data. Please check the file path or refresh the page.</p>`;
//     }
//   }

//   function renderListings(listings) {
//     const container = document.getElementById('listings-container');
//     container.innerHTML = '';

//     const cardsHTML = listings.map(listing => {
//       const placeholderImage = 'https://placehold.co/600x400?text=No+Image';
//       const imageUrl = listing.picture_url || placeholderImage;
//       const hostThumbnail = listing.host_thumbnail_url || placeholderImage;
//       const name = listing.name || 'Untitled Listing';
//       const price = listing.price || 'Price not available';
//       const hostName = listing.host_name || 'Unknown Host';

//       let shortDescription = 'No description available.';
//       if (listing.description && typeof listing.description === 'string') {
//         shortDescription = listing.description.length > 150
//         ? `${listing.description.substring(0, 150)}...`
//         : listing.description;
//       }

//       let amenitiesText = 'Not available';
//       if (listing.amenities && typeof listing.amenities === 'string' && listing.amenities.length > 4) {
//         amenitiesText = listing.amenities.slice(2, -2).split('", "').slice(0, 3).join(', ') + '...';
//       }

//       return `
//         <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
//           <div class="card h-100">
//             <img src="${imageUrl}" class="card-img-top" alt="${name}">
//             <div class="card-body d-flex flex-column">
//               <h5 class="card-title">${name}</h5>
              
//               <p class="card-text flex-grow-1">${shortDescription}</p>
              
//               <p class="card-text"><small class="text-muted"><strong>Amenities:</strong> ${amenitiesText}</small></p>

//               <p class="card-text"><small class="text-muted"><strong>${price}</strong> / night</small></p>
              
//               <div class="d-flex align-items-center justify-content-between mt-auto">
//                  <span class="fw-bold">Host: ${hostName}</span>
//                  <img src="${hostThumbnail}" alt="${hostName}" class="rounded-circle" width="40" height="40">
//               </div>
//             </div>
//           </div>
//         </div>
//       `;
//     }).join(''); 

//     container.innerHTML = cardsHTML;
//   }

//   loadDisplayListings();
// });

function renderListings(listings) {
  const container = document.getElementById('listings-container');
  container.innerHTML = '';

  listings.forEach(listing => {
    const placeholderImage = 'https://placehold.co/600x400?text=No+Image';
    const imageUrl = listing.picture_url || placeholderImage;
    const hostThumbnail = listing.host_thumbnail_url || placeholderImage;
    const name = listing.name || 'Untitled Listing';
    const price = listing.price ? `${listing.price} / night` : 'Price not available';
    const hostName = listing.host_name || 'Unknown Host';

    let shortDescription = 'No description available.';
    if (listing.description && typeof listing.description === 'string') {
      shortDescription = listing.description.length > 150
        ? `${listing.description.substring(0, 150)}...`
        : listing.description;
    }

    let amenitiesText = 'Not available';
    if (listing.amenities && typeof listing.amenities === 'string' && listing.amenities.length > 4) {
      try {
        amenitiesText = listing.amenities.slice(2, -2).split('", "').slice(0, 3).join(', ') + '...';
      } catch (e) {
        amenitiesText = listing.amenities.slice(0, 30) + '...';
      }
    }
  
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';

    const card = document.createElement('div');
    card.className = 'card h-100';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'card-img-top';
    img.alt = name;
    img.onerror = function() {
      this.onerror = null;
      this.src = placeholderImage;
    };

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name;

    const descriptionP = document.createElement('p');
    descriptionP.className = 'card-text flex-grow-1';
    descriptionP.textContent = shortDescription;
    
    const amenitiesP = document.createElement('p');
    amenitiesP.className = 'card-text';
    const amenitiesSmall = document.createElement('small');
    amenitiesSmall.className = 'text-muted';
    amenitiesSmall.innerHTML = `<strong>Amenities:</strong> ${amenitiesText}`;
    amenitiesP.appendChild(amenitiesSmall);

    const priceP = document.createElement('p');
    priceP.className = 'card-text';
    const priceSmall = document.createElement('small');
    priceSmall.className = 'text-muted';
    priceSmall.innerHTML = `<strong>${price}</strong>`;
    priceP.appendChild(priceSmall);

    const hostDiv = document.createElement('div');
    hostDiv.className = 'd-flex align-items-center justify-content-between mt-auto';

    const hostSpan = document.createElement('span');
    hostSpan.className = 'fw-bold';
    hostSpan.textContent = `Host: ${hostName}`;

    const hostImg = document.createElement('img');
    hostImg.src = hostThumbnail;
    hostImg.alt = hostName;
    hostImg.className = 'rounded-circle';
    hostImg.width = 40;
    hostImg.height = 40;
    hostImg.onerror = function() {
      this.onerror = null;
      this.src = placeholderImage;
    };

    hostDiv.appendChild(hostSpan);
    hostDiv.appendChild(hostImg);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(descriptionP);
    cardBody.appendChild(amenitiesP);
    cardBody.appendChild(priceP);
    cardBody.appendChild(hostDiv);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);
    
    container.appendChild(col);
  });
}

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

  loadDisplayListings();
});