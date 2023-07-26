const authorization = roles => {
    return async (req, res, next) => {
        console.log(roles);
        if (!req.user) return res.status(401).send({ status: "error", error: "Unauthorized" });

        // Verificar si el rol del usuario está incluido en el array de roles permitidos
        if (!roles.includes(req.user.rol)) return res.status(403).send({ status: "error", error: "Not permissions" });

        next();
    };
};

module.exports = {
    authorization
};
//esta middleware me sirve para detectar si el usuario que quiere ingresar a un link cumple con el role requirido 