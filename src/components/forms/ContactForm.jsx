import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { validateContact } from "@/lib/formValidation";
import { buttonStyles } from "@/components/ui/brand";
import { cn } from "@/lib/utils";

/* --------------------------------------------------
   COUNTRY LIST
   Each country has a unique ISO value.
   Countries sharing a dialing code remain distinct.
-------------------------------------------------- */

const countries = [
  { iso: "AF", name: "Afghanistan", code: "+93" },
  { iso: "AL", name: "Albania", code: "+355" },
  { iso: "DZ", name: "Algeria", code: "+213" },
  { iso: "AD", name: "Andorra", code: "+376" },
  { iso: "AO", name: "Angola", code: "+244" },
  { iso: "AG", name: "Antigua and Barbuda", code: "+1268" },
  { iso: "AR", name: "Argentina", code: "+54" },
  { iso: "AM", name: "Armenia", code: "+374" },
  { iso: "AU", name: "Australia", code: "+61" },
  { iso: "AT", name: "Austria", code: "+43" },
  { iso: "AZ", name: "Azerbaijan", code: "+994" },
  { iso: "BS", name: "Bahamas", code: "+1242" },
  { iso: "BH", name: "Bahrain", code: "+973" },
  { iso: "BD", name: "Bangladesh", code: "+880" },
  { iso: "BB", name: "Barbados", code: "+1246" },
  { iso: "BY", name: "Belarus", code: "+375" },
  { iso: "BE", name: "Belgium", code: "+32" },
  { iso: "BZ", name: "Belize", code: "+501" },
  { iso: "BJ", name: "Benin", code: "+229" },
  { iso: "BT", name: "Bhutan", code: "+975" },
  { iso: "BO", name: "Bolivia", code: "+591" },
  { iso: "BA", name: "Bosnia and Herzegovina", code: "+387" },
  { iso: "BW", name: "Botswana", code: "+267" },
  { iso: "BR", name: "Brazil", code: "+55" },
  { iso: "BN", name: "Brunei", code: "+673" },
  { iso: "BG", name: "Bulgaria", code: "+359" },
  { iso: "KH", name: "Cambodia", code: "+855" },
  { iso: "CM", name: "Cameroon", code: "+237" },
  { iso: "CA", name: "Canada", code: "+1" },
  { iso: "CL", name: "Chile", code: "+56" },
  { iso: "CN", name: "China", code: "+86" },
  { iso: "CO", name: "Colombia", code: "+57" },
  { iso: "CR", name: "Costa Rica", code: "+506" },
  { iso: "HR", name: "Croatia", code: "+385" },
  { iso: "CY", name: "Cyprus", code: "+357" },
  { iso: "CZ", name: "Czechia", code: "+420" },
  { iso: "DK", name: "Denmark", code: "+45" },
  { iso: "DO", name: "Dominican Republic", code: "+1809" },
  { iso: "EC", name: "Ecuador", code: "+593" },
  { iso: "EG", name: "Egypt", code: "+20" },
  { iso: "EE", name: "Estonia", code: "+372" },
  { iso: "ET", name: "Ethiopia", code: "+251" },
  { iso: "FI", name: "Finland", code: "+358" },
  { iso: "FR", name: "France", code: "+33" },
  { iso: "GE", name: "Georgia", code: "+995" },
  { iso: "DE", name: "Germany", code: "+49" },
  { iso: "GH", name: "Ghana", code: "+233" },
  { iso: "GR", name: "Greece", code: "+30" },
  { iso: "HK", name: "Hong Kong", code: "+852" },
  { iso: "HU", name: "Hungary", code: "+36" },
  { iso: "IS", name: "Iceland", code: "+354" },
  { iso: "IN", name: "India", code: "+91" },
  { iso: "ID", name: "Indonesia", code: "+62" },
  { iso: "IR", name: "Iran", code: "+98" },
  { iso: "IQ", name: "Iraq", code: "+964" },
  { iso: "IE", name: "Ireland", code: "+353" },
  { iso: "IL", name: "Israel", code: "+972" },
  { iso: "IT", name: "Italy", code: "+39" },
  { iso: "JM", name: "Jamaica", code: "+1876" },
  { iso: "JP", name: "Japan", code: "+81" },
  { iso: "JO", name: "Jordan", code: "+962" },
  { iso: "KZ", name: "Kazakhstan", code: "+7" },
  { iso: "KE", name: "Kenya", code: "+254" },
  { iso: "KW", name: "Kuwait", code: "+965" },
  { iso: "LB", name: "Lebanon", code: "+961" },
  { iso: "LT", name: "Lithuania", code: "+370" },
  { iso: "LU", name: "Luxembourg", code: "+352" },
  { iso: "MY", name: "Malaysia", code: "+60" },
  { iso: "MV", name: "Maldives", code: "+960" },
  { iso: "MT", name: "Malta", code: "+356" },
  { iso: "MU", name: "Mauritius", code: "+230" },
  { iso: "MX", name: "Mexico", code: "+52" },
  { iso: "MC", name: "Monaco", code: "+377" },
  { iso: "MN", name: "Mongolia", code: "+976" },
  { iso: "MA", name: "Morocco", code: "+212" },
  { iso: "MM", name: "Myanmar", code: "+95" },
  { iso: "NP", name: "Nepal", code: "+977" },
  { iso: "NL", name: "Netherlands", code: "+31" },
  { iso: "NZ", name: "New Zealand", code: "+64" },
  { iso: "NG", name: "Nigeria", code: "+234" },
  { iso: "NO", name: "Norway", code: "+47" },
  { iso: "OM", name: "Oman", code: "+968" },
  { iso: "PK", name: "Pakistan", code: "+92" },
  { iso: "PA", name: "Panama", code: "+507" },
  { iso: "PE", name: "Peru", code: "+51" },
  { iso: "PH", name: "Philippines", code: "+63" },
  { iso: "PL", name: "Poland", code: "+48" },
  { iso: "PT", name: "Portugal", code: "+351" },
  { iso: "QA", name: "Qatar", code: "+974" },
  { iso: "RO", name: "Romania", code: "+40" },
  { iso: "RU", name: "Russia", code: "+7" },
  { iso: "SA", name: "Saudi Arabia", code: "+966" },
  { iso: "SG", name: "Singapore", code: "+65" },
  { iso: "ZA", name: "South Africa", code: "+27" },
  { iso: "KR", name: "South Korea", code: "+82" },
  { iso: "ES", name: "Spain", code: "+34" },
  { iso: "LK", name: "Sri Lanka", code: "+94" },
  { iso: "SE", name: "Sweden", code: "+46" },
  { iso: "CH", name: "Switzerland", code: "+41" },
  { iso: "TW", name: "Taiwan", code: "+886" },
  { iso: "TZ", name: "Tanzania", code: "+255" },
  { iso: "TH", name: "Thailand", code: "+66" },
  { iso: "TR", name: "Turkey", code: "+90" },
  { iso: "UA", name: "Ukraine", code: "+380" },
  { iso: "AE", name: "United Arab Emirates", code: "+971" },
  { iso: "GB", name: "United Kingdom", code: "+44" },
  { iso: "US", name: "United States", code: "+1" },
  { iso: "UG", name: "Uganda", code: "+256" },
  { iso: "UY", name: "Uruguay", code: "+598" },
  { iso: "UZ", name: "Uzbekistan", code: "+998" },
  { iso: "VE", name: "Venezuela", code: "+58" },
  { iso: "VN", name: "Vietnam", code: "+84" },
  { iso: "ZM", name: "Zambia", code: "+260" },
  { iso: "ZW", name: "Zimbabwe", code: "+263" },
].sort((a, b) => a.name.localeCompare(b.name));

