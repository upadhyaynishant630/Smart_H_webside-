import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
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
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (values.website) return; // honeypot: silently drop bots
    if (!siteConfig.contactEndpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, website: undefined, source: "smart-h-website" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  const field = (k, label, opts = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="text-sm font-semibold">
        {label}{" "}
        {opts.optional ? (
          <span className="font-normal text-muted-foreground">(optional)</span>
        ) : (
          <span className="text-signal" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={`f-${k}`}
        type={opts.type ?? "text"}
        autoComplete={opts.auto}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={inputCls}
      />
      {errors[k] && (
        <p id={`e-${k}`} className="mt-1.5 text-xs text-destructive">
          {errors[k]}
        </p>
      )}
    </div>
  );

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Thank you — your message was received.</h2>
        <p className="mt-2 text-muted-foreground">
          Our team will review your inquiry and reply by email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonStyles({ variant: "outline" }), "mt-6")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-9"
    >
      <div className="sm:col-span-1">{field("name", "Full name", { auto: "name" })}</div>
      <div className="sm:col-span-1">
        {field("email", "Business email", { type: "email", auto: "email" })}
      </div>
      <div className="sm:col-span-1">
        {field("company", "Company or organisation", { auto: "organization" })}
      </div>
      <div className="sm:col-span-1">
        {field("phone", "Phone (with country code)", { type: "tel", optional: true, auto: "tel" })}
      </div>
      <div>
        <label htmlFor="f-service" className="text-sm font-semibold">
          Inquiry type{" "}
          <span className="text-signal" aria-hidden>
            *
          </span>
        </label>
        <select
          id="f-service"
          value={values.service}
          onChange={set("service")}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "e-service" : undefined}
          className={inputCls}
        >
          <option value="">Select…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="general">General inquiry</option>
        </select>
        {errors.service && (
          <p id="e-service" className="mt-1.5 text-xs text-destructive">
            {errors.service}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="f-timeline" className="text-sm font-semibold">
          Timeline <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <select
          id="f-timeline"
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
      <div className="sm:col-span-2">
        <label htmlFor="f-details" className="text-sm font-semibold">
          Project details{" "}
          <span className="text-signal" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="f-details"
          rows={5}
          value={values.details}
          onChange={set("details")}
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "e-details" : undefined}
          className={inputCls}
        />
        {errors.details && (
          <p id="e-details" className="mt-1.5 text-xs text-destructive">
            {errors.details}
          </p>
        )}
      </div>
      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="f-website">Website</label>
        <input
          id="f-website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      {(status === "error" || status === "unconfigured") && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm sm:col-span-2"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
          <p>
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

      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Fields marked * are required.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonStyles({ variant: "signal" })}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}
