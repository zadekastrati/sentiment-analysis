import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Our Sentiment Analysis platform provides users with an insightful
            look into social media trends by analyzing the emotions and opinions
            behind posts. By leveraging advanced Natural Language Processing
            (NLP) and machine learning techniques, the platform accurately
            gauges the sentiment of online content—whether positive, negative,
            or neutral. This tool is perfect for businesses looking to
            understand customer feedback, track brand reputation, or even
            monitor the public’s response to trending topics. With a
            user-friendly interface and real-time analysis, users can easily
            visualize data trends and uncover deeper insights into how audiences
            truly feel about key issues across social media platforms
          </p>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Sentimetrics</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