/* --------------------------------------------------
   INITIAL FORM VALUES
-------------------------------------------------- */

const empty = {
  name: "",
  email: "",
  company: "",
  countryISO: "",
  phone: "",
  service: "",
  details: "",
  timeline: "",
  website: "",
};

const inputCls =
  "cf-control mt-2 block w-full min-w-0 rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive";

/* --------------------------------------------------
   FORM ANIMATIONS AND RESPONSIVE STYLES
-------------------------------------------------- */

const contactFormStyles = `
  .contact-form-enhanced,
  .contact-form-enhanced *,
  .cf-success-card,
  .cf-success-card * {
    box-sizing: border-box;
  }

  .contact-form-enhanced {
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    animation: cf-form-enter 650ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .contact-form-enhanced > * {
    min-width: 0;
  }

  @keyframes cf-form-enter {
    from {
      opacity: 0;
      transform: translate3d(0, 16px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .contact-form-enhanced > .cf-field-cell {
    animation: cf-field-enter 600ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(1) {
    animation-delay: 40ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(2) {
    animation-delay: 80ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(3) {
    animation-delay: 120ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(4) {
    animation-delay: 160ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(5) {
    animation-delay: 200ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(6) {
    animation-delay: 240ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(7) {
    animation-delay: 280ms;
  }

  .contact-form-enhanced > .cf-field-cell:nth-of-type(8) {
    animation-delay: 320ms;
  }

  @keyframes cf-field-enter {
    from {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .contact-form-enhanced .cf-field {
    width: 100%;
    min-width: 0;
  }

  .contact-form-enhanced label {
    overflow-wrap: anywhere;
  }

  .contact-form-enhanced .cf-field label {
    transition: color 200ms ease;
  }

  .contact-form-enhanced .cf-field:focus-within label {
    color: var(--primary);
  }

  .contact-form-enhanced .cf-control {
    max-width: 100%;
    min-width: 0;
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      background-color 220ms ease,
      transform 220ms ease;
  }

  .contact-form-enhanced input.cf-control:focus,
  .contact-form-enhanced select.cf-control:focus,
  .contact-form-enhanced textarea.cf-control:focus {
    transform: translateY(-1px);
  }

  .contact-form-enhanced textarea.cf-control {
    display: block;
    min-height: 108px;
    resize: vertical;
    line-height: 1.65;
  }

  .contact-form-enhanced .cf-error {
    overflow-wrap: anywhere;
    animation: cf-error-enter 200ms ease-out both;
  }

  @keyframes cf-error-enter {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .contact-form-enhanced .cf-submit {
    max-width: 100%;
    min-height: 44px;
    transform: translateY(0);
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      opacity 220ms ease,
      filter 220ms ease;
  }

  .contact-form-enhanced .cf-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.035);
  }

  .contact-form-enhanced .cf-submit:active:not(:disabled) {
    transform: translateY(0) scale(.985);
  }

  .contact-form-enhanced .cf-submit:disabled {
    cursor: wait;
    opacity: .72;
  }

  .contact-form-enhanced .cf-footer {
    min-width: 0;
  }

  .contact-form-enhanced .cf-alert {
    min-width: 0;
    overflow-wrap: anywhere;
    animation: cf-form-enter 350ms ease-out both;
  }

  .contact-form-enhanced .cf-country-info {
    animation: cf-error-enter 200ms ease-out both;
  }

  .contact-form-honeypot {
    position: absolute !important;
    top: auto !important;
    left: -10000px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    clip-path: inset(50%) !important;
  }

  .cf-success-card {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    animation: cf-form-enter 550ms cubic-bezier(.22, 1, .36, 1) both;
  }

  .cf-success-icon {
    animation: cf-success-pop 550ms cubic-bezier(.22, 1, .36, 1) both;
  }

  @keyframes cf-success-pop {
    from {
      opacity: 0;
      transform: scale(.76);
    }
    70% {
      transform: scale(1.08);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 640px) {
    .contact-form-enhanced {
      gap: 1rem;
    }

    .contact-form-enhanced .cf-footer {
      align-items: stretch;
    }

    .contact-form-enhanced .cf-submit {
      width: 100%;
      justify-content: center;
    }

    .contact-form-enhanced textarea.cf-control {
      min-height: 100px;
    }
  }

  @media (max-width: 380px) {
    .contact-form-enhanced {
      padding: 1rem !important;
    }

    .contact-form-enhanced .cf-control {
      padding-left: .8rem;
      padding-right: .8rem;
      font-size: .875rem;
    }

    .contact-form-enhanced .cf-footer {
      gap: .75rem;
    }
  }

  @media (min-width: 641px) and (max-height: 760px) {
    .contact-form-enhanced {
      gap: 1rem;
      padding: 1.25rem !important;
    }

    .contact-form-enhanced .cf-control {
      margin-top: .35rem;
      padding-top: .6rem;
      padding-bottom: .6rem;
    }

    .contact-form-enhanced textarea.cf-control {
      min-height: 82px;
    }

    .contact-form-enhanced .cf-footer {
      gap: .65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-form-enhanced,
    .contact-form-enhanced > .cf-field-cell,
    .contact-form-enhanced .cf-error,
    .contact-form-enhanced .cf-alert,
    .contact-form-enhanced .cf-submit,
    .contact-form-enhanced .cf-country-info,
    .cf-success-card,
    .cf-success-icon {
      animation: none !important;
      transition: none !important;
    }

    .contact-form-enhanced .cf-control {
      transform: none !important;
    }
  }
`;

