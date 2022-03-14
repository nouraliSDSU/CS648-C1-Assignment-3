const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const Product = mongoose.model("Product", {
  id: String,
  product_name: String,
  Price: String,
  Category: String,
  Link: String
})

const initialProducts = [
  {
      id: "1", 
      product_name: 'White T-shirt', 
      price: '30.00', 
      Category: 'Shirts',
      Link:'https://www.walmart.com/ip/Bonobos-Fielder-Men-s-and-Big-Men-s-Short-Sleeve-Pocket-Tee-Up-to-3XL/382301711',
  },
  {
      id: "2", 
      product_name: 'Gray jeans', 
      price: '49.99', 
      Category: 'Jeans',
      Link:'https://www.walmart.com/ip/Lee-Men-s-Active-Stretch-Slim-Fit-Jean/297675870',
  },
  {
      id: "3", 
      product_name: 'Blue Jacket', 
      price: '79.99', 
      Category: 'Jackets',
      Link:'https://www.walmart.com/ip/Port-Authority-Denim-Jacket-2XL-Denim-Blue/467162354?athbdg=L1700',
  },
];

const typeDefs = gql `
enum categories {
  Shirts,
  Jeans,
  Jackets,
  Sweaters,
  Accessories
}


type Product {
  id: String
  product_name: String
  Price: String
  Category: categories
  Link: String

}

input ProductInputs {
  product_name: String
  Price: String
  Category: String
  Link: String
}

type Query {
  productList: [Product!]!
}

type Mutation {
  productAdd(product: ProductInputs!): Product
}

`

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    productAdd: async(_, { product }) => {
      product.id = initialProducts.length + 1;
      initialProducts.push(product);
      id = product.id,
      product_name = product.product_name,
      Price = product.Price,
      Category = product.Category,
      Link = product.Link

      const pro = new Product(
        {
         id,
         product_name,
         Price,
         Category,
         Link
        }
      );
      await pro.save()
      return pro;
    }
  }

};

function productList() {
  return initialProducts;
}

const server = async () => {

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app, path: '/graphql' });

app.use(express.static('public'));

try{

    await mongoose.connect('mongodb+srv://nour:Hassan56@cluster0.txcqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}catch(err){
  console.log(err)
}

app.listen(3000, () => {
  console.log('App started on port 3000');
})

}

server();