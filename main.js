const nextPageButton = document.getElementById("btn-next");
const prevPageButton = document.getElementById("btn-prev");
const paginationNumbers = document.getElementById("pagination-numbers");
const productsDiv = document.querySelector(".products-container");

let currentPage = 1; 
const productsPerPage = 5;
let totalPages = 1; 

async function getProducts(page = 1, limit = 5) {
  try {
    
    const res = await axios.get(`https://fakestoreapi.com/products`);
    const allProducts = res.data;

   
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    
    totalPages = Math.ceil(allProducts.length / limit);

    renderProducts(paginatedProducts);

    
    renderPaginationNumbers();
    updatePaginationButtons();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

function renderProducts(products) {
  productsDiv.innerHTML = ""; 
  products.forEach((element) => {
    productsDiv.innerHTML += `
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-active">
            <th scope="row">
              <img src="${element.image}" alt="${element.title}" style="max-width: 50px;">
            </th>
            <td>${element.title}</td>
            <td>${element.category}</td>
            <td>${element.price} €</td>
          </tr>
        </tbody>
      </table>`;
  });
}

function renderPaginationNumbers() {
  paginationNumbers.innerHTML = ""; 

  
  const prevButton = document.createElement("li");
  prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevButton.innerHTML = `<a class="page-link" href="#">&laquo;</a>`;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getProducts(currentPage, productsPerPage);
    }
  });
  paginationNumbers.appendChild(prevButton);


  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("li");
    pageButton.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      getProducts(currentPage, productsPerPage);
    });
    paginationNumbers.appendChild(pageButton);
  }

  
  const nextButton = document.createElement("li");
  nextButton.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  nextButton.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      getProducts(currentPage, productsPerPage);
    }
  });
  paginationNumbers.appendChild(nextButton);
}

function updatePaginationButtons() {
 
  prevPageButton.classList.toggle("disabled", currentPage === 1);
  nextPageButton.classList.toggle("disabled", currentPage === totalPages);
}


getProducts(currentPage, productsPerPage);
