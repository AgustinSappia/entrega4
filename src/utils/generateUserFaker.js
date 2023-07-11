const {faker} = require('@faker-js/faker')

const generateProduc= ()=>{
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.string.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()
    }
}


const generateXProducts = (numOfProductos) => {
    let products = []
    for (let i = 0; i < numOfProductos; i++) {
        products.push(generateProduc())        
    }
    return products

}

module.exports ={generateXProducts}
