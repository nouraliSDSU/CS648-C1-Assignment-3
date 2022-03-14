const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const initialProducts = [
  {
      id: 1, 
      product_name: 'White T-shirt', 
      price: '30.00', 
      Category: 'Shirts',
      Link:'https://www.walmart.com/ip/Bonobos-Fielder-Men-s-and-Big-Men-s-Short-Sleeve-Pocket-Tee-Up-to-3XL/382301711',
  },
  {
      id: 2, 
      product_name: 'Gray jeans', 
      price: '49.99', 
      Category: 'Jeans',
      Link:'https://www.walmart.com/ip/Lee-Men-s-Active-Stretch-Slim-Fit-Jean/297675870',
  },
  {
      id: 3, 
      product_name: 'Blue Jacket', 
      price: '79.99', 
      Category: 'Jackets',
      Link:'https://www.walmart.com/ip/Port-Authority-Denim-Jacket-2XL-Denim-Blue/467162354?athbdg=L1700',
  },
];

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    productAdd,
  },

};

function productList() {
  return initialProducts;
}

function productAdd(_, { product }) {
  product.id = initialProducts.length + 1;
  initialProducts.push(product);
  return product;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});