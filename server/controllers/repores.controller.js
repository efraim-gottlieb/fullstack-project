import { createReport, getReports } from "../services/reports.services.js";


export async function reports(req, res) {
  const { role, id } = req.user; 
  if (role == "admin") {
    const reportsData = await getReports(); 
    res.send(reportsData); 
  } else {
    const reportsData = await getReports(id);
    res.send(reportsData);
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



// Upload a CSV file and create multiple reports from its rows
// Required CSV headers: category, urgency, message. Optional: image
export async function submitCsvReportsFile(req, res) {
  try {
    if (!req.file) { 
      return res.status(400).json({ message: "no csv file" });
    }

    const csvText = req.file.buffer.toString("utf-8").trim(); 
    const lines = csvText.split("\n").map((line) => line.trim()).filter((line) => line.length > 0); 

    if (lines.length < 2) { 
      return res.status(400).json({ message: "CSV is empty or invalid" });
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase()); 
    const requiredHeaders = ["category", "urgency", "message"]; 

    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h)); 
    if (missingHeaders.length > 0) {
      return res.status(400).json({
        message: `Missing required  CSV headers: ${missingHeaders.join(", ")}`,
      });
    }

    const { id: userId } = req.user; 
    const results = []; 

    for (let i = 1; i < lines.length; i++) { 
      const values = lines[i].split(",").map((v) => v.trim()); 
      const row = {}; 
      headers.forEach((header, index) => {
        row[header] = values[index] ?? null; 
      });

      if (!row.category || !row.urgency || !row.message) { 
        return res.status(400).json({
          message: `Row ${i} is missing required fields (category, urgency, message)`,
        });
      }

      const { category, urgency, message, ...extraFields } = row; 
      const result = await createReport( 
        userId,
        category,
        urgency,
        message,
        row.image || null, 
        extraFields, 
      );
      results.push(result); 
    }

    return res.status(201).json({ 
      message: "CSV uploaded successfully",
      count: results.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message }); 
  }
}
