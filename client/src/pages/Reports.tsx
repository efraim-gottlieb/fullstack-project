import { useEffect, useState } from "react";



function Reports() {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/reports", {
            headers: {authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(response => response.json())
        .then(data => setReports(data))
        .catch(error => console.error("Error fetching reports:", error));
    }, []);
  return (
    <div>
        <h1>Reports</h1>
        <ul>
            {reports.map((report: any) => (
                <li key={report.id}>{JSON.stringify(report)}</li>
            ))}
        </ul>
    </div>
  )
}

export default Reports
