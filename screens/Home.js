import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { Card, Button } from "../components";

const { width } = Dimensions.get("screen");

class Home extends React.Component {
  // Add the following state variable
  state = {
    projects: [],
  };

  // Use the componentDidMount lifecycle method to fetch projects data
  componentDidMount() {
    this.fetchProjects();
  }

  fetchProjects = async () => {
    try {
      // Replace "YOUR_PROJECTS_API_URL" with your actual API endpoint
      const response = await fetch("https://tathmini.live/api/project");
      const data = await response.json();
      this.setState({ projects: data });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Modify renderProjects to use projects data
  renderProjects = () => {
    const { projects } = this.state;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {/* Modify this part to use projects data */}
          {projects.map((project, index) => (
            <Card
              key={index}
              item={{
                title: project.projectName,
                image: project.theme, // Use the appropriate property for the image
                cta: 'View project', // You can customize the CTA text
                description: `Category: ${project.levelThreeCategory}`,
              }}
              horizontal
            />
          ))}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProjects()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: "montserrat-regular",
  },
});

export default Home;
