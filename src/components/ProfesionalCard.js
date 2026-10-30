import { Image, StyleSheet, Text, View } from "react-native";
import { useTema } from "./TemaContext";

export default function ProfesionalCard({
  nombre,
  especialidad,
  imagen,
  disponibilidad,
}) {
  const { colores } = useTema();

  return (
    <View style={[styles.card, { backgroundColor: colores.tarjeta }]}>
      <Image source={{ uri: imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.nombre, { color: colores.texto }]}>{nombre}</Text>
        <Text style={[styles.especialidad, { color: colores.acento }]}>{especialidad}</Text>
        <Text style={[styles.disponibilidad, { color: colores.textoSecundario }]}>{disponibilidad}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
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
  },
  especialidad: {
    fontSize: 13,
    marginTop: 2,
  },
  disponibilidad: {
    fontSize: 12,
    marginTop: 4,
  },
});
