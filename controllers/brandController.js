const brandService = require("../services/database/brandService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");

exports.addBrand = async (req, res) => {
  try {
    const { body } = req;
    const exists = await brandService.findBrand(body.name);
    if (exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_DUPLICATE_RECORD
      );
    }
    await brandService.addBrand(body);
    return res.status(HttpCodes.OK).send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULLY_CREATED
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { body } = req;
    const exists = await brandService.findBrand(body.name);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
    const brandId = exists.dataValues.id;
    await brandService.updateBrand(req.file?.filename, body, brandId);
    return res.status(HttpCodes.OK).send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULLY_UPDATED
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { body } = req;
    const exists = await brandService.findBrand(body.name);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
    const brandId = exists.dataValues.id;
    await brandService.deleteBrand(brandId);
    return res.status(HttpCodes.OK).send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULLY_DELETED
      )
    );
  } catch (err) {
    console.error(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.listBrands = async (req, res) => {
  try {
    let brands = await brandService.listBrands();
    if (!brands) {
      throw new ErrorResponse(
        HttpCodes.INTERNAL_SERVER_ERROR,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
    brands = req.user?.role == "Admin"
      ? brands
      : brands.map((item) => ({ name: item.name }));
    return res.status(HttpCodes.OK).send(
      new SuccessResponse(AppMessages.SUCCESS, brands)
    );
  } catch (err) {
    console.error(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};
