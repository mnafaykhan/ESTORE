const productService = require("../services/database/productService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------CREATE-PRODUCT-----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------*/
exports.createProduct = async (req, res) => {
  try {
    let { body } = req;
    try {
      const newProduct = await productService.addProduct(body);

      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_CREATED
          )
        );
    } catch (error) {
      t.rollback();
      if (error.message === "Validation error") {
        return res.status(HttpCodes.CONFLICT).json({
          error: AppMessages.APP_DUPLICATE_RECORD,
        });
      }

      return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: "fail",
      message: err.message,
    });
  }
};
