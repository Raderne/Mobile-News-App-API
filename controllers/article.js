const Article = require("../models/Article");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllArticles = async (req, res) => {
  const articles = await Article.find().sort({ date: -1 });
  if (!articles) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Articles not found" });
  }

  res.status(StatusCodes.OK).json({ articles });
};

const getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Article not found" });
  }

  res.status(StatusCodes.OK).json({ article });
};

const createArticle = async (req, res) => {
  try {
    const { title, description, content, url, img, category } =
      req.body;
    const article = await Article.create({
      author: req.user.name + " " + req.user.lastName,
      title,
      description,
      content,
      url,
      img,
      category,
      userID: req.user.id,
    });

    res.status(StatusCodes.CREATED).json({ article });
  } catch (error) {
    throw new BadRequestError("Invalid article data (could not create)");
  }
};

const updateArticle = async (req, res) => {
  try {
    const { author, title, description, content, url, img, category } =
      req.body;
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        author,
        title,
        description,
        content,
        url,
        img,
        category,
      },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ article });
  } catch (error) {
    throw new BadRequestError("Invalid article data (could not update)");
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Article not found" });
    }

    res.status(StatusCodes.OK).json({ article });
  } catch (error) {
    throw new BadRequestError("Invalid article data (could not delete)");
  }
};

module.exports = {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
