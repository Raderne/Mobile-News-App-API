const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article");

router.route("/").get(getAllArticles).post(createArticle);
router
  .route("/:id")
  .get(getArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

module.exports = router;
