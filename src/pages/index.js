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
  // ProjectsSection,
  Seo,
  // PageSection,
  // Slider,
} from "gatsby-theme-portfolio-minimal";
import { MyProject, Project } from "../helper/data.tsx";

export default function IndexPage() {
  const proj = MyProject();
  return (
    <>
      <Seo title="Melinda Fang's Portfolio" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="me" />
        <InterestsSection sectionId="details" heading="Skills" />
        <Animation type="fadeIn">
          <Section anchor={"experiences"} heading={"Experiences"}>
            {proj[0].projects.map((project, key) => {
              return project.visible ? (
                <Project key={key} index={key} data={project} />
              ) : null;
            })}
          </Section>
        </Animation>
        <Animation type="fadeIn">
          <Section anchor={"myProj"} heading={"Personal Projects"}>
            {proj[1].projects.map((project, key) => {
              return project.visible ? (
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
