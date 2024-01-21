const {Router} = require("express")

const authControllers = require("../Controllers/authControllers")

const router = Router()

//Signup For DepartmentPerson
router.post("/deptsignup",authControllers.deptsignup)
//Signup For Public
router.post("/publicSignup",authControllers.publicsignup)
router.post("/publiclogin",authControllers.publiclogin)

//Signup For DepartmentPerson
// router.post("/deptlogin")

module.exports = router
