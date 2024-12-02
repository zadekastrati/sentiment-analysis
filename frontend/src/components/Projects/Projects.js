import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import kindness from "../../Assets/Projects/kindness.jpg";
import slept from "../../Assets/Projects/slept.png";
import cat from "../../Assets/Projects/cat.jpg";
import dog from "../../Assets/Projects/dog.jpg";
import rain from "../../Assets/Projects/rain.jpg";
import coffe from "../../Assets/Projects/coffe.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Recent <strong className="purple">Posts </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dog}
              isBlog={false}
              title="The Joy of Midnight Walks"
              description="Last night, my dog and I went for an impromptu midnight stroll under the stars. The world felt still, and for a moment, it was just us—no noise, no rush, just quiet companionship."
              ghLink="https://github.com/soumyajit4419/Chatify"
              demoLink="https://chatify-49.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={coffe}
              isBlog={false}
              title="A Coffee and a Chat"
              description="Spent the afternoon catching up with an old friend over coffee. It’s funny how time flies, but good conversations always feel like coming home. ☕💬"
              ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cat}
              isBlog={false}
              title="When Cats Steal the Spotlight"
              description="Tried working from home today, but my cat had other plans. From sitting on my keyboard to photobombing my Zoom call, he clearly thinks he’s the CEO. 🐱💻"
              ghLink="https://github.com/soumyajit4419/Editor.io"
              demoLink="https://editor.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={kindness}
              isBlog={false}
              title="Little Acts of Kindness"
              description="A stranger held the door open for me today, and it genuinely made my day. It’s a small reminder that kindness still exists in the world and you can make someone's day too."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={rain}
              isBlog={false}
              title="Rainy Day Comforts"
              description="The rain poured outside, but inside it was all cozy vibes: a warm blanket, hot cocoa, and my dog curled up at my feet. Some days are made for staying in. "
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={slept}
              isBlog={false}
              title="The Art of Doing Nothing"
              description="Spent the day lounging with a book I didn’t finish, music I half-listened to, and a cat who napped the whole time. Sometimes, doing nothing is everything."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
