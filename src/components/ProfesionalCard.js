
import { Image, StyleSheet, Text, View } from "react-native";
import { useTema } from "./TemaContext";

export default function ProfesionalCard({
  nombre,
  especialidad,
  imagen,
}) {
  const { colores } = useTema();

  return (
    <View style={[styles.card, { backgroundColor: colores.tarjeta }]}>
      <Image source={imagen} style={styles.imagen} />

      <View style={styles.info}>
        <Text style={[styles.nombre, { color: colores.texto }]}>
          {nombre}
        </Text>

        <Text style={[styles.especialidad, { color: colores.acento }]}>
          {especialidad}
        </Text>
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
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
});