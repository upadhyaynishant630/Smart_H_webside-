const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

export function validateContact(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid business email.";
  if (v.company.trim() && v.company.trim().length < 2)
    e.company = "Please enter at least 2 characters, or leave this field blank.";
  if (v.phone.trim() && !PHONE.test(v.phone.trim()))
    e.phone = "Please enter a valid phone number, e.g. +91 98765 43210.";
  if (!v.service) e.service = "Please choose an enquiry type.";
  if (v.details.trim().length < 20)
    e.details = "Please share at least 20 characters about your project.";
  if (v.details.length > 3000) e.details = "Please keep project details under 3000 characters.";
  return e;
}
