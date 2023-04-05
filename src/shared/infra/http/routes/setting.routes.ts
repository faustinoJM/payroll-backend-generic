import { Router } from "express";
import { CreateSettingController } from "../../../../modules/settings/useCases/createSetting/CreateSettingController";
import { ListSettingController } from "../../../../modules/settings/useCases/listSetting/ListSettingController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const settingRouter = Router();
const createSettingController = new CreateSettingController();
const listSettingController = new ListSettingController()
// const updatePositionController = new UpdatePositionController()

settingRouter.use(ensureAuthenticated)

settingRouter.post("/", createSettingController.handle);

settingRouter.get('/', listSettingController.handle)

// settingRouter.put("/:id", updatePositionController.handle)




export { settingRouter };
