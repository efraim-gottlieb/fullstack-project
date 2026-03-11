import "./report.css"

function Report({ report }: { report: any }) {
  const { id, category, urgency, message, image } = report;
  return (
    <div className="report">
      <h3>Report ID: {id}</h3>
      <p>Category: {category}</p>
      <p>Urgency: {urgency}</p>
      <p>Message: {message}</p>
      {image && <img src={image} alt="Report Image" />}
    </div>
  );
}

export default Report;
