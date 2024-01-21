const {Router} = require("express")
const PoleControllers = require("../Controllers/poleControlers")
const router = Router();

router.post("/createPole",PoleControllers.CreatePoll)
router.put("/updatePole",PoleControllers.PollUpVDownV)

module.exports = router