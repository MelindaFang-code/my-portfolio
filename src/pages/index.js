import React from "react";
import {
  // AboutSection,
  Animation,
  Section,
  ArticlesSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  ProjectsSection,
  Seo,
  // PageSection,
  // Slider,
} from "gatsby-theme-portfolio-minimal";
import { MyProject, Project } from "./data.tsx";

export default function IndexPage() {
  const proj = MyProject();
  return (
    <>
      <Seo title="Gatsby Starter for Portfolio Minimal" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="me" />
        <InterestsSection sectionId="details" heading="Skills" />
        {/* <ProjectsSection sectionId="experiences" heading="Experiences" /> */}
        <Animation type="fadeIn">
          <Section anchor={"experiences"} heading={"Experiences"}>
            {proj[1].projects.map((project, key) => {
              return project.visible ? (
                <Project key={key} index={key} data={project} />
              ) : null;
            })}
          </Section>
        </Animation>
        <Animation type="fadeIn">
          <Section anchor={"myProj"} heading={"Personal Projects"}>
            {proj[0].projects.map((project, key) => {
              return project.visible ? (
                <Project key={key} index={key} data={project} />
              ) : null;
            })}
          </Section>
        </Animation>
        <ArticlesSection
          sectionId="articles"
          heading="Latest Articles"
          sources={["medium"]}
        />
        <ContactSection sectionId="github" heading="Contact Me" />
      </Page>
    </>
  );
}
