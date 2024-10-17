import Comic from "../models/comic.model.js";

export const createComic = async (req, res) => {
  try {
    const {
      id,
      bookName,
      authorName,
      yearOfPublication,
      price,
      discount,
      numberOfPages,
      condition,
      description,
      genre,
    } = req.body;

    if (
      !id ||
      !bookName ||
      !authorName ||
      !yearOfPublication ||
      !price ||
      !numberOfPages ||
      !condition ||
      !genre
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const validConditions = ["new", "used"];
    if (!validConditions.includes(condition)) {
      return res.status(400).json({
        message: 'Invalid condition. Must be either "new" or "used".',
      });
    }

    const comicBook = new Comic({
      id,
      bookName,
      authorName,
      yearOfPublication,
      price,
      discount: discount || 0,
      numberOfPages,
      condition,
      description: description || "",
      genre,
    });

    const createdComic = await comicBook.save();

    res.status(201).json({
      message: "Comic book added successfully",
      comic: createdComic,
    });
  } catch (error) {
    console.error("Error adding comic book:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not add comic book." });
  }
};

export const updateComic = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedComic = await Comic.findOneAndUpdate({ id: id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedComic) {
      return res.status(404).json({ message: "Comic book not found." });
    }

    res.status(200).json({
      message: "Comic book updated successfully",
      comic: updatedComic,
    });
  } catch (error) {
    console.error("Error updating comic book:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not update comic book." });
  }
};

export const deleteComic = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComic = await Comic.findOneAndDelete({ id: id });

    if (!deletedComic) {
      return res.status(404).json({ message: "Comic book not found." });
    }

    res.status(200).json({
      message: "Comic book deleted successfully.",
      comic: deletedComic,
    });
  } catch (error) {
    console.error("Error deleting comic book:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not delete comic book." });
  }
};

export const getComicDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const comic = await Comic.findOne({ id: id });

    if (!comic) {
      return res.status(404).json({ message: "Comic book not found." });
    }

    res.status(200).json({
      message: "Comic book details retrieved successfully.",
      comic: comic,
    });
  } catch (error) {
    console.error("Error fetching comic book details:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not fetch comic book details." });
  }
};

export const getComics = async (req, res) => {
  const {
    page = 1,
    limit = 2,
    authorName,
    yearOfPublication,
    price,
    condition,
    sortBy = "bookName",
    sortOrder = "asc",
  } = req.query;

  try {
    const filter = {};
    if (authorName) filter.authorName = authorName;
    if (yearOfPublication) filter.yearOfPublication = yearOfPublication;
    if (price) filter.price = price;
    if (condition) filter.condition = condition;

    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const comics = await Comic.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Comic.countDocuments(filter);

    res.status(200).json({
      message: "Comic books retrieved successfully.",
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      comics,
    });
  } catch (error) {
    console.error("Error fetching comic books:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not fetch comic books." });
  }
};

export const fetchComicBook = async (req, res) => {
  const {
    authorName,
    yearOfPublication,
    price,
    condition,
    sortBy = "bookName",
    sortOrder = "asc",
  } = req.query;

  try {
    const filter = {
      ...(authorName && { authorName }),
      ...(yearOfPublication && { yearOfPublication }),
      ...(price && { price }),
      ...(condition && { condition }),
    };

    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const comics = await Comic.find(filter).sort(sort);

    res.status(200).json({
      message: "Comic books retrieved successfully.",
      comics,
    });
  } catch (error) {
    console.error("Error fetching comic books:", error);
    res.status(500).json({
      message: "Server error. Could not fetch comic books.",
    });
  }
};
