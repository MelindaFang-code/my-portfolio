import React from "react";
import { Animation, Section } from "gatsby-theme-portfolio-minimal";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import * as classes from "./style.module.css";
import { graphql, useStaticQuery } from "gatsby";
import { ImageObject } from "gatsby-theme-portfolio-minimal/src/types";

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  LINK = "link",
}

interface ButtonProps {
  type: ButtonType;
  label: string;
  selected: boolean;
  id?: string;
  url?: string;
  externalLink?: boolean;
  onClickHandler?: () => void;
}

export function Button(props: ButtonProps): React.ReactElement {
  if (props.type === ButtonType.LINK) {
    if (!props.url) {
      throw new Error(`Button should be a ${props.type} but no URL is given!`);
    } else {
      if (props.externalLink) {
        return (
          <a
            id={props.id}
            className={classes.Button}
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="External Link"
          >
            {props.label}
          </a>
        );
      }
    }
  } else if (
    props.type === ButtonType.BUTTON ||
    props.type === ButtonType.SUBMIT
  ) {
    if (!props.onClickHandler) {
      throw new Error(
        `Button should be a ${props.type} but no onClickHandler is given!`
      );
    }
    return props.selected ? (
      <button
        id={props.id}
        className={classes.selectedButton}
        type={props.type}
        onClick={props.onClickHandler}
        title={props.label}
      >
        {props.label}
      </button>
    ) : (
      <button
        id={props.id}
        className={classes.Button}
        type={props.type}
        onClick={props.onClickHandler}
      >
        {props.label}
      </button>
    );
  } else {
    throw new Error(`Unknown button type specified.`);
  }
}

interface PageSection {
  sectionId: string;
  setSkills: Function;
  skills: String;
  heading?: string;
}
interface InterestsSectionQueryResult {
  allInterestsJson: {
    sections: {
      button: {
        initiallyShownInterests: number;
        label: string;
        visible: boolean;
      };
      interests: {
        image: ImageObject;
        label: string;
      }[];
    }[];
  };
}

export const useLocalDataSource = (): InterestsSectionQueryResult => {
  return useStaticQuery(graphql`
    query InterestsSectionQuery {
      allInterestsJson {
        sections: nodes {
          button {
            initiallyShownInterests
            label
            visible
          }
          interests {
            image {
              alt
              src {
                childImageSharp {
                  gatsbyImageData(width: 20, height: 20)
                }
              }
              objectFit
            }
            label
          }
        }
      }
    }
  `);
};

export function InterestsSection(props: PageSection): React.ReactElement {
  const response = useLocalDataSource();
  const data = response.allInterestsJson.sections[0];
  const shouldShowButton = data.button.visible !== false;
  const initiallyShownInterests = data.button.initiallyShownInterests ?? 5;
  const [shownInterests, setShownInterests] = React.useState<number>(
    shouldShowButton ? initiallyShownInterests : data.interests.length
  );

  function loadMoreHandler() {
    setShownInterests(data.interests.length);
  }

  return (
    <Animation type="fadeUp">
      <Section anchor={props.sectionId} heading={props.heading}>
        <div className={classes.Interests}>
          {data.interests.slice(0, shownInterests).map((interest, key) => {
            return (
              <Animation
                key={key}
                className={classes.Interest}
                type="scaleIn"
                delay={key * 100}
              >
                {interest.image.src && (
                  <GatsbyImage
                    image={interest.image.src.childImageSharp.gatsbyImageData}
                    className={classes.Icon}
                    alt={interest.image.alt || `Interest ${interest.label}`}
                  />
                )}{" "}
                <Button
                  type={ButtonType.BUTTON}
                  onClickHandler={() => {
                    props.skills != interest.label
                      ? props.setSkills(interest.label)
                      : props.setSkills("");
                  }}
                  label={interest.label}
                  selected={props.skills == interest.label}
                ></Button>
              </Animation>
            );
          })}
          {shouldShowButton && shownInterests < data.interests.length && (
            <Animation type="scaleIn" delay={(shownInterests + 1) * 100}>
              <Button
                type={ButtonType.BUTTON}
                onClickHandler={loadMoreHandler}
                label="load more"
              />
            </Animation>
          )}
        </div>
      </Section>
    </Animation>
  );
}
