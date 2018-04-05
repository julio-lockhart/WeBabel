const chatkitRoutes = require('./chatkit');

const constructorMethod = (app) => {
    app.use("/chatkit", chatkitRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({
            error: "URL Not Found"
        });
    });
};

module.exports = constructorMethod;