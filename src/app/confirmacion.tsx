import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import { consultorio } from "../components/Profesionales";
import { useTema } from "../components/TemaContext";

export default function Confirmacion() {
  const { nombre, telefono, horario, fecha, profesional } = useLocalSearchParams();
  const router = useRouter();
  const { colores } = useTema();
  const fechaLocal = fecha
    ? String(fecha).split("-").reverse().join("-")
    : "";

  const compartirTurno = async () => {
    const mapa = `https://www.google.com/maps/search/?api=1&query=${consultorio.latitude},${consultorio.longitude}`;

    await Share.share({
      message:
        `Turno confirmado 🦷\n` +
        `Paciente: ${nombre}\n` +
        `Profesional: ${profesional}\n` +
        `Fecha: ${fechaLocal}\n` +
        `Horario: ${horario}\n` +
        `Lugar: ${consultorio.nombre}\n` +
        mapa,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colores.fondo }]}>
      <View style={[styles.card, { backgroundColor: colores.tarjeta }]}>
        <Ionicons name="checkmark-circle" size={64} color={colores.acento} />
        <Text style={[styles.titulo, { color: colores.texto }]}>¡Turno confirmado!</Text>

        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Paciente: {nombre}</Text>
        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Teléfono: {telefono}</Text>
        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Profesional: {profesional}</Text>
        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Fecha: {fechaLocal}</Text>
        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Horario: {horario}</Text>
        <Text style={[styles.dato, { color: colores.textoSecundario }]}>Lugar: {consultorio.nombre}</Text>
      </View>

      <Pressable
        onPress={compartirTurno}
        style={[styles.botonCompartir, { borderColor: colores.acento }]}
      >
        <Ionicons name="logo-whatsapp" size={20} color={colores.acento} />
        <Text style={[styles.textoBoton, { color: colores.acento }]}>Compartir turno</Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        style={[styles.boton, { backgroundColor: colores.acento }]}
      >
        <Text style={[styles.textoBoton, { color: colores.tarjeta }]}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 16,
  },
  dato: {
    fontSize: 15,
    marginBottom: 6,
  },
  botonCompartir: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  boton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: "600",
  },
});
