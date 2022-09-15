import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { 
    getAllProducts,
    getRandomProduct,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct,
} from "../../controllers/controladoresAPIgrahql.js";

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

    input ProductUpdate {
        name: String
        price: Int
        tag: String
        image: String
        featured: Boolean
        stock: Int
        description: String
    }

    type Message {
        description: String
    }

    type Query {
        getAllProducts: [Product]
        getRandomProduct: Product
        getProductById(id: ID!): Product
    }

    type Mutation {
        postProduct(data: ProductInput!): Product
        deleteProduct(id: ID!): Message
        updateProduct(id: ID!, data: ProductUpdate): Message
    }

    `
)

export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getAllProducts,
        getRandomProduct,
        getProductById,
        postProduct,
        deleteProduct,
        updateProduct,
    },
    graphiql: true,
})