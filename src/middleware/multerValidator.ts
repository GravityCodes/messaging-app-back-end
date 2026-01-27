import type { Request, Response, NextFunction } from "express";

const validateImages = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

  if (!files) {
    return res.status(400).json({ errors: "No files found" });
  }

  const profile = files["profile"]?.[0];
  const banner = files["banner"]?.[0];

  if (!profile && !banner) {
    return res.status(400).json({ error: "profile or banner image not found" });
  }

  if (typeof profile != "undefined") {
    if (profile.mimetype != "image/jpeg" && profile.mimetype != "image/png") {
      return res
        .status(415)
        .json({
          errors:
            "The media format is not supported. Please use a jpeg or png image.",
        });
    }
  }

  if (typeof banner != "undefined") {
    if (banner.mimetype != "image/jpeg" && banner.mimetype != "image/png") {
      return res
        .status(415)
        .json({
          errors:
            "The media format is not supported. Please use a jpeg or png image.",
        });
    }
  }

  next();
};

export default { validateImages };
