
import React from "react";

const franchisePlans = [
  {
    id: 1,
    name: "Retail Partner",
    subtitle: "Franchise",
    price: "₹50,000",
    commission: "10%",
    margin: "10%",
    amc: "20%",
    bonus: "Surprise Bonus",
    target: "Above 30 kW",
    popular: false,
  },
  {
    id: 2,
    name: "Smart Distributor",
    subtitle: "Franchise",
    price: "₹1,10,000",
    commission: "12%",
    margin: "12%",
    amc: "30%",
    bonus: " Surprise Bonus",
    target: "Above 60 kW",
    popular: false,
  },
  {
    id: 3,
    name: "Master Distributor",
    subtitle: "Franchise",
    price: "₹2,10,000",
    commission: "15%",
    margin: "15%",
    amc: "40%",
    bonus: " Surprise Bonus",
    target: "Above 100 kW",
    popular: true,
  },
  {
    id: 4,
    name: "Channel Partner",
    subtitle: "Franchise",
    price: "₹5,20,000",
    commission: "18%",
    margin: "18%",
    amc: "50%",
    bonus: "Surprise Bonus",
    target: "Above 150 kW",
    popular: false,
  },
];

export default function FranchisePlans() {
  return (
    <>
      <style>{`
        /* =========================================
           SMARTEDGE FRANCHISE PLANS
        ========================================= */

        .se-franchise-section {
          --se-navy: var(--primary-900);
          --se-blue: var(--primary-700);
          --se-blue-light: var(--primary-600);
          --se-accent: #7c3aed;
          --se-accent-light: #9b72ea;
          --se-white: #ffffff;

          position: relative;
          width: 100%;
          padding: 75px 20px 85px;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(155, 114, 234, 0.20),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              var(--se-navy) 0%,
              var(--se-blue) 55%,
              var(--se-blue-light) 100%
            );

          font-family: inherit;
          box-sizing: border-box;
        }

        .se-franchise-section *,
        .se-franchise-section *::before,
        .se-franchise-section *::after {
          box-sizing: border-box;
        }

        .se-franchise-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
        }

        /* SECTION HEADING */

        .se-franchise-heading {
          text-align: center;
          margin-bottom: 48px;
        }

        .se-franchise-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 8px 17px;
          margin-bottom: 16px;

          border: 1px solid rgba(155, 114, 234, 0.45);
          border-radius: 50px;

          background: rgba(155, 114, 234, 0.10);
          color: var(--se-accent-light);

          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .se-franchise-heading h2 {
          margin: 0 0 14px;
          color: #ffffff;

          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.8px;
        }

        .se-franchise-heading h2 span {
          color: var(--se-accent-light);
        }

        .se-franchise-heading p {
          max-width: 650px;
          margin: 0 auto;

          color: rgba(255, 255, 255, 0.72);

          font-size: 15px;
          line-height: 1.8;
        }

        /* CARD GRID */

        .se-franchise-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        /* INDIVIDUAL CARD */

        .se-franchise-card {
          position: relative;
          display: flex;
          flex-direction: column;

          min-width: 0;
          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;

          background:
            linear-gradient(
              160deg,
              var(--se-blue) 0%,
              var(--se-navy) 55%,
              #241050 100%
            );

          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.20),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .se-franchise-card:hover {
          transform: translateY(-8px);

          border-color: rgba(155, 114, 234, 0.75);

          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.32),
            0 0 25px rgba(155, 114, 234, 0.12);
        }

        /* ACCENT CARD HEADER */

        .se-franchise-card-header {
          min-height: 88px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 16px 10px;

          text-align: center;

          background: linear-gradient(
            120deg,
            var(--primary-700),
            var(--se-accent-light)
          );
        }

        .se-franchise-card-header h3 {
          margin: 0;

          color: #ffffff;

          font-size: 16px;
          font-weight: 800;
          line-height: 1.45;
          letter-spacing: 0.25px;
          text-transform: uppercase;
        }

        .se-franchise-card-header span {
          margin-top: 3px;

          color: rgba(255, 255, 255, 0.95);

          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* CARD CONTENT */

        .se-franchise-card-body {
          display: flex;
          flex-direction: column;
          flex: 1;

          padding: 23px 17px 20px;
        }

        /* PRICE */

        .se-franchise-price {
          text-align: center;
          margin-bottom: 22px;
        }

        .se-franchise-price strong {
          display: block;

          color: #ffffff;

          font-size: clamp(23px, 2.1vw, 30px);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.8px;

          white-space: nowrap;
        }

        .se-franchise-price span {
          display: block;
          margin-top: 7px;

          color: rgba(255, 255, 255, 0.76);

          font-size: 13px;
          font-weight: 500;
        }

        /* BENEFITS */

        .se-franchise-benefits {
          display: flex;
          flex-direction: column;
          flex: 1;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .se-franchise-benefits li {
          min-height: 45px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          padding: 10px 2px;

          border-bottom: 1px solid rgba(255, 255, 255, 0.22);

          color: rgba(255, 255, 255, 0.88);

          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
          text-align: center;
        }

        .se-franchise-benefits li:last-child {
          border-bottom: none;
        }

        .se-franchise-benefits .se-benefit-value {
          color: #ffffff;
          font-weight: 700;
        }

        /* BONUS AREA */

        .se-franchise-bonus {
          min-height: 83px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 6px;

          margin-top: 12px;
          padding: 12px 8px;

          border: 1px solid rgba(155, 114, 234, 0.28);
          border-radius: 12px;

          background: rgba(155, 114, 234, 0.10);

          text-align: center;
        }

        .se-franchise-bonus-label {
          color: var(--se-accent-light);

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .se-franchise-bonus strong {
          color: #ffffff;

          font-size: 15px;
          font-weight: 800;
        }

        .se-franchise-bonus span {
          color: rgba(255, 255, 255, 0.75);

          font-size: 12px;
          font-weight: 500;
        }

        /* BUTTON */

        .se-franchise-action {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          width: 100%;
          min-height: 44px;

          margin-top: 17px;
          padding: 11px 12px;

          border: none;
          border-radius: 7px;

          background: linear-gradient(
            110deg,
            var(--primary-700),
            var(--se-accent-light)
          );

          color: #ffffff;

          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          text-align: center;

          cursor: pointer;

          transition:
            background 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .se-franchise-action:hover {
          background: linear-gradient(
            110deg,
            var(--primary-600),
            #bfa6f5
          );

          color: #ffffff;
          transform: translateY(-2px);

          box-shadow: 0 7px 18px rgba(155, 114, 234, 0.25);
        }

        .se-franchise-action:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
        }

        .se-franchise-action span {
          font-size: 19px;
          line-height: 1;
        }

        /* MASTER CARD HIGHLIGHT */

        .se-franchise-card.is-popular {
          border: 1px solid rgba(155, 114, 234, 0.75);

          box-shadow:
            0 14px 38px rgba(0, 0, 0, 0.25),
            0 0 24px rgba(155, 114, 234, 0.12);
        }

        .se-franchise-card.is-popular .se-franchise-card-header {
          background: linear-gradient(
            120deg,
            var(--primary-700),
            #bfa6f5
          );
        }

        /* BOTTOM NOTE */

        .se-franchise-note {
          margin-top: 30px;

          color: rgba(255, 255, 255, 0.65);

          font-size: 12px;
          line-height: 1.7;
          text-align: center;
        }

        /* =========================================
           RESPONSIVE DESIGN
        ========================================= */

        @media (max-width: 1100px) {
          .se-franchise-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 760px;
            margin: 0 auto;
            gap: 22px;
          }

          .se-franchise-price strong {
            font-size: 29px;
          }
        }

        @media (max-width: 600px) {
          .se-franchise-section {
            padding: 55px 15px 60px;
          }

          .se-franchise-heading {
            margin-bottom: 30px;
          }

          .se-franchise-heading h2 {
            font-size: 28px;
          }

          .se-franchise-heading p {
            font-size: 13px;
          }

          .se-franchise-grid {
            grid-template-columns: minmax(0, 1fr);
            max-width: 390px;
            gap: 20px;
          }

          .se-franchise-card {
            border-radius: 16px;
          }

          .se-franchise-card-header {
            min-height: 75px;
          }

          .se-franchise-card-header h3 {
            font-size: 16px;
          }

          .se-franchise-card-body {
            padding: 22px 20px 20px;
          }

          .se-franchise-price strong {
            font-size: 30px;
          }

          .se-franchise-benefits li {
            min-height: 44px;
            font-size: 14px;
          }

          .se-franchise-bonus {
            min-height: 75px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .se-franchise-card,
          .se-franchise-action {
            transition: none;
          }

          .se-franchise-card:hover,
          .se-franchise-action:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        className="se-franchise-section"
        id="franchise-plans"
        aria-labelledby="se-franchise-title"
      >
        <div className="se-franchise-container">

          {/* SECTION HEADING */}

          <div className="se-franchise-heading">

            <div className="se-franchise-tag">
              SmartEDGE Partnership
            </div>

            <h2 id="se-franchise-title">
              Choose Your <span>Franchise Plan</span>
            </h2>

            <p>
              Become a part of the SmartEDGE solar energy network.
              Explore our franchise opportunities and choose the
              partnership level that matches your business goals.
            </p>

          </div>

          {/* FRANCHISE CARDS */}

          <div className="se-franchise-grid">

            {franchisePlans.map((plan) => (

              <article
                className={`se-franchise-card ${
                  plan.popular ? "is-popular" : ""
                }`}
                key={plan.id}
              >

                {/* CARD HEADER */}

                <div className="se-franchise-card-header">

                  <h3>{plan.name}</h3>
                  <span>{plan.subtitle}</span>

                </div>

                {/* CARD BODY */}

                <div className="se-franchise-card-body">

                  {/* PRICE */}

                  <div className="se-franchise-price">

                    <strong>{plan.price}</strong>
                    <span>+ GST</span>

                  </div>

                  {/* BENEFITS */}

                  <ul className="se-franchise-benefits">

                    <li>
                      <span className="se-benefit-value">
                        {plan.commission}
                      </span>
                      Commission
                    </li>

                    <li>
                      <span className="se-benefit-value">
                        {plan.margin}
                      </span>
                      Product Margin
                    </li>

                    <li>
                      <span className="se-benefit-value">
                        {plan.amc}
                      </span>
                      AMC Benefit
                    </li>

                  </ul>

                  {/* BONUS */}

                  <div className="se-franchise-bonus">

                    <span className="se-franchise-bonus-label">
                      Exclusive Bonus
                    </span>

                    <strong>{plan.bonus}</strong>

                    <span>{plan.target}</span>

                  </div>

                  {/* CTA */}

                  <a
                    href="/contact"
                    className="se-franchise-action"
                    aria-label={`Get details for ${plan.name}`}
                  >
                    Get Details
                    <span aria-hidden="true">↗</span>
                  </a>

                </div>

              </article>

            ))}

          </div>

          <p className="se-franchise-note">
            * All franchise prices are exclusive of applicable GST.
            Please contact our team for complete partnership details.
          </p>

        </div>
      </section>
    </>
  );
}
