const brandService = require("../services/database/brandService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");

exports.addBrand = async (req, res) => {
  try {
    let { body } = req;
    let exists = !!(await brandService.findBrand(body.name));
    if (exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_DUPLICATE_RECORD
      );
    } else {
      console.log("fgbfgb fgb", body)
      await brandService.addBrand(body);
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
    console.log(err)
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  let { body } = req;
  let exists = await brandService.findBrand(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let brandId = exists.dataValues.id;
    await brandService.updateBrand(req.file?.filename, body, brandId);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_UPDATED
        )
      );
  }
};

exports.deleteBrand = async (req, res) => {
  let { body } = req;
  let exists = await brandService.findBrand(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let brandId = exists.dataValues.id;
    await brandService.deleteBrand(brandId);
    //Api Call and Compose Response Response
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_DELETED
        )
      );
  }
};

exports.listBrands = async (req, res) => {
  let brands = await brandService.listBrands();
  if (!brands) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    brands =
      req.user?.role == "Admin"
        ? brands
        : brands.map((item) => ({
          name: item.name,
        }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, brands));
  }
};

exports.listBrands = async (req, res) => {
  let brands = await brandService.listBrands();
  if (!brands) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    brands =
      req.user?.role == "Admin"
        ? brands
        : brands.map((item) => ({
          name: item.name,
        }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, brands));
  }
};

// Path: /brands/:id/popularity
exports.getPopularity = async (req, res) => {
    const brandId = req.params.id;
    try {
      const popularity = await brandService.getPopularity(brandId);

      return res.status(200).send({
        id: brandId,
        ...popularity
      });

    } catch (err) {
        console.error('Error fetching brand popularity:', error);
        return res.status(500).send({ message: 'Error fetching brand popularity.' });
    }
}