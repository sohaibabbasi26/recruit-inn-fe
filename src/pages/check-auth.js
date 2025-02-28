import { useEffect, useState } from "react";

export default function CheckAuth() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log("clients", clients);

  async function logAdminIn() {
    setError(null);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/admin-log-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: "admin@recruitinn.app",
          password: "test1234",
        }),
      }
    );

    const data = await response.json();
    console.log("Login Response:", data);
  }

  async function clientDataFetch() {
    setError(null);
    console.log("get clients on browser cookie not CLIENT");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/get-companies`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data;
    try {
      data = await response.json(); // Parse JSON safely
      setClients(data.data);
    } catch (error) {
      throw new Error(
        `${data.data.message}` || "Invalid JSON response from server"
      );
    }

    if (!response.ok) {
      console.log("Server error response:", data);
      return setError(data?.data.message || "Failed to fetch companies");
    }

    console.log("companies fetched:", data);
  }

  return (
    <div>
      <button className="get-clients" onClick={clientDataFetch}>
        Get Clients
      </button>
      <button className="log-admin-in" onClick={logAdminIn}>
        Login as admin
      </button>
      <div className="clients-grid">
        {clients.length > 0
          ? clients?.map((el) => (
              <div key={el?.company_id} className="client-card">
                <div className="client-info">
                  <div className="info-row">
                    <span className="label">Company</span>
                    <h3 className="company-name">
                      {el?.company_name || "N/A"}
                    </h3>
                  </div>

                  <div className="info-row">
                    <span className="label">Email</span>
                    <p className="value">{el?.email || "N/A"}</p>
                  </div>

                  <div className="info-row">
                    <span className="label">Location</span>
                    <p className="value">{el?.company_location || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <style jsx>{`
        .error-message {
          background-color: #fff3f3;
          border-left: 4px solid #dc3545;
          color: #dc3545;
          padding: 12px 16px;
          margin: 10px 0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(220, 53, 69, 0.1);
        }

        .error-icon {
          font-size: 16px;
        }

        .error-message p {
          margin: 0;
          font-weight: 500;
        }

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .client-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          border: 1px solid #eee;
        }

        .client-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }

        .client-info {
          padding: 20px;
        }

        .info-row {
          margin-bottom: 12px;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .label {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }

        .company-name {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          line-height: 1.4;
        }

        .value {
          font-size: 14px;
          color: #374151;
          margin: 0;
          line-height: 1.5;
          word-break: break-word;
        }

        @media (max-width: 640px) {
          .clients-grid {
            grid-template-columns: 1fr;
            padding: 16px;
          }

          .client-card {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
