import React from "react";
import Card from "react-bootstrap/Card";

function DashboardCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">Sentimetrics</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