/* --------------------------------------------------
   CONTACT FORM COMPONENT
-------------------------------------------------- */

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const selectedCountry =
    countries.find(
      (country) => country.iso === values.countryISO,
    ) ?? null;

  /* Generic field update */
  const set = (key) => (event) => {
    const value = event.target.value;

    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [key]: undefined,
      }));
    }

    if (
      status === "error" ||
      status === "unconfigured"
    ) {
      setStatus("idle");
    }
  };

  /* Form submission */
  async function onSubmit(event) {
    event.preventDefault();

    if (status === "sending") return;

    const found = {
      ...(validateContact(values) ?? {}),
    };

    /*
     * Project details are optional.
     * Country and phone have their own validation.
     */
    delete found.details;
    delete found.phone;
    delete found.countryISO;

    /* Country selection validation */
    if (!selectedCountry) {
      found.countryISO = "Please select your country.";
    }

    /* Phone validation */
    const phoneInput = values.phone.trim();
    const phoneDigits = phoneInput.replace(/\D/g, "");

    if (!phoneInput) {
      found.phone = "Phone number is required.";
    } else if (!/^[0-9\s().-]+$/.test(phoneInput)) {
      found.phone = "Please enter a valid phone number.";
    } else if (phoneDigits.length < 6) {
      found.phone = "Phone number must contain at least 6 digits.";
    } else if (
      selectedCountry &&
      phoneDigits.length + selectedCountry.code.replace(/\D/g, "").length > 15
    ) {
      found.phone = "The international phone number is too long.";
    }

    setErrors(found);

    const errorKeys = Object.keys(found);

    if (errorKeys.length > 0) {
      document
        .getElementById(`f-${errorKeys[0]}`)
        ?.focus();

      return;
    }

    /* Spam protection */
    if (values.website) return;

    if (!siteConfig.contactEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
      const completePhone =
        `${selectedCountry.code} ${phoneDigits}`;

      const response = await fetch(
        siteConfig.contactEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...values,

            /* Country information */
            countryISO: selectedCountry.iso,
            countryName: selectedCountry.name,
            countryCode: selectedCountry.code,

            /* Complete international phone */
            phone: completePhone,

            /* Separate national number */
            phoneNumber: phoneDigits,

            /* Optional project details */
            details: values.details.trim(),

            /* Honeypot excluded */
            website: undefined,

            source: "smart-h-website",
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`,
        );
      }

      setValues({ ...empty });
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /* Reusable input field */
  const field = (key, label, options = {}) => (
    <div className="cf-field">
      <label
        htmlFor={`f-${key}`}
        className="block text-sm font-semibold"
      >
        {label}{" "}

        {options.optional ? (
          <span className="font-normal text-muted-foreground">
            (optional)
          </span>
        ) : (
          <span className="text-signal" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={`f-${key}`}
        name={key}
        type={options.type ?? "text"}
        autoComplete={options.auto}
        inputMode={options.inputMode}
        placeholder={options.placeholder}
        value={values[key]}
        onChange={set(key)}
        required={!options.optional}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={
          errors[key] ? `e-${key}` : undefined
        }
        className={inputCls}
      />

      {errors[key] && (
        <p
          id={`e-${key}`}
          className="cf-error mt-1.5 text-xs text-destructive"
        >
          {errors[key]}
        </p>
      )}
    </div>
  );

  /* Success screen */
  if (status === "success") {
    return (
      <>
        <style>{contactFormStyles}</style>

        <div
          className="cf-success-card rounded-2xl border border-border bg-card p-6 text-center shadow-soft sm:p-10"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2
            className="cf-success-icon mx-auto h-12 w-12 text-primary"
            aria-hidden="true"
          />

          <h2 className="mt-4 text-2xl font-bold">
            Thank you — your message was received.
          </h2>

          <p className="mt-2 text-muted-foreground">
            Our team will review your inquiry and reply by email.
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={cn(
              buttonStyles({ variant: "outline" }),
              "mt-6 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
            )}
          >
            Send another message
          </button>
        </div>
      </>
    );
  }

  /* Main form */
  return (
    <>
      <style>{contactFormStyles}</style>

      <form
        noValidate
        onSubmit={onSubmit}
        className="contact-form-enhanced relative grid w-full min-w-0 gap-5 overflow-visible rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 sm:p-9"
      >
        {/* Full name */}
        <div className="cf-field-cell min-w-0">
          {field("name", "Full name", {
            auto: "name",
          })}
        </div>

        {/* Business email */}
        <div className="cf-field-cell min-w-0">
          {field("email", "Business email", {
            type: "email",
            auto: "email",
          })}
        </div>

        {/* Company */}
        <div className="cf-field-cell min-w-0">
          {field("company", "Company or organisation", {
            auto: "organization",
            optional: true,
          })}
        </div>

        {/* Country dropdown */}
        <div className="cf-field-cell cf-field min-w-0">
          <label
            htmlFor="f-countryISO"
            className="block text-sm font-semibold"
          >
            Country / Dialing Code{" "}
            <span className="text-signal" aria-hidden="true">
              *
            </span>
          </label>

          <select
            id="f-countryISO"
            name="countryISO"
            value={values.countryISO}
            onChange={set("countryISO")}
            required
            aria-invalid={Boolean(errors.countryISO)}
            aria-describedby={
              errors.countryISO
                ? "e-countryISO"
                : selectedCountry
                  ? "cf-country-selected"
                  : undefined
            }
            className={inputCls}
          >
            <option value="">
              Select your country
            </option>

            {countries.map((country) => (
              <option
                key={country.iso}
                value={country.iso}
              >
                {country.name} ({country.code})
              </option>
            ))}
          </select>

          {errors.countryISO && (
            <p
              id="e-countryISO"
              className="cf-error mt-1.5 text-xs text-destructive"
            >
              {errors.countryISO}
            </p>
          )}
        </div>

        {/* Phone number */}
        <div className="cf-field-cell min-w-0">
          {field("phone", "Phone number", {
            type: "tel",
            auto: "tel-national",
            inputMode: "tel",
            placeholder: "Enter your phone number",
          })}
        </div>

        {/* Enquiry type */}
        <div className="cf-field-cell cf-field min-w-0">
          <label
            htmlFor="f-service"
            className="block text-sm font-semibold"
          >
            Enquiry type{" "}
            <span className="text-signal" aria-hidden="true">
              *
            </span>
          </label>

          <select
            id="f-service"
            name="service"
            value={values.service}
            onChange={set("service")}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "e-service" : undefined
            }
            className={inputCls}
          >
            <option value="">Select…</option>

            <option value="residential-solar">
              Residential Solar - B2C
            </option>

            <option value="commercial-solar">
              Commercial Solar - B2B
            </option>

            {services.map((service) => (
              <option
                key={service.slug}
                value={service.slug}
              >
                {service.title}
              </option>
            ))}

            <option value="franchise">
              Franchise Enquiry
            </option>

            <option value="partnership">
              Business Partnership / Dealership
            </option>

            <option value="general">
              General Enquiry
            </option>
          </select>

          {errors.service && (
            <p
              id="e-service"
              className="cf-error mt-1.5 text-xs text-destructive"
            >
              {errors.service}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="cf-field-cell cf-field min-w-0">
          <label
            htmlFor="f-timeline"
            className="block text-sm font-semibold"
          >
            Timeline{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>

          <select
            id="f-timeline"
            name="timeline"
            value={values.timeline}
            onChange={set("timeline")}
            className={inputCls}
          >
            <option value="">Not sure yet</option>
            <option value="0-3">Within 3 months</option>
            <option value="3-6">3–6 months</option>
            <option value="6+">6+ months</option>
          </select>
        </div>

        {/* Project details - optional */}
        <div className="cf-field-cell cf-field min-w-0 sm:col-span-2">
          <label
            htmlFor="f-details"
            className="block text-sm font-semibold"
          >
            Project details{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>

          <textarea
            id="f-details"
            name="details"
            rows={4}
            value={values.details}
            onChange={set("details")}
            className={inputCls}
            placeholder="Tell us a little about your project (optional)"
          />
        </div>

        {/* Honeypot */}
        <div
          className="contact-form-honeypot"
          aria-hidden="true"
        >
          <label htmlFor="f-website">Website</label>

          <input
            id="f-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </div>

        {/* Submission errors */}
        {(status === "error" ||
          status === "unconfigured") && (
          <div
            role="alert"
            className="cf-alert flex min-w-0 gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm sm:col-span-2"
          >
            <AlertCircle
              className="h-5 w-5 shrink-0 text-destructive"
              aria-hidden="true"
            />

            <p className="min-w-0">
              {status === "error"
                ? "We couldn't send your message. Please check your connection and try again."
                : "Online submission isn't connected yet, so your message was not sent."}

              {siteConfig.contactEmail && (
                <>
                  {" "}
                  You can email us directly at{" "}

                  <a
                    className="font-semibold text-primary underline"
                    href={`mailto:${siteConfig.contactEmail}`}
                  >
                    {siteConfig.contactEmail}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        )}

        {/* Footer and submit */}
        <div className="cf-footer flex min-w-0 flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Fields marked * are required.
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            className={cn(
              buttonStyles({ variant: "signal" }),
              "cf-submit gap-2",
            )}
          >
            {status === "sending" ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                <Send
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
                Send inquiry
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactForm;