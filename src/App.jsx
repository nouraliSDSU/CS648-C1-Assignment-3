function ProductRow(props) {

    const product = props.product; 
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.product_name}</td>
            <td>$ {product.Price}</td>
            <td>{product.Category}</td>
            <td><a href={product.Link} target="_blank">View</a></td>

        </tr>
    );
}

function ProductTable (props) {
    const ProductRows = props.products.map(product => <ProductRow key={product.id} product={product}/>); 
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {ProductRows}
            </tbody>
        </table>
    );
}


class ProductAdd extends React.Component {
    constructor() {
        super();  
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
            product_name: form.product_name.value, Price: form.Price.value,
            Category: form.Category.value, Link: form.Link.value
        }
        this.props.createProduct(product);
        form.product_name.value=""; form.Price.value = "";
        form.Category.value=""; form.Link.value="";
    }


    render() {
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
                    <div>
                    <div>
                        <label for="Category">Category:</label>
                        <select name="Category" placeholder="Category">
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>  
                    <div>
                        <label for="Price">Price Per Unit:</label>
                        <input type="number" step="0.01" name="Price" placeholder="Price" />
                    </div>
                </div>
                <br></br>
                <div>
                    <div>
                        <label for="Product name">Product Name:</label>
                        <input type="text" name="product_name" placeholder="Product Name" />
                    </div>
                    <div>
                        <label for="Link">Image Link:</label>
                        <input type="text" name="Link" placeholder=" Image URL" />
                    </div>
                </div>
                <br></br>
                <button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
            productList {
              id product_name Price Category Link
            }
          }`;
          const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
          });
          const body = await response.text();
          const result = JSON.parse(body);
          this.setState({ products: result.data.productList });
    }

    async createProduct(product) {
        const query = `mutation {
          productAdd(product:{
            product_name: "${product.product_name}",
            Price: "${product.Price}",
            Category: "${product.Category}",
            Link: "${product.Link}",
          }) {
            id
          }
        }`;
    
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ query })
        });
        this.loadData();
      }

    
    render() {
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <p>Showing all available products</p>
                <hr />
                <ProductTable products={this.state.products}/>
                <p>Add a new product to inventory</p>
                <hr /> 
                <ProductAdd createProduct={this.createProduct}/>
            </React.Fragment>
        );
    }
}

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));