import { useEffect, useState } from "react";
import Report from "../components/Report";

function Reports() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/reports", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);
  return (
    <div
      className="reports"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <h1>Reports</h1>
      <ul>
        {reports.map((report: any) => (
          <Report key={report.id} report={report} />
        ))}
      </ul>
    </div>
  );
}

export default Reports;
