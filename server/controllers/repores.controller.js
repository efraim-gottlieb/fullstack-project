import { createReport, getReports } from "../services/reports.services.js"; // import report service functions

// Get all reports (admin) or only the user's own reports
export async function reports(req, res) {
  const { role, id } = req.user; // extract role and id from the logged-in user
  const reportsData = await getReports(); // fetch all reports from the database
  if (role == "admin") {
    res.send(reportsData); // admin gets all reports
  } else {
    res.send(reportsData.filter((r) => r.userId == id)); // regular user gets only their own reports
  }
}

// Create a single report from the request body
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
    if (!req.file) { // check if a file was uploaded
      return res.status(400).json({ message: "no csv file" });
    }

    const csvText = req.file.buffer.toString("utf-8").trim(); // read the file buffer as text
    const lines = csvText.split("\n").map((line) => line.trim()).filter((line) => line.length > 0); // split into lines and remove empty ones

    if (lines.length < 2) { // must have at least a header row and one data row
      return res.status(400).json({ message: "CSV is empty or invalid" });
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase()); // parse the first line as column headers
    const requiredHeaders = ["category", "urgency", "message"]; // these columns must exist

    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h)); // check which required headers are missing
    if (missingHeaders.length > 0) {
      return res.status(400).json({
        message: `Missing required  CSV headers: ${missingHeaders.join(", ")}`,
      });
    }

    const { id: userId } = req.user; // get the logged-in user's id
    const results = []; // array to collect created reports

    for (let i = 1; i < lines.length; i++) { // loop through each data row (skip header)
      const values = lines[i].split(",").map((v) => v.trim()); // split the row into values
      const row = {}; // build an object from headers and values
      headers.forEach((header, index) => {
        row[header] = values[index] ?? null; // map each header to its value
      });

      if (!row.category || !row.urgency || !row.message) { // validate required fields
        return res.status(400).json({
          message: `Row ${i} is missing required fields (category, urgency, message)`,
        });
      }

      const { category, urgency, message, ...extraFields } = row; // separate known fields from extra ones
      const result = await createReport( // save each row as a report in the database
        userId,
        category,
        urgency,
        message,
        row.image || null, // image is optional
        extraFields, // any extra CSV columns
      );
      results.push(result); // add the result to the array
    }

    return res.status(201).json({ // send success response with the count of created reports
      message: "CSV uploaded successfully",
      count: results.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message }); // handle unexpected errors
  }
}
