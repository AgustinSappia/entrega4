exports.generateUserErrorInfo = (user) => {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del user:
        * first_name: needs to a String, received ${user.first_name}
        * last_name: needs to a String, received ${user.last_name}
        * email: needs to a String, received ${user.email}`
}
exports.generatePoductErrorInfo = (product) => {
    return `One or more properties ware incomplete or not valid.
        listado de requirimientos de propiedades del user:
        * title: needs to a String, received ${product.title}
        * price: needs to a number, received ${product.price}
        * code: needs to a number, received ${product.code}
        * thumbnail: needs to a string, received ${product.thumbnail}
        * description: needs to a string, received ${product.description}`
}


title,
description,
price,
thumbnail,
code,
stock