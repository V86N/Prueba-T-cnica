const nextPageButton = document.getElementById("btn-next");
const prevPageButton = document.getElementById("btn-prev");
const productsDiv = document.querySelector(".products-container");

let currentPage = 1; // Página inicial
const productsPerPage = 5; // Máximo de productos por página
let totalPages = 1; // Total de páginas (se calculará)

async function getProducts(page = 1, limit = 5) {
  try {
    // Obtener productos con paginación
    const res = await axios.get(`https://fakestoreapi.com/products`);
    const allProducts = res.data;

    // Calcular el rango de productos para la página actual
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    // Calcular el número total de páginas
    totalPages = Math.ceil(allProducts.length / limit);

    // Renderizar los productos
    renderProducts(paginatedProducts);

    // Actualizar el estado de los botones de paginación
    updatePaginationButtons();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

function renderProducts(products) {
  productsDiv.innerHTML = ""; // Limpiar productos actuales
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
            <td>${element.price}</td>
          </tr>
        </tbody>
      </table>`;
  });
}

function updatePaginationButtons() {
  prevPageButton.classList.toggle("disabled", currentPage === 1);
  nextPageButton.classList.toggle("disabled", currentPage === totalPages);
}

// Eventos de los botones
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getProducts(currentPage, productsPerPage);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    getProducts(currentPage, productsPerPage);
  }
});

// Cargar los productos iniciales
getProducts(currentPage, productsPerPage);
