import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica", fontWeight: "normal" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 24,
    borderBottom: "2 solid #0d9488",
    paddingBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    color: "#4a4a4a",
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    fontSize: 9,
    color: "#666",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  separator: {
    color: "#ccc",
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0d9488",
    marginBottom: 10,
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#333",
  },
  entry: {
    marginBottom: 14,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  entryDate: {
    fontSize: 9,
    color: "#888",
  },
  entryContent: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#444",
  },
});

type ExperienceEntry = {
  date: string;
  title: string;
  content: string;
};

export function CVDocument({
  name,
  role,
  location,
  email,
  phone,
  github,
  linkedin,
  summary,
  aboutLabel,
  experience,
  education,
  experienceLabel,
  educationLabel,
}: {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  aboutLabel: string;
  experience: ExperienceEntry[];
  education: ExperienceEntry[];
  experienceLabel: string;
  educationLabel: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
          <View style={styles.contactRow}>
            <Text>{location}</Text>
            <Text style={styles.separator}>|</Text>
            <Text>{email}</Text>
            <Text style={styles.separator}>|</Text>
            <Text>{phone}</Text>
            <Text style={styles.separator}>|</Text>
            <Text>{github}</Text>
            <Text style={styles.separator}>|</Text>
            <Text>{linkedin}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{aboutLabel}</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{experienceLabel}</Text>
          {experience.map((item, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDate}>{item.date}</Text>
              </View>
              <Text style={styles.entryContent}>{item.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{educationLabel}</Text>
          {education.map((item, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{item.title}</Text>
                <Text style={styles.entryDate}>{item.date}</Text>
              </View>
              <Text style={styles.entryContent}>{item.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
