import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import ProfesionalCard from "../components/ProfesionalCard";
import profesionales from "../components/Profesionales";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Turnero Dental</Text>
        <Text style={styles.subtitle}>
          Elegí un profesional para pedir tu turno
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {profesionales.map((profesional) => (
          <ProfesionalCard
            key={profesional.id}
            nombre={profesional.nombre}
            especialidad={profesional.especialidad}
            imagen={profesional.imagen}
            disponibilidad={profesional.disponibilidad}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12141a",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#a0a4ad",
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
