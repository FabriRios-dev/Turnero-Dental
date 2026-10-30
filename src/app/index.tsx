import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import ProfesionalCard from "../components/ProfesionalCard";
import profesionales from "../components/Profesionales";
import { useTema } from "../components/TemaContext";

export default function Index() {
  const { oscuro, cambiarTema, colores } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <StatusBar barStyle={oscuro ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <View style={styles.filaTitulo}>
          <Text style={[styles.title, { color: colores.texto }]}>Turnero Dental</Text>
          <Pressable
            onPress={cambiarTema}
            style={[styles.botonTema, { backgroundColor: colores.tarjeta }]}
          >
            <Ionicons name={oscuro ? "sunny" : "moon"} size={20} color={colores.acento} />
          </Pressable>
        </View>
        <Text style={[styles.subtitle, { color: colores.textoSecundario }]}>
          Elegí un profesional para pedir tu turno
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {profesionales.map((profesional) => (
          <Link key={profesional.id} href={`/profesional/${profesional.id}`}>
            <ProfesionalCard
              nombre={profesional.nombre}
              especialidad={profesional.especialidad}
              imagen={profesional.imagen}
              disponibilidad={profesional.disponibilidad}
            />
          </Link>
        ))}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  botonTema: {
    padding: 8,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
