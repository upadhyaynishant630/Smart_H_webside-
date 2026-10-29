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

const empty = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  details: "",
  timeline: "",
  website: "",
};

const inputCls =
  "cf-control mt-2 block w-full min-w-0 rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive";

/*
 * Keep the original visual design.
 * Add responsive fitting and subtle animations only.
 */
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
    color: hsl(var(--primary));
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

  /*
   * Off-screen honeypot:
   * It does not occupy layout space or receive keyboard focus.
   */
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

  /*
   * More compact spacing on shorter desktop/laptop screens.
   * Content remains accessible instead of being clipped.
   */
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

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

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

  async function onSubmit(event) {
    event.preventDefault();

    if (status === "sending") return;

    const found = validateContact(values);

    setErrors(found);

    const errorKeys = Object.keys(found);

    if (errorKeys.length > 0) {
      document
        .getElementById(`f-${errorKeys[0]}`)
        ?.focus();

      return;
    }

    // Honeypot: silently ignore automated submissions.
    if (values.website) return;

    if (!siteConfig.contactEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
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
            website: undefined,
            source: "smart-h-website",
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setValues({ ...empty });
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

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
        value={values[key]}
        onChange={set(key)}
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

  return (
    <>
      <style>{contactFormStyles}</style>

      <form
        noValidate
        onSubmit={onSubmit}
        className="contact-form-enhanced relative grid w-full min-w-0 gap-5 overflow-visible rounded-2xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 sm:p-9"
      >
        <div className="cf-field-cell min-w-0">
          {field("name", "Full name", {
            auto: "name",
          })}
        </div>

        <div className="cf-field-cell min-w-0">
          {field("email", "Business email", {
            type: "email",
            auto: "email",
          })}
        </div>

        <div className="cf-field-cell min-w-0">
          {field("company", "Company or organisation", {
            auto: "organization",
          })}
        </div>

        <div className="cf-field-cell min-w-0">
          {field("phone", "Phone (with country code)", {
            type: "tel",
            optional: true,
            auto: "tel",
          })}
        </div>

        <div className="cf-field-cell cf-field min-w-0">
          <label
            htmlFor="f-service"
            className="block text-sm font-semibold"
          >
            Inquiry type{" "}
            <span className="text-signal" aria-hidden="true">
              *
            </span>
          </label>

          <select
            id="f-service"
            name="service"
            value={values.service}
            onChange={set("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "e-service" : undefined
            }
            className={inputCls}
          >
            <option value="">Select…</option>

            {services.map((service) => (
              <option
                key={service.slug}
                value={service.slug}
              >
                {service.title}
              </option>
            ))}

            <option value="general">
              General inquiry
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

        <div className="cf-field-cell cf-field min-w-0 sm:col-span-2">
          <label
            htmlFor="f-details"
            className="block text-sm font-semibold"
          >
            Project details{" "}
            <span className="text-signal" aria-hidden="true">
              *
            </span>
          </label>

          <textarea
            id="f-details"
            name="details"
            rows={4}
            value={values.details}
            onChange={set("details")}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={
              errors.details ? "e-details" : undefined
            }
            className={inputCls}
          />

          {errors.details && (
            <p
              id="e-details"
              className="cf-error mt-1.5 text-xs text-destructive"
            >
              {errors.details}
            </p>
          )}
        </div>

        {/* Honeypot: off-screen and excluded from keyboard navigation. */}
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

            <p className="min-w-0 ">
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