const { ProductModel } = require("../../models");

exports.addModel = async (body) => {
  const newModel = await ProductModel.create({ ...body });
  return newModel;
};

exports.findModel = async (name) => {
  let model = await ProductModel.findOne({ 
    where: { name,
    is_active: true, } });
  return model;
};
exports.findModelById = async (id) => {
  let model = await ProductModel.findOne({ 
    where: { id } });
  return model;
};

exports.updateModel = async (body, modelId) => {
  let model = await ProductModel.update(
    { name: body.newName },
    { where: { id: modelId } }
  );
  return model;
};

exports.activateModel = async (id) => {
  let model = await ProductModel.update(
    { is_active: 1 },
    { where: { id } }
  );
  return model;
};

exports.listModels = async () => {
  let allModels = await ProductModel.findAll({
    where: {
      is_active: 1,
    },
  });
  return allModels;
};

exports.deleteModel = async (modelId) => {
  let model = await ProductModel.update(
    { is_active: false },
    { where: { id: modelId } }
  );
  return model;
};
