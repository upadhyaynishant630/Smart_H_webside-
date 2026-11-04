
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "smartedge_solar_quote_popup_seen";

const QUOTE_CTA_LABELS = [
  "request a solar assessment",
  "request a site assessment",
  "discuss this option",
  "book a consultation",
  "start a conversation",
  "get a quote",
  "get free quote",
  "request my solar quote",
  "solar quote",
];

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(",");

export default function SolarQuotePopup({
  autoOpen = true,
  delay = 2400,
  onSubmit,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const autoTimerRef = useRef(null);

  const isOpenRef = useRef(false);
  const isSubmittingRef = useRef(false);

  const titleId = useId();
  const descriptionId = useId();
  const fieldId = useId();

  // ---------------------------------------------
  // OPEN POPUP
  // ---------------------------------------------
  const openPopup = useCallback(() => {
    if (autoTimerRef.current !== null) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    // Preserve the original focus only once.
    if (!isOpenRef.current) {
      previousFocusRef.current = document.activeElement;
    }

    isOpenRef.current = true;

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Continue when browser storage is unavailable.
    }

    setFormStatus(null);
    setIsOpen(true);
  }, []);

  // ---------------------------------------------
  // CLOSE POPUP
  // ---------------------------------------------
  const closePopup = useCallback(() => {
    if (isSubmittingRef.current) return;

    isOpenRef.current = false;
    setIsOpen(false);
  }, []);

  // ---------------------------------------------
  // AUTO OPEN + CTA CLICK HANDLING
  // ---------------------------------------------
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      // Explicit trigger works on buttons, links and other elements.
      const forcedTrigger = target.closest(
        "[data-open-solar-quote]"
      );

      let shouldOpen = Boolean(forcedTrigger);

      // Automatically detect existing contact CTA links.
      if (!shouldOpen) {
        const link = target.closest("a[href]");

        if (!link) return;

        let pathname = "";

        try {
          pathname = new URL(
            link.getAttribute("href"),
            window.location.href
          ).pathname
            .replace(/\/+$/, "")
            .toLowerCase();
        } catch {
          return;
        }

        const linkText = [
          link.textContent || "",
          link.getAttribute("aria-label") || "",
        ]
          .join(" ")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");

        const isQuoteCTA = QUOTE_CTA_LABELS.some((label) =>
          linkText.includes(label)
        );

        shouldOpen =
          pathname === "/contact" && isQuoteCTA;
      }

      if (!shouldOpen) return;

      event.preventDefault();
      openPopup();
    };

    const handleCustomOpen = () => {
      openPopup();
    };

    document.addEventListener(
      "click",
      handleDocumentClick,
      true
    );

    window.addEventListener(
      "smartedge:open-quote",
      handleCustomOpen
    );

    // Show once per browser session.
    if (autoOpen) {
      let alreadyShown = false;

      try {
        alreadyShown =
          window.sessionStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        alreadyShown = false;
      }

      if (!alreadyShown) {
        const safeDelay = Number.isFinite(Number(delay))
          ? Math.max(0, Number(delay))
          : 2400;

        autoTimerRef.current = window.setTimeout(
          openPopup,
          safeDelay
        );
      }
    }

    return () => {
      document.removeEventListener(
        "click",
        handleDocumentClick,
        true
      );

      window.removeEventListener(
        "smartedge:open-quote",
        handleCustomOpen
      );

      if (autoTimerRef.current !== null) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [autoOpen, delay, openPopup]);

  // ---------------------------------------------
  // ACCESSIBILITY + SCROLL LOCK + FOCUS TRAP
  // ---------------------------------------------
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector("[data-close-quote]")
        ?.focus();
    });

    const getFocusableElements = () => {
      if (!dialogRef.current) return [];

      return Array.from(
        dialogRef.current.querySelectorAll(
          FOCUSABLE_SELECTOR
        )
      ).filter((element) => {
        return (
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0
        );
      });
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements();

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      const focusInside =
        dialogRef.current?.contains(document.activeElement);

      if (
        event.shiftKey &&
        (document.activeElement === first || !focusInside)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !focusInside)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      window.cancelAnimationFrame(focusFrame);

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      const previousElement = previousFocusRef.current;

      if (
        previousElement &&
        document.contains(previousElement) &&
        typeof previousElement.focus === "function"
      ) {
        previousElement.focus();
      }
    };
  }, [isOpen, closePopup]);

  // ---------------------------------------------
  // FORM SUBMISSION
  // ---------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const values = Object.fromEntries(
      formData.entries()
    );

    // Do not pretend that data was sent without a backend.
    if (typeof onSubmit !== "function") {
      setFormStatus({
        type: "warning",
        message:
          "Your form is ready. Connect your contact form submission handler to send this enquiry to SmartEdge.",
      });

      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await onSubmit(values);

      form.reset();

      setFormStatus({
        type: "success",
        message:
          "Thank you! Your solar enquiry has been submitted successfully. Our team will get back to you.",
      });
    } catch (error) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "message" in error
          ? String(error.message)
          : "Something went wrong. Please try again.";

      setFormStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------
  // COMPONENT
  // ---------------------------------------------
  return (
    <>
      {isOpen && (
        <div
          className="se-quote-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePopup();
            }
          }}
        >
          <section
            ref={dialogRef}
            className="se-quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            aria-busy={isSubmitting}
            tabIndex={-1}
          >
            {/* Animated top accent */}
            <div className="se-quote-top-line" />

            {/* HEADER */}
            <header className="se-quote-header">
              <div className="se-quote-heading">
                <span className="se-quote-eyebrow">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>

                  SMARTEDGE SOLAR
                </span>

                <h2 id={titleId}>
                  Let's plan your{" "}
                  <span>solar project.</span>
                </h2>

                <p id={descriptionId}>
                  Tell us a little about your property and
                  electricity usage. Our team can help you
                  explore the right solar solution.
                </p>
              </div>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                className="se-quote-close"
                data-close-quote
                onClick={closePopup}
                aria-label="Close solar quote form"
              >
                <span>CLOSE</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            {/* FORM */}
            <form
              className="se-quote-form"
              onSubmit={handleSubmit}
              onChange={() => {
                if (formStatus) {
                  setFormStatus(null);
                }
              }}
            >
              <input
                type="hidden"
                name="formSource"
                value="SmartEdge Solar Quote Popup"
                readOnly
              />

              <div className="se-quote-grid">
                {/* FULL NAME */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-name`}>
                    FULL NAME <span>*</span>
                  </label>

                  <input
                    id={`${fieldId}-name`}
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    autoCapitalize="words"
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </div>

                {/* PHONE */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-phone`}>
                    PHONE NUMBER <span>*</span>
                  </label>

                  <input
                    id={`${fieldId}-phone`}
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="(?=.*[0-9])[0-9+() -]{8,18}"
                    title="Enter a valid phone number containing 8 to 18 characters."
                    maxLength={18}
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-email`}>
                    EMAIL ADDRESS
                  </label>

                  <input
                    id={`${fieldId}-email`}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    maxLength={120}
                  />
                </div>

                {/* PROPERTY TYPE */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-property`}>
                    PROPERTY TYPE <span>*</span>
                  </label>

                  <select
                    id={`${fieldId}-property`}
                    name="propertyType"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select property type
                    </option>

                    <option value="Residential Home">
                      Residential Home
                    </option>

                    <option value="Housing Society">
                      Housing Society
                    </option>

                    <option value="Commercial Building">
                      Commercial Building
                    </option>

                    <option value="Industrial Facility">
                      Industrial Facility
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* ELECTRICITY BILL */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-bill`}>
                    MONTHLY ELECTRICITY BILL
                  </label>

                  <select
                    id={`${fieldId}-bill`}
                    name="monthlyElectricityBill"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select monthly bill
                    </option>

                    <option value="Below ₹2,000">
                      Below ₹2,000
                    </option>

                    <option value="₹2,000 - ₹5,000">
                      ₹2,000 - ₹5,000
                    </option>

                    <option value="₹5,000 - ₹10,000">
                      ₹5,000 - ₹10,000
                    </option>

                    <option value="₹10,000 - ₹25,000">
                      ₹10,000 - ₹25,000
                    </option>

                    <option value="Above ₹25,000">
                      Above ₹25,000
                    </option>
                  </select>
                </div>

                {/* LOCATION */}
                <div className="se-quote-field">
                  <label htmlFor={`${fieldId}-city`}>
                    CITY / LOCATION <span>*</span>
                  </label>

                  <input
                    id={`${fieldId}-city`}
                    type="text"
                    name="location"
                    placeholder="City, State"
                    autoComplete="address-level2"
                    maxLength={120}
                    required
                  />
                </div>

                {/* PROJECT MESSAGE */}
                <div className="se-quote-field se-quote-field-full">
                  <label htmlFor={`${fieldId}-message`}>
                    TELL US ABOUT YOUR PROJECT
                  </label>

                  <textarea
                    id={`${fieldId}-message`}
                    name="message"
                    rows={3}
                    maxLength={1000}
                    placeholder="Tell us about your rooftop, electricity requirements, approximate area or any questions you have..."
                  />
                </div>
              </div>

              {/* STATUS MESSAGE */}
              {formStatus && (
                <div
                  className={`se-quote-status se-quote-status-${formStatus.type}`}
                  role="status"
                  aria-live="polite"
                >
                  <span className="se-quote-status-icon">
                    {formStatus.type === "success"
                      ? "✓"
                      : formStatus.type === "error"
                        ? "!"
                        : "i"}
                  </span>

                  <span>{formStatus.message}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="se-quote-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="se-quote-spinner" />
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    REQUEST MY SOLAR QUOTE

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* FOOTER NOTE */}
              <div className="se-quote-bottom-note">
                <span className="se-quote-note-icon">✦</span>

                A practical conversation. No obligation.
              </div>
            </form>
          </section>
        </div>
      )}

      {/* ALL COMPONENT CSS */}
      <style>{`

        /* =========================================
           RESET AND OVERLAY
        ========================================= */

        .se-quote-overlay,
        .se-quote-overlay * {
          box-sizing: border-box;
        }

        .se-quote-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;

          padding: clamp(8px, 2vw, 24px);

          overflow-y: auto;
          overscroll-behavior: contain;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(35, 88, 216, 0.16),
              transparent 35%
            ),
            rgba(5, 12, 27, 0.80);

          backdrop-filter: blur(10px) saturate(125%);
          -webkit-backdrop-filter: blur(10px) saturate(125%);

          animation: seQuoteOverlayIn 0.3s ease both;
        }

        /* =========================================
           MAIN MODAL
        ========================================= */

        .se-quote-modal {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          width: min(100%, 920px);

          max-height: 92vh;
          max-height: min(92dvh, 820px);

          min-height: 0;

          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 18px;

          background: #ffffff;

          box-shadow:
            0 35px 100px rgba(0, 0, 0, 0.32),
            0 8px 30px rgba(10, 28, 60, 0.12);

          outline: none;

          animation: seQuoteModalIn 0.45s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .se-quote-modal:focus {
          outline: none;
        }

        .se-quote-modal::before {
          position: absolute;
          top: -130px;
          right: -110px;

          width: 280px;
          height: 280px;

          content: "";
          pointer-events: none;

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(35, 88, 216, 0.07),
            transparent 70%
          );

          z-index: -1;
        }

        /* =========================================
           ANIMATED TOP LINE
        ========================================= */

        .se-quote-top-line {
          position: relative;
          flex: 0 0 5px;

          width: 100%;
          height: 5px;

          background: linear-gradient(
            100deg,
            #2358d8 0%,
            #4379f3 35%,
            #f4ad36 65%,
            #2358d8 100%
          );

          background-size: 220% 100%;

          animation: seQuoteGradient 5s linear infinite;
        }

        /* =========================================
           HEADER
        ========================================= */

        .se-quote-header {
          position: relative;
          flex: 0 0 auto;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          padding: 26px 32px 18px;
        }

        .se-quote-heading {
          min-width: 0;
          max-width: 720px;
        }

        .se-quote-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 10px;

          color: #2358d8;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.6px;
          line-height: 1.5;
        }

        .se-quote-eyebrow svg {
          flex: 0 0 17px;

          width: 17px;
          height: 17px;

          color: #e99b24;

          animation: seQuoteSun 8s linear infinite;
        }

        .se-quote-heading h2 {
          margin: 0;

          color: #101b35;

          font-size: clamp(26px, 3vw, 36px);
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.14;
        }

        .se-quote-heading h2 span {
          color: #2358d8;
        }

        .se-quote-heading p {
          max-width: 590px;

          margin: 9px 0 0;

          color: #727d90;

          font-size: 12px;
          font-weight: 400;
          line-height: 1.7;
        }

        /* =========================================
           CLOSE BUTTON
        ========================================= */

        .se-quote-close {
          position: absolute;
          top: 22px;
          right: 24px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          min-width: 70px;
          height: 36px;

          padding: 0 11px;

          border: 0;
          border-radius: 7px;

          background: #2358d8;
          color: #ffffff;

          cursor: pointer;

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .se-quote-close span {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.7px;
        }

        .se-quote-close svg {
          flex: 0 0 15px;

          width: 15px;
          height: 15px;

          transition: transform 0.3s ease;
        }

        .se-quote-close:hover {
          background: #153d9e;
          transform: translateY(-2px);

          box-shadow: 0 5px 15px rgba(35, 88, 216, 0.2);
        }

        .se-quote-close:hover svg {
          transform: rotate(90deg);
        }

        /* =========================================
           FORM
        ========================================= */

        .se-quote-form {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;

          min-height: 0;

          padding: 2px 32px 22px;

          overflow-x: hidden;
          overflow-y: auto;

          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: #c9d3e2 #f4f6fa;
          scrollbar-gutter: stable;
        }

        .se-quote-form::-webkit-scrollbar {
          width: 6px;
        }

        .se-quote-form::-webkit-scrollbar-track {
          background: #f4f6fa;
          border-radius: 10px;
        }

        .se-quote-form::-webkit-scrollbar-thumb {
          background: #c9d3e2;
          border-radius: 10px;
        }

        .se-quote-form::-webkit-scrollbar-thumb:hover {
          background: #a9b9d0;
        }

        /* =========================================
           RESPONSIVE GRID
        ========================================= */

        .se-quote-grid {
          display: grid;

          grid-template-columns: repeat(3, minmax(0, 1fr));

          gap: 15px 16px;
        }

        .se-quote-field {
          display: flex;
          flex-direction: column;

          min-width: 0;

          gap: 7px;

          opacity: 0;

          animation: seQuoteFieldIn 0.55s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .se-quote-field:nth-child(1) {
          animation-delay: 0.08s;
        }

        .se-quote-field:nth-child(2) {
          animation-delay: 0.13s;
        }

        .se-quote-field:nth-child(3) {
          animation-delay: 0.18s;
        }

        .se-quote-field:nth-child(4) {
          animation-delay: 0.23s;
        }

        .se-quote-field:nth-child(5) {
          animation-delay: 0.28s;
        }

        .se-quote-field:nth-child(6) {
          animation-delay: 0.33s;
        }

        .se-quote-field:nth-child(7) {
          animation-delay: 0.38s;
        }

        .se-quote-field-full {
          grid-column: 1 / -1;
        }

        /* =========================================
           LABELS
        ========================================= */

        .se-quote-field label {
          display: block;

          color: #66748a;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.1px;
          line-height: 1.5;
        }

        .se-quote-field label span {
          color: #e46c36;
        }

        /* =========================================
           INPUTS
        ========================================= */

        .se-quote-field input,
        .se-quote-field select,
        .se-quote-field textarea {
          display: block;

          width: 100%;
          min-width: 0;

          border: 1px solid #dce2ec;
          border-radius: 7px;

          outline: none;

          background: #f7f8fb;
          color: #19243b;

          font-family: inherit;
          font-size: 12px;
          font-weight: 500;

          transition:
            background 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .se-quote-field input,
        .se-quote-field select {
          height: 44px;
          padding: 0 13px;
        }

        .se-quote-field textarea {
          min-height: 82px;

          padding: 12px 13px;

          resize: vertical;

          line-height: 1.6;
        }

        .se-quote-field input::placeholder,
        .se-quote-field textarea::placeholder {
          color: #929aaa;
          opacity: 1;
        }

        .se-quote-field select {
          color: #303c51;
          cursor: pointer;
        }

        .se-quote-field select:invalid {
          color: #929aaa;
        }

        .se-quote-field input:focus,
        .se-quote-field select:focus,
        .se-quote-field textarea:focus {
          border-color: #4379e8;

          background: #ffffff;

          box-shadow:
            0 0 0 3px rgba(35, 88, 216, 0.09),
            0 4px 12px rgba(35, 88, 216, 0.04);
        }

        .se-quote-field input:hover,
        .se-quote-field select:hover,
        .se-quote-field textarea:hover {
          border-color: #b7c4d9;
        }

        .se-quote-field input:focus-visible,
        .se-quote-field select:focus-visible,
        .se-quote-field textarea:focus-visible {
          outline: none;
        }

        /* =========================================
           STATUS MESSAGE
        ========================================= */

        .se-quote-status {
          display: flex;
          align-items: flex-start;
          gap: 10px;

          margin-top: 14px;
          padding: 11px 13px;

          border: 1px solid transparent;
          border-radius: 7px;

          font-size: 11px;
          line-height: 1.6;

          animation: seQuoteStatusIn 0.3s ease both;
        }

        .se-quote-status-icon {
          flex: 0 0 20px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 20px;
          height: 20px;

          border-radius: 50%;

          font-size: 12px;
          font-weight: 800;
        }

        .se-quote-status-success {
          border-color: #a7dfc0;
          background: #effaf3;
          color: #176c3b;
        }

        .se-quote-status-success .se-quote-status-icon {
          background: #d4f4df;
        }

        .se-quote-status-error {
          border-color: #f0bbbb;
          background: #fff3f3;
          color: #a83232;
        }

        .se-quote-status-error .se-quote-status-icon {
          background: #ffe0e0;
        }

        .se-quote-status-warning {
          border-color: #f2d49a;
          background: #fff9e9;
          color: #80530f;
        }

        .se-quote-status-warning .se-quote-status-icon {
          background: #ffedc6;
        }

        /* =========================================
           SUBMIT BUTTON
        ========================================= */

        .se-quote-submit {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          width: 100%;
          min-height: 47px;

          margin-top: 17px;
          padding: 12px 20px;

          border: 0;
          border-radius: 7px;

          background: linear-gradient(
            110deg,
            #2358d8,
            #326ce9 60%,
            #2358d8
          );

          color: #ffffff;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.7px;

          cursor: pointer;

          box-shadow: 0 5px 16px rgba(35, 88, 216, 0.17);

          transition:
            background 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .se-quote-submit::before {
          position: absolute;
          top: 0;
          left: -120%;

          z-index: -1;

          width: 70%;
          height: 100%;

          content: "";

          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );

          transform: skewX(-20deg);

          transition: left 0.65s ease;
        }

        .se-quote-submit:hover:not(:disabled)::before {
          left: 150%;
        }

        .se-quote-submit svg {
          flex: 0 0 18px;

          width: 18px;
          height: 18px;

          transition: transform 0.25s ease;
        }

        .se-quote-submit:hover:not(:disabled) {
          background: #173f9f;

          box-shadow: 0 9px 23px rgba(35, 88, 216, 0.26);

          transform: translateY(-2px);
        }

        .se-quote-submit:hover:not(:disabled) svg {
          transform: translateX(4px);
        }

        .se-quote-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .se-quote-submit:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          box-shadow: none;
        }

        /* =========================================
           LOADING SPINNER
        ========================================= */

        .se-quote-spinner {
          flex: 0 0 16px;

          width: 16px;
          height: 16px;

          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;

          border-radius: 50%;

          animation: seQuoteSpin 0.7s linear infinite;
        }

        /* =========================================
           BOTTOM NOTE
        ========================================= */

        .se-quote-bottom-note {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          margin-top: 12px;

          color: #8a94a4;

          font-size: 10px;
          font-weight: 500;
          line-height: 1.5;

          text-align: center;
        }

        .se-quote-note-icon {
          color: #e9a02e;
          font-size: 15px;

          animation: seQuoteNoteGlow 2.5s ease-in-out infinite;
        }

        /* =========================================
           FOCUS STATES
        ========================================= */

        .se-quote-close:focus-visible,
        .se-quote-submit:focus-visible {
          outline: 3px solid rgba(35, 88, 216, 0.35);
          outline-offset: 3px;
        }

        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes seQuoteOverlayIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes seQuoteModalIn {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.975);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes seQuoteFieldIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes seQuoteStatusIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes seQuoteGradient {
          from {
            background-position: 0% 50%;
          }

          to {
            background-position: 220% 50%;
          }
        }

        @keyframes seQuoteSun {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes seQuoteSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes seQuoteNoteGlow {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.16);
          }
        }

        /* =========================================
           TABLET RESPONSIVE
        ========================================= */

        @media (max-width: 900px) {
          .se-quote-modal {
            width: min(100%, 760px);
          }

          .se-quote-header {
            padding: 25px 26px 17px;
          }

          .se-quote-form {
            padding: 2px 26px 21px;
          }

          .se-quote-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 15px;
          }

          .se-quote-close {
            top: 19px;
            right: 19px;
          }
        }

        /* =========================================
           MOBILE RESPONSIVE
        ========================================= */

        @media (max-width: 600px) {
          .se-quote-overlay {
            align-items: center;

            padding: 8px;
          }

          .se-quote-modal {
            width: 100%;

            max-height: calc(100vh - 16px);
            max-height: calc(100dvh - 16px);

            border-radius: 13px;
          }

          .se-quote-header {
            padding: 23px 19px 16px;
            padding-right: 65px;
          }

          .se-quote-eyebrow {
            gap: 6px;

            margin-bottom: 9px;

            font-size: 9px;
            letter-spacing: 1.3px;
          }

          .se-quote-eyebrow svg {
            width: 15px;
            height: 15px;
          }

          .se-quote-heading h2 {
            font-size: clamp(23px, 6vw, 29px);
            letter-spacing: -0.8px;
          }

          .se-quote-heading p {
            margin-top: 8px;

            font-size: 11px;
            line-height: 1.55;
          }

          .se-quote-close {
            top: 14px;
            right: 13px;

            width: 36px;
            min-width: 36px;
            height: 36px;

            padding: 0;
          }

          .se-quote-close span {
            display: none;
          }

          .se-quote-close svg {
            width: 17px;
            height: 17px;
          }

          .se-quote-form {
            padding: 3px 19px 19px;
          }

          .se-quote-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 13px;
          }

          .se-quote-field-full {
            grid-column: auto;
          }

          .se-quote-field {
            gap: 6px;
          }

          .se-quote-field label {
            font-size: 9px;
          }

          .se-quote-field input,
          .se-quote-field select {
            height: 44px;
          }

          .se-quote-field textarea {
            min-height: 82px;
          }

          .se-quote-submit {
            min-height: 46px;

            margin-top: 15px;
            padding: 11px 13px;

            font-size: 10px;
          }

          .se-quote-bottom-note {
            margin-top: 11px;
            font-size: 10px;
          }
        }

        /* =========================================
           EXTRA SMALL DEVICES
        ========================================= */

        @media (max-width: 380px) {
          .se-quote-overlay {
            padding: 6px;
          }

          .se-quote-modal {
            max-height: calc(100vh - 12px);
            max-height: calc(100dvh - 12px);

            border-radius: 11px;
          }

          .se-quote-header {
            padding: 19px 15px 14px;
            padding-right: 54px;
          }

          .se-quote-heading h2 {
            font-size: 23px;
          }

          .se-quote-heading p {
            font-size: 10px;
          }

          .se-quote-close {
            top: 12px;
            right: 11px;

            width: 34px;
            min-width: 34px;
            height: 34px;
          }

          .se-quote-form {
            padding: 2px 15px 15px;
          }

          .se-quote-grid {
            gap: 11px;
          }

          .se-quote-field input,
          .se-quote-field select {
            height: 42px;
            padding-right: 10px;
            padding-left: 11px;

            font-size: 11px;
          }

          .se-quote-field textarea {
            padding: 10px 11px;
            font-size: 11px;
          }

          .se-quote-submit {
            font-size: 9px;
            letter-spacing: 0.5px;
          }
        }

        /* =========================================
           SHORT LANDSCAPE SCREENS
        ========================================= */

        @media (max-height: 600px) and (min-width: 601px) {
          .se-quote-overlay {
            padding: 8px;
          }

          .se-quote-modal {
            max-height: 96vh;
            max-height: 96dvh;
          }

          .se-quote-header {
            padding-top: 15px;
            padding-bottom: 10px;
          }

          .se-quote-eyebrow {
            margin-bottom: 5px;
          }

          .se-quote-heading h2 {
            font-size: 25px;
          }

          .se-quote-heading p {
            margin-top: 5px;
            font-size: 10px;
          }

          .se-quote-form {
            padding-bottom: 12px;
          }

          .se-quote-grid {
            gap: 9px 12px;
          }

          .se-quote-field {
            gap: 5px;
          }

          .se-quote-field input,
          .se-quote-field select {
            height: 38px;
          }

          .se-quote-field textarea {
            min-height: 58px;
          }

          .se-quote-submit {
            min-height: 40px;
            margin-top: 11px;
          }

          .se-quote-bottom-note {
            margin-top: 8px;
          }
        }

        /* =========================================
           REDUCED MOTION ACCESSIBILITY
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .se-quote-overlay,
          .se-quote-modal,
          .se-quote-top-line,
          .se-quote-field,
          .se-quote-status,
          .se-quote-spinner,
          .se-quote-eyebrow svg,
          .se-quote-note-icon {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .se-quote-close,
          .se-quote-close svg,
          .se-quote-submit,
          .se-quote-submit svg,
          .se-quote-submit::before,
          .se-quote-field input,
          .se-quote-field select,
          .se-quote-field textarea {
            transition: none !important;
          }
        }

      `}</style>
    </>
  );
}
