import { useLocalSearchParams, useRouter } from "expo-router";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTema } from "../components/TemaContext";

export default function ConfirmacionScreen() {
  const router = useRouter();
  const { nombre, telefono, horario, fecha, profesional } =
    useLocalSearchParams<{
      nombre: string;
      telefono: string;
      horario: string;
      fecha: string;
      profesional: string;
    }>();

  const { colores } = useTema();

  const compartirTurno = async () => {
    try {
      await Share.share({
        message: `Datos de mi turno odontológico:

Profesional: ${profesional}
Fecha: ${fecha}
Horario: ${horario}
Paciente: ${nombre}
Teléfono: ${telefono}`,
      });
    } catch (error) {
      console.log("Error al compartir:", error);
    }
  };

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      <Text style={styles.icono}>✓</Text>

      <Text style={[styles.titulo, { color: colores.texto }]}>
        ¡Listo!
      </Text>

      <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>
        Estos son los datos de tu turno.
      </Text>

      <View style={[styles.tarjeta, { backgroundColor: colores.tarjeta }]}>
        <Text style={[styles.dato, { color: colores.texto }]}>
          Profesional: {profesional}
        </Text>

        <Text style={[styles.dato, { color: colores.texto }]}>
          Fecha: {fecha}
        </Text>

        <Text style={[styles.dato, { color: colores.texto }]}>
          Horario: {horario}
        </Text>

        <Text style={[styles.dato, { color: colores.texto }]}>
          Paciente: {nombre}
        </Text>

        <Text style={[styles.dato, { color: colores.texto }]}>
          Teléfono: {telefono}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.boton, { backgroundColor: colores.acento }]}
        onPress={compartirTurno}
      >
        <Text style={styles.textoBoton}>Compartir turno</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botonSecundario, { borderColor: colores.acento }]}
        onPress={() => router.replace("/")}
      >
        <Text style={[styles.textoSecundario, { color: colores.acento }]}>
          Volver al inicio
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  icono: {
    fontSize: 64,
    color: "#35A66F",
    marginBottom: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 28,
    textAlign: "center",
  },
  tarjeta: {
    width: "100%",
    padding: 20,
    borderRadius: 14,
    marginBottom: 24,
    gap: 14,
  },
  dato: {
    fontSize: 16,
  },
  boton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  textoSecundario: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
