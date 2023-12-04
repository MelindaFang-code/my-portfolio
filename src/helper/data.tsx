import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Animation } from "gatsby-theme-portfolio-minimal";
import { GatsbyImage } from "gatsby-plugin-image";
import * as classes from "./style.module.css";

import React from "react";
import { Icon } from "gatsby-theme-portfolio-minimal/src/components/Icon";
enum LinkType {
  External = "external",
  Github = "github",
  PDF = "pdf",
}

interface ImageObject {
  alt: string | null;
  src: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  } | null;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export interface Project {
  category?: string;
  title: string;
  description: string;
  image: ImageObject & { linkTo?: string };
  tags?: string[];
  links?: {
    type: LinkType;
    url: string;
  }[];
  visible: boolean;
}

interface ProjectProps {
  data: Project;
  index: number;
}

interface ProjectsSectionQueryResult {
  allProjectsJson: {
    sections: {
      button: {
        label: string;
        url: string;
        visible: boolean;
      };
      projects: Project[];
    }[];
  };
}

export const useLocalDataSource = (): ProjectsSectionQueryResult => {
  return useStaticQuery(graphql`
    query ProjectsSectionQuery {
      allProjectsJson {
        sections: nodes {
          button {
            label
            url
            visible
          }
          projects {
            category
            description
            image {
              alt
              linkTo
              src {
                childImageSharp {
                  gatsbyImageData(width: 400)
                }
              }
              objectFit
            }
            links {
              type
              url
            }
            tags
            title
            visible
          }
        }
      }
    }
  `);
};

export function Project(props) {
  const isDesktopBreakpoint = true;

  return (
    <Animation
      type="fadeUp"
      className={classes.Project}
      style={{
        flexDirection:
          isDesktopBreakpoint && props.index % 2 === 0
            ? "row-reverse"
            : undefined,
      }}
    >
      <div className={classes.Details}>
        <span className={classes.Category}>{props.data.category}</span>
        <h4 className={classes.Title}>{props.data.title}</h4>
        <p>{props.data.description}</p>
        <div className={classes.Tags}>
          {props.data.tags &&
            props.data.tags.length !== 0 &&
            props.data.tags.map((tag, key) => {
              return (
                <span key={key}>
                  <u>{tag}</u>
                </span>
              );
            })}
        </div>
        <div className={classes.Links}>
          {props.data.links &&
            props.data.links.length !== 0 &&
            props.data.links.map((link, key) => {
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="External Link"
                >
                  {<Icon name={link.type} color="var(--subtext-color)" />}
                </a>
              );
            })}
        </div>
      </div>
      {props.data.image.src && props.data.image.linkTo && (
        <a
          href={props.data.image.linkTo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="External Link"
        >
          <GatsbyImage
            className={classes.ProjectImageWrapper}
            imgClassName={classes.ProjectImage}
            objectFit={props.data.image.objectFit}
            image={props.data.image.src.childImageSharp.gatsbyImageData}
            alt={props.data.image.alt || `Project ${props.data.title}`}
          />
        </a>
      )}
      {props.data.image.src && !props.data.image.linkTo && (
        <GatsbyImage
          className={classes.ProjectImageWrapper}
          imgClassName={classes.ProjectImage}
          objectFit={props.data.image.objectFit}
          image={props.data.image.src.childImageSharp.gatsbyImageData}
          alt={props.data.image.alt || `Project ${props.data.title}`}
        />
      )}
    </Animation>
  );
}

export function MyProject() {
  const response = useLocalDataSource();
  console.log(response);
  const datap = response.allProjectsJson.sections;
  return datap;
}
