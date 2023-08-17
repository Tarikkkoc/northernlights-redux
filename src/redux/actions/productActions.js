import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function getProducts(categoryId) {
  // redux thunk ile apiye erişme
  return function (dispatch) {
    let url = "http://localhost:3000/products";

    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }

    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}

export function createProductSuccess(product) {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

export function updateProductSuccess(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
}
export function saveProductApi(product) {
  return fetch("http://localhost:3000/products/" + product.id || "", {
    method: product.id ? "PUT" : "POST", // eğer id'si varsa PUT yani güncelle, id'si yoksa POST yani yeni bir ürün ekle
    headers: { "content-type": "application/json" }, //  HTTP isteğinin başlığına bir Content-Type alanı ekleyecektir
    body: JSON.stringify(product), // stringify (stringleştirir. requestler stringtir.), body göndereceğimiz datadır.
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text(); // sonuç ok değilse bir hata var
  throw new Error(error);
}

export function handleError(error) {
  console.error("Bir hata oluştu");
  throw error;
}

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}
