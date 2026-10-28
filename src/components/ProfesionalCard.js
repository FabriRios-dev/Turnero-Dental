import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfesionalCard({
  nombre,
  especialidad,
  imagen,
  disponibilidad,
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.especialidad}>{especialidad}</Text>
        <Text style={styles.disponibilidad}>{disponibilidad}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1c1f26",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  especialidad: {
    fontSize: 13,
    color: "#8ab4f8",
    marginTop: 2,
  },
  disponibilidad: {
    fontSize: 12,
    color: "#a0a4ad",
    marginTop: 4,
  },
});
