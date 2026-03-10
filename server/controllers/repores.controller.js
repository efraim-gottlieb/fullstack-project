import { createReport, getReports } from "../services/reports.services.js";

export async function reports(req, res) {
  const { role, id } = req.user;
  const reportsData = await getReports();
  if (role == "admin") {
    res.send(reportsData);
  } else {
    res.send(reportsData.filter((r) => r.userId == id));
  }
}
export async function submitReport(req, res) {
  const { id } = req.user;
  const { category, urgency, message, image } = req.body;

  const response = await createReport(
    id,
    category,
    urgency,
    message,
    image ? image : null,
  );
  res.send(response);
}

export async function submitCsvReportsFile(req, res) {
  res.json({ test: "sucsess" });
}
