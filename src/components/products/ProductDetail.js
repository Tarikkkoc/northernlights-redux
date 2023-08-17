import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product, onSave, onChange }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Update" : "Add"}</h2>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="Error"
      />
      <SelectInput
        name="categoryId"
        label="Category"
        value={product.categoryId || ""}
        defaultOption="Seçiniz"
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        error="Error in select"
      />
      <TextInput
        name="unitPrice"
        label="Unit Price"
        value={product.unitPrice}
        onChange={onChange}
        error="Error"
      />
      <TextInput
        name="qauntityPerUnit"
        label="Quantity Per Unit"
        value={product.quantityPerUnit}
        onChange={onChange}
        error="Error"
      />
      <TextInput
        name="unitsInStock"
        label="Unıts In Stock"
        value={product.unitsInStock}
        onChange={onChange}
        error="Error"
      />
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  );
};

export default ProductDetail;
