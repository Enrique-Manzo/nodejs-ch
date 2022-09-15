import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { getAllProducts, getRandomProduct,  getProductById, postProduct} from "../../controllers/controladoresAPIgrahql.js";

const schema = buildSchema(
    `
    type Product {
        id: Int
        name: String
        price: Int
        tag: String
        image: String
        featured: Boolean
        stock: Int
        description: String
    }

    input ProductInput {
        name: String!
        price: Int!
        tag: String
        image: String
        featured: Boolean
        stock: Int
        description: String
    }

    type Query {
        getAllProducts: [Product]
        getRandomProduct: Product
        getProductById(id: ID!): Product
    }

    type Mutation {
        postProduct(data: ProductInput!): Product
    }

    `
)

export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getAllProducts,
        getRandomProduct,
        getProductById,
        postProduct
    },
    graphiql: true,
})