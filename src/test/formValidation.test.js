import { describe, expect, it } from "vitest";
import { validateContact } from "@/lib/formValidation";

const valid = {
  name: "Asha Rao",
  email: "asha@company.com",
  company: "Acme",
  phone: "",
  service: "cybersecurity",
  details: "We need a security review of our offices.",
  timeline: "",
  website: "",
};

describe("contact validation", () => {
  it("accepts a complete inquiry", () => expect(validateContact(valid)).toEqual({}));
  it("rejects an invalid email", () =>
    expect(validateContact({ ...valid, email: "asha@" }).email).toBeDefined());
  it("requires at least 20 characters of project details", () =>
    expect(validateContact({ ...valid, details: "short" }).details).toBeDefined());
  it("treats phone as optional but validates it when given", () => {
    expect(validateContact({ ...valid, phone: "" }).phone).toBeUndefined();
    expect(validateContact({ ...valid, phone: "abc" }).phone).toBeDefined();
  });
});
