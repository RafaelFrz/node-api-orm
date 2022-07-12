const db = require('../models');
const Produto = db.rest.models.produtos;

exports.getAllProdutos = async (req, res) => {
    const produtos = await Produto.findAll();
    return res.send(produtos);
}

exports.getProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findOne({
            where: {
                id,
            },
        });

        if (!produto) {
            return res.status(400).send({
                message: `Não foi encontrado nenhum produto com id ${id}`,
            });
        }

        return res.send(produto);
    } catch (error) {
        return res.status(500).send({
            message: `Erro ${error.message}`,
        });
    }
};

exports.createProduto = async (req, res) => {
    const { nome, codigoInterno, quantidade, tipo } = req.body;
    if (!codigoInterno) {
        return res.status(400).send({
            message: `Todo produto cadastrado necessita de um código interno!`
        });
    }

    let produtoExiste = await Produto.findOne({
        where: {
            codigoInterno,
        },
    });

    if (produtoExiste) {
        return res.status(400).send({
            message: 'Esse código já está sendo utilizado, códigos de produto são de uso único'
        });
    }

    try {
        let novoProduto = await Produto.create({
            nome: nome,
            codigoInterno: codigoInterno,
            quantidade: quantidade,
            tipo: tipo,
        });
        return res.send(novoProduto);
    } catch (error) {
        return res.status(500).send({
            message: `Erro ${error.message}`,
        });
    }
};

exports.deleteProduto = async (req, res) => {
    try {    
        const { id, codigoInterno } = req.body;
        if ((id && !codigoInterno) || !codigoInterno) {
            return res.status(400).send({
                message: `Para deletar um produto é necessário que informe o ID e/ou o codigo interno do produto`,
            });
        }

        const condicoes = {};
        if (id) {
            condicoes.id = id;
        }
        if (codigoInterno) {
            condicoes.codigoInterno = codigoInterno;
        }

        const produto = await Produto.findOne({
            where: condicoes,
        });

        if (!produto) {
            return res.status(400).send({
                message: `Nenhum produto encontrado com o id ${id}`,
            });
        }

        await produto.destroy();
        return res.send({
            message: `Produto ${produto.id} foi deletado`
        });
    } catch (error) {
        return res.status(500).send({
            message: `Erro: ${error.message}`,
        });
    }
};

exports.updateProduto = async (req, res) => {
    const { nome, codigoInterno } = req.body;
    const { id } = req.params;

    const produto = await Produto.findOne({
            where: {
                id,
            },
        });

    if (!produto) {
        return res.status(400).send({
            message: `Nenhum produto encontrado com o ID ${id}`,
        });
    }

    let nomeAntigo;

    try {
        if (nome) {
            nomeAntigo = produto.nome,
            produto.nome = nome;
        }
        produto.save();
        return res.send({
            message: `Nome do produto ${codigoInterno} alterado para ${nome} (nome anterior ${nomeAntigo})`
        })
    } catch (error) {
        return res.status(500).send({
            message: `Erro: ${error.message}`,
        })
    }
};