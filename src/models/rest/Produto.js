const produto = (sequelize, DataTypes) => {
    const Produto = sequelize.define(
        'produtos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            nome: {
                type: DataTypes.STRING,
                unique: true,
            },

            codigoInterno: {
                type: DataTypes.STRING,
                unique: true,
            },

            quantidade: {
                type: DataTypes.INTEGER,
            },

            tipo: {
                type: DataTypes.STRING
            }
        }
    );

    Produto.sync();
    return produto;
};

export default produto;