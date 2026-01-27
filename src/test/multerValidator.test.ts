import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import multerValidator from "../middleware/multerValidator";
import type { Request, Response, NextFunction } from "express";

describe("Validate image files", () => {
  test("Reject wrong mimetype", () => {
    const req = {
      files: {
        profile: [{ mimetype: "image/svg" } as Express.Multer.File],
        banner: [{ mimetype: "image/lpf" } as Express.Multer.File],
      },
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as Partial<Response> as Response;

    const next = vi.fn() as NextFunction;

    multerValidator.validateImages(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  test("Accept correct mimetype", () => {
    const req = {
      files: {
        profile: [{ mimetype: "image/jpeg" } as Express.Multer.File],
        banner: [{ mimetype: "image/png" } as Express.Multer.File],
      },
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as Partial<Response> as Response;

    const next = vi.fn() as NextFunction;

    multerValidator.validateImages(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
