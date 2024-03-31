const modelService = require("../services/database/modelService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const { use } = require("../routes/users");

exports.addModel = async (req, res) => {
  try {
    let { body } = req;
    let exists = !!(await modelService.findModel(body.name));
    if (exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_DUPLICATE_RECORD
      );
    } else {
      await modelService.addModel(body);
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_CREATED
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateModel = async (req, res) => {
  try {
    let { body } = req;
    let exists = await modelService.findModel(body.name);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      let modelId = exists.dataValues.id;
      await modelService.updateModel(body, modelId);
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_UPDATED
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteModel = async (req, res) => {
  try {
    let { body } = req;
    let exists = await modelService.findModel(body.name);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      let modelId = exists.dataValues.id;
      await modelService.deleteModel(modelId);
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_DELETED
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.listModels = async (req, res) => {
  try {
    let models = await modelService.listModels();
    if (models) {
      models =
        req.user?.role.toLowerCase() == "admin"
          ? models
          : models.map((item) => ({
              id: item.id,
              name: item.name,
            }));
      return res
        .status(HttpCodes.OK)
        .send(new SuccessResponse(AppMessages.SUCCESS, models));
    } else {
      throw new ErrorResponse(
        HttpCodes.INTERNAL_SERVER_ERROR,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.activateModel = async (req, res) => {
  try {
    let exists = await modelService.findModelById (req.body.id);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      console.log
      await modelService.activateModel (req.body.id);
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_UPDATED
          )
        );
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};