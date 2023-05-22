import { Router } from "express";
import multer from "multer";
import { CreateSettingController } from "../../../../modules/settings/useCases/createSetting/CreateSettingController";
import { ListSettingController } from "../../../../modules/settings/useCases/listSetting/ListSettingController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import uploadConfig from "../../../../config/upload"


const settingRouter = Router();
const createSettingController = new CreateSettingController();
const listSettingController = new ListSettingController()
// const updatePositionController = new UpdatePositionController()
const uploadCompanyLogo = multer(uploadConfig)


settingRouter.use(ensureAuthenticated)

settingRouter.post("/", uploadCompanyLogo.array("logo"), createSettingController.handle);


settingRouter.get('/', listSettingController.handle)

// settingRouter.put("/:id", updatePositionController.handle)




export { settingRouter };
