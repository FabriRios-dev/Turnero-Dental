import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import { useState } from "react";
import { Alert, Image, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import profesionales, { consultorio } from "../../components/Profesionales";
import { useTema } from "../../components/TemaContext";

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const profesional = profesionales.find((p) => p.id === id);
  const router = useRouter();
  const { colores } = useTema();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [horario, setHorario] = useState("");
  const [buscando, setBuscando] = useState(false);

  if (!profesional) {
    return (<Text>Profesional no encontrado</Text>);
  }

  const mostrarError = (mensaje: string) => {
    if (Platform.OS === "web") {
      window.alert(mensaje);
    } else {
      Alert.alert("Error", mensaje);
    }
  };

  const pedirTurno = () => {
    if (nombre.trim() === "") {
      mostrarError("Ingresá tu nombre");
      return;
    }
    if (telefono.length < 8) {
      mostrarError("Ingresá un teléfono válido");
      return;
    }
    if (horario === "") {
      mostrarError("Elegí un horario");
      return;
    }

    router.replace({
      pathname: "/confirmacion",
      params: {
        nombre: nombre,
        telefono: telefono,
        horario: horario,
        profesional: profesional.nombre,
      },
    });
  };

  const comoLlegar = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Sin permiso", "Necesitamos tu ubicación para mostrarte cómo llegar.", [
          { text: "Ahora no", style: "cancel" },
          { text: "Ajustes", onPress: () => Linking.openSettings() },
        ]);
        return;
      }

      if (!(await Location.hasServicesEnabledAsync())) {
        Alert.alert("GPS apagado", "Encendé la ubicación del celular.");
        return;
      }

      setBuscando(true);
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = pos.coords;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${consultorio.latitude},${consultorio.longitude}`;
      Linking.openURL(url);
    } catch {
      mostrarError("No se pudo obtener la ubicación");
    } finally {
      setBuscando(false);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={styles.container}
    >
      <Pressable
        onPress={() => router.back()}
        style={[styles.botonVolver, { backgroundColor: colores.tarjeta }]}
      >
        <View style={styles.contenidoBoton}>
          <Ionicons name="arrow-back" size={20} color={colores.acento} />
          <Text style={[styles.volver, { color: colores.acento }]}>Volver</Text>
        </View>
      </Pressable>

      <View style={[styles.card, { backgroundColor: colores.tarjeta }]}>
        <Image source={{ uri: profesional.imagen }} style={styles.image} />

        <View style={styles.info}>
          <Text style={[styles.nombre, { color: colores.texto }]}>{profesional.nombre}</Text>
          <Text style={[styles.especialidad, { color: colores.acento }]}>{profesional.especialidad}</Text>
          <Text style={[styles.disponibilidad, { color: colores.textoSecundario }]}>{profesional.disponibilidad}</Text>
        </View>

        <View style={styles.consultorio}>
          <Ionicons name="location" size={18} color={colores.acento} />
          <Text style={[styles.textoConsultorio, { color: colores.texto }]}>{consultorio.nombre}</Text>
        </View>

        <Pressable
          onPress={comoLlegar}
          disabled={buscando}
          style={[styles.botonLlegar, { borderColor: colores.acento }]}
        >
          <Text style={[styles.textoLlegar, { color: colores.acento }]}>
            {buscando ? "Buscando..." : "¿Cómo llegar?"}
          </Text>
        </Pressable>
      </View>

      <View style={[styles.formulario, { backgroundColor: colores.tarjeta }]}>
        <Text style={[styles.tituloFormulario, { color: colores.texto }]}>Pedir turno</Text>

        <TextInput
          placeholder="Nombre y apellido"
          placeholderTextColor={colores.textoSecundario}
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          style={[styles.input, { color: colores.texto, borderColor: colores.textoSecundario }]}
        />
        <TextInput
          placeholder="Teléfono"
          placeholderTextColor={colores.textoSecundario}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          maxLength={15}
          style={[styles.input, { color: colores.texto, borderColor: colores.textoSecundario }]}
        />

        <Text style={[styles.label, { color: colores.textoSecundario }]}>Horarios disponibles</Text>
        <View style={styles.horarios}>
          {profesional.horarios.map((h) => (
            <Pressable
              key={h}
              onPress={() => setHorario(h)}
              style={[
                styles.horario,
                { borderColor: colores.acento },
                horario === h && { backgroundColor: colores.acento },
              ]}
            >
              <Text style={{ color: horario === h ? colores.tarjeta : colores.acento }}>{h}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={pedirTurno}
          style={[styles.botonTurno, { backgroundColor: colores.acento }]}
        >
          <Text style={[styles.textoBotonTurno, { color: colores.tarjeta }]}>Confirmar turno</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  botonVolver: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  contenidoBoton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  volver: {
    fontSize: 16,
  },
  card: {
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
    textAlign: "center",
  },
  especialidad: {
    fontSize: 16,
    marginTop: 6,
    textAlign: "center",
  },
  disponibilidad: {
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  consultorio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  textoConsultorio: {
    fontSize: 14,
  },
  botonLlegar: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  textoLlegar: {
    fontSize: 15,
    fontWeight: "600",
  },
  formulario: {
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  tituloFormulario: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  horarios: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  horario: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botonTurno: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotonTurno: {
    fontSize: 16,
    fontWeight: "600",
  },
});
