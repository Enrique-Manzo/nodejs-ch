import { SQLClientAdmin } from "./SQLClient.js";

export async function addWatch(watch) {
    await SQLClientAdmin.insert(watch).into("watches");
};

export async function getWatches() {
    const data = await SQLClientAdmin.select("*").from("watches");
    
    return data
}



/*
const watches = [
    {
        id: 1653901836215,
        name: "Xiaomi Mini",
        price: 135.50,
        tag: "Featured",
        image: "images/w1.png",
        featured: true,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1653903436215,
        name: "Balckview X1",
        price: 2500.99,
        tag: "New",
        image: "images/w2.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1633901836225,
        name: "Amazfit",
        price: 5000.17,
        tag: "New",
        image: "images/w3.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 9053901836215,
        name: "Leelbox",
        price: 4500.99,
        tag: "New",
        image: "images/w4.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1653999836215,
        name: "Garmin vívomove 3S",
        price: 1500.00,
        tag: "New",
        image: "images/w5.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1613501836215,
        name: "HUAWEI Watch",
        price: 980.00,
        tag: "New",
        image: "images/w6.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1653954636215,
        name: "IOWODO R2",
        price: 350.99,
        tag: "New",
        image: "images/w6.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    }
]

export default watches;


{
        id: 16532132139836215,
        name: "Garmin vívomove 3S2",
        price: 250.00,
        tag: "New",
        image: "images/w5.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 16131231836215,
        name: "HUAWEI Watch2",
        price: 603.00,
        tag: "New",
        image: "images/w6.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    },
    {
        id: 1653dsad31235,
        name: "IOWODO asdad",
        price: 1200.99,
        tag: "New",
        image: "images/w6.png",
        featured: false,
        stock: 20,
        description: "Smartwatches come in many different sizes, designs, and they can vary greatly when it comes to features. Before making a buying decision, ask yourself whether you want a watch primarily for fitness and sleep tracking, or whether the style is your top priority. "
    }
]


{text: "holaaa", user: "juan@gmail.com"}, {text: "szia", user: "tunde@gmail.com"}, {text: "hogy vagy? minden rendben?", user: "juan@gmail.com"}, {text: "Beszélgetek, nincs más dolgom", user: "juan@gmail.com"}, {text: "egy másik üzenet", user: "juan@gmail.com"}, {text: "egy másik üzenet", user: "juan@gmail.com"}, {text: "egy másik üzenet", user: "juan@gmail.com"}, {text: "egy másik üzenet", user: "juan@gmail.com"}


*/