import React from "react";
import {
  // AboutSection,
  Animation,
  Section,
  ArticlesSection,
  ContactSection,
  HeroSection,
  // InterestsSection,
  Page,
  // ProjectsSection,
  Seo,
  // PageSection,
  // Slider,
} from "gatsby-theme-portfolio-minimal";
import { MyProject, Project } from "../helper/data.tsx";
import { InterestsSection } from "../helper/skills.tsx";

export default function IndexPage() {
  const proj = MyProject();
  const [shownSkills, setShownSkills] = React.useState("");
  return (
    <>
      <Seo title="Melinda Fang's Portfolio" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="me" />
        <InterestsSection
          sectionId="details"
          setSkills={setShownSkills}
          skills={shownSkills}
          heading="Skills"
        />
        <Animation type="fadeIn">
          <Section anchor={"experiences"} heading={"Experiences"}>
            {proj[0].projects.map((project, key) => {
              let shown =
                shownSkills === "" ||
                (project.tags !== undefined &&
                  project.tags.indexOf(shownSkills) !== -1);
              return project.visible && shown ? (
                <Project key={key} index={key} data={project} />
              ) : null;
            })}
          </Section>
        </Animation>
        <Animation type="fadeIn">
          <Section anchor={"myProj"} heading={"Personal Projects"}>
            {proj[1].projects.map((project, key) => {
              let shown =
                shownSkills === "" || 
                (project.tags !== undefined &&
                  project.tags.indexOf(shownSkills) !== -1);

              return project.visible && shown ? (
                <Project key={key} index={key} data={project} />
              ) : null;
            })}
          </Section>
        </Animation>
        <ArticlesSection
          sectionId="articles"
          heading="Latest Articles"
          sources={["blog"]}
        />
        <ContactSection sectionId="github" heading="Contact Me" />
      </Page>
    </>
  );
}
