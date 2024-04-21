const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");
const authController = require("../controllers/auth-controller.js");
const tokenController = require("../controllers/token-controller.js");
const authMiddleware = require("../middleware/auth-user-middleware.js");

//auth routes
router.post("/login", authController.login);
router.post("/signup", authController.signup);


//user routes
router.post("/user/create", userController.createUser);
router.get("/user/getall", userController.getAllUsers);
router.get('/user/oneuser/:userId', userController.getUserById);
router.put('/user/oneuser/:userId', userController.updateUserById);

router.use(authMiddleware);


router.get("/user/get-token-data/:time?/:id?", tokenController.getTokenData);


//token routes



// Token Auditor APIs
//API GET Status Request

//API Get Token Meta
router.get(`/user/get-token-auditor-status-meta/:id`, tokenController.getTokenLiveData);

//API Get Token Security
router.get(`/user/get-token-auditor-status-security/:id`, tokenController.getTokenAuditorSecurity);


router.get(`/user/get-token-live-data/:id`, tokenController.getTokenLiveData);





//API GET Code Audit Report 
router.get(`/user/get-token-auditor-status-code-audit/:id`, tokenController.getCodeAuditData);

router.post(`/user/get-token-auditor-status-code-audit-source-code`, tokenController.getCodeAuditDataUsingCode);


// Gas Tracker Data
router.get(`/user/get-gas-tracker-data`, tokenController.getGasTracker);


// //Get Trades Data
// router.get(`/user/get-trades-data/:id`, tokenController.getTradesData);


router.get(`/user/get-all-data-contract/:id`, tokenController.getAllDataContract);

router.get(`/user/get-score-contract/:id`, tokenController.getContractScore);





module.exports = router;
