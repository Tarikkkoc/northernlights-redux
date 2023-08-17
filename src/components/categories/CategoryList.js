import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

// import changeCategoryReducer from "./../../redux/reducers/changeCategoryReducer";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id); // category id'ye göre filtreleme yaptım.
  }; // clean code

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer, // currentCategory'i redux'tan çek.  changeCategoryReducer'dan çek
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ), // getCategories action'a ulaştık
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ), // changeCategory action'a ulaştık
      getProducts: bindActionCreators(productActions.getProducts, dispatch), // getProducts action'a ulaştık
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
