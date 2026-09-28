import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import profesionales from "../../components/Profesionales";

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const profesional = profesionales.find((p) => p.id === id);
  const router = useRouter();
  if (!profesional) {
    return (<Text>Profesional no encontrado</Text>);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.volver}>← Volver</Text>
      </Pressable>

      <View style={styles.card}>
        <Image source={{ uri: profesional.imagen }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.nombre}>{profesional.nombre}</Text>
          <Text style={styles.especialidad}>{profesional.especialidad}</Text>
          <Text style={styles.disponibilidad}>{profesional.disponibilidad}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12141a",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  volver: {
    color: "#8ab4f8",
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#1c1f26",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  info: {
    alignItems: "center",
  },
  nombre: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
  especialidad: {
    fontSize: 16,
    color: "#8ab4f8",
    marginTop: 6,
    textAlign: "center",
  },
  disponibilidad: {
    fontSize: 14,
    color: "#a0a4ad",
    marginTop: 12,
    textAlign: "center",
  },
});