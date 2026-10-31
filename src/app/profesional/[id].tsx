import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useTema } from "../../components/TemaContext";
import { API_URL } from "../../config/api";

const imagenesProfesionales: { [key: number]: any } = {
  1: require("../../../assets/images/profesionales/marina.jpg"),
  2: require("../../../assets/images/profesionales/ezequiel.jpg"),
  3: require("../../../assets/images/profesionales/sofia.jpg"),
  4: require("../../../assets/images/profesionales/nicolas.jpg"),
};

const profesionalesDemo: Profesional[] = [
  {
    idProfesional: 1,
    nombreProfesional: "Marina López",
    telefono: 351555101,
    direccion: "Av. Colón 100, Córdoba",
    correo: "marina.lopez@turnero.test",
    idEspecialidad: 1,
    especialidad: "Odontología general",
  },
  {
    idProfesional: 2,
    nombreProfesional: "Ezequiel Torres",
    telefono: 351555102,
    direccion: "Av. Colón 100, Córdoba",
    correo: "ezequiel.torres@turnero.test",
    idEspecialidad: 2,
    especialidad: "Ortodoncia",
  },
  {
    idProfesional: 3,
    nombreProfesional: "Sofía Ramírez",
    telefono: 351555103,
    direccion: "Av. Colón 100, Córdoba",
    correo: "sofia.ramirez@turnero.test",
    idEspecialidad: 3,
    especialidad: "Endodoncia",
  },
  {
    idProfesional: 4,
    nombreProfesional: "Nicolás Ferreyra",
    telefono: 351555104,
    direccion: "Av. Colón 100, Córdoba",
    correo: "nicolas.ferreyra@turnero.test",
    idEspecialidad: 8,
    especialidad: "Cirugía maxilofacial",
  },
];

type Profesional = {
  idProfesional: number;
  nombreProfesional: string;
  telefono: number;
  direccion: string;
  correo: string;
  idEspecialidad: number;
  especialidad: string;
};

type Disponibilidad = {
  idProfesional: number;
  nombreProfesional: string;
  especialidad: string;
  horarios: string[];
};

const convertirFechaApi = (fechaArgentina: string): string | null => {
  const partes = fechaArgentina.split("-");

  if (partes.length !== 3) return null;

  const [dia, mes, anio] = partes.map(Number);

  if (
    !Number.isInteger(dia) ||
    !Number.isInteger(mes) ||
    !Number.isInteger(anio) ||
    partes[0].length !== 2 ||
    partes[1].length !== 2 ||
    partes[2].length !== 4
  ) {
    return null;
  }

  const fechaDate = new Date(anio, mes - 1, dia);

  if (
    fechaDate.getFullYear() !== anio ||
    fechaDate.getMonth() !== mes - 1 ||
    fechaDate.getDate() !== dia
  ) {
    return null;
  }

  return `${anio}-${partes[1]}-${partes[0]}`;
};

export default function Detalle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [profesional, setProfesional] = useState<Profesional | null>(null);
  const [cargando, setCargando] = useState(true);
  const [modoDemo, setModoDemo] = useState(false);

  const router = useRouter();
  const { colores } = useTema();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [horario, setHorario] = useState("");
  const [buscando, setBuscando] = useState(false);

  const [fecha, setFecha] = useState("");
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [errorHorarios, setErrorHorarios] = useState("");

  useEffect(() => {
    const obtenerProfesional = async () => {
      try {
        if (!API_URL) {
          throw new Error("No se configuró la URL de la API.");
        }

        const respuesta = await fetch(`${API_URL}/profesionales/${id}`);

        if (!respuesta.ok) {
          throw new Error("No se pudo consultar el profesional.");
        }

        const datos: Profesional = await respuesta.json();
        setProfesional(datos);
      } catch {
        const profesionalDemo = profesionalesDemo.find(
          (p) => p.idProfesional === Number(id)
        );

        setProfesional(profesionalDemo ?? null);
        setModoDemo(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerProfesional();
  }, [id]);

  useEffect(() => {
    const fechaApi = convertirFechaApi(fecha);

    if (!fechaApi || !profesional) {
      setDisponibilidad([]);
      setErrorHorarios("");
      setCargandoHorarios(false);
      return;
    }

    const obtenerDisponibilidad = async () => {
      setCargandoHorarios(true);
      setErrorHorarios("");

      try {
        if (!API_URL || modoDemo) {
          throw new Error("Modo demostración");
        }

        const respuesta = await fetch(
          `${API_URL}/turnos/disponibilidad?fecha=${fechaApi}`
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo consultar la disponibilidad.");
        }

        const datos: Disponibilidad[] = await respuesta.json();
        setDisponibilidad(datos);
      } catch {
        setDisponibilidad([
          {
            idProfesional: profesional.idProfesional,
            nombreProfesional: profesional.nombreProfesional,
            especialidad: profesional.especialidad,
            horarios: ["09:00", "10:00", "11:00", "15:00", "16:00"],
          },
        ]);
        setModoDemo(true);
      } finally {
        setCargandoHorarios(false);
      }
    };

    obtenerDisponibilidad();
  }, [fecha, profesional, modoDemo]);

  if (cargando) {
    return <Text>Cargando profesional...</Text>;
  }

  if (!profesional) {
    return <Text>Profesional no encontrado</Text>;
  }

  const mostrarError = (mensaje: string) => {
    if (Platform.OS === "web") {
      window.alert(mensaje);
    } else {
      Alert.alert("Error", mensaje);
    }
  };

  const irAConfirmacion = (fechaApi: string) => {
    router.replace({
      pathname: "/confirmacion",
      params: {
        nombre: nombre.trim(),
        telefono,
        horario,
        fecha: fechaApi,
        profesional: profesional.nombreProfesional,
        demo: modoDemo ? "true" : "false",
      },
    });
  };

  const pedirTurno = async () => {
    if (nombre.trim() === "") {
      mostrarError("Ingresá tu nombre.");
      return;
    }

    if (telefono.replace(/\D/g, "").length < 8) {
      mostrarError("Ingresá un teléfono válido.");
      return;
    }

    if (fecha.trim() === "") {
      mostrarError("Ingresá una fecha.");
      return;
    }

    if (horario === "") {
      mostrarError("Elegí un horario.");
      return;
    }

    const fechaApi = convertirFechaApi(fecha);

    if (!fechaApi) {
      mostrarError(
        "Ingresá una fecha válida con el formato DD-MM-AAAA. Ejemplo: 23-11-2026."
      );
      return;
    }

    if (modoDemo) {
      irAConfirmacion(fechaApi);
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/turnos/reservar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdPaciente: 1,
          IdProfesional: profesional.idProfesional,
          Fecha: fechaApi,
          Hora: `${horario}:00`,
          Estado: "Confirmado",
        }),
      });

      const resultado = await respuesta.text();

      if (!respuesta.ok) {
        let mensaje = "No se pudo reservar el turno.";

        try {
          const datos = JSON.parse(resultado);
          mensaje = datos.message || mensaje;
        } catch {
          if (resultado.trim() !== "") {
            mensaje = resultado;
          }
        }

        mostrarError(mensaje);
        return;
      }

      console.log("Turno reservado:", resultado);
      irAConfirmacion(fechaApi);
    } catch {
      setModoDemo(true);
      irAConfirmacion(fechaApi);
    }
  };

  const comoLlegar = async () => {
    try {
      const { granted } =
        await Location.requestForegroundPermissionsAsync();

      if (!granted) {
        Alert.alert(
          "Sin permiso",
          "Necesitamos tu ubicación para mostrarte cómo llegar.",
          [
            { text: "Ahora no", style: "cancel" },
            { text: "Ajustes", onPress: () => Linking.openSettings() },
          ]
        );
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

      const destino = encodeURIComponent(
        "CRED Odontología Digital, Obispo Oro 345, X5000BFG Córdoba, Argentina"
      );

      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destino}`;

      Linking.openURL(url);
    } catch {
      mostrarError("No se pudo obtener la ubicación.");
    } finally {
      setBuscando(false);
    }
  };

  const horariosDisponibles =
    disponibilidad.find(
      (p) => p.idProfesional === profesional.idProfesional
    )?.horarios ?? [];

  const fechaValida = convertirFechaApi(fecha) !== null;

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
          <Text style={[styles.volver, { color: colores.acento }]}>
            Volver
          </Text>
        </View>
      </Pressable>

      <View style={[styles.card, { backgroundColor: colores.tarjeta }]}>
        <Image
          source={imagenesProfesionales[profesional.idProfesional]}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={[styles.nombre, { color: colores.texto }]}>
            {profesional.nombreProfesional}
          </Text>

          <Text style={[styles.especialidad, { color: colores.acento }]}>
            {profesional.especialidad}
          </Text>
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
        <Text style={[styles.tituloFormulario, { color: colores.texto }]}>
          Pedir turno
        </Text>

        <TextInput
          placeholder="Nombre y apellido"
          placeholderTextColor={colores.textoSecundario}
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
          style={[
            styles.input,
            { color: colores.texto, borderColor: colores.textoSecundario },
          ]}
        />

        <TextInput
          placeholder="Teléfono"
          placeholderTextColor={colores.textoSecundario}
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
          maxLength={15}
          style={[
            styles.input,
            { color: colores.texto, borderColor: colores.textoSecundario },
          ]}
        />

        <Text style={[styles.label, { color: colores.textoSecundario }]}>
          Fecha del turno (DD-MM-AAAA)
        </Text>

        <TextInput
          placeholder="23-11-2026"
          placeholderTextColor={colores.textoSecundario}
          value={fecha}
          onChangeText={(texto) => {
            setFecha(texto);
            setHorario("");
          }}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          style={[
            styles.input,
            { color: colores.texto, borderColor: colores.textoSecundario },
          ]}
        />

        <Text style={[styles.label, { color: colores.textoSecundario }]}>
          Horarios disponibles
        </Text>

        {cargandoHorarios && (
          <Text style={{ color: colores.textoSecundario }}>
            Consultando horarios...
          </Text>
        )}

        {!cargandoHorarios &&
          fechaValida &&
          (horariosDisponibles.length > 0 ? (
            <View style={styles.horarios}>
              {horariosDisponibles.map((h) => (
                <Pressable
                  key={h}
                  onPress={() => setHorario(h)}
                  style={[
                    styles.horario,
                    { borderColor: colores.acento },
                    horario === h && { backgroundColor: colores.acento },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        horario === h ? colores.tarjeta : colores.acento,
                    }}
                  >
                    {h}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={{ color: colores.textoSecundario }}>
              No hay horarios disponibles para esta fecha.
            </Text>
          ))}

        {!fechaValida && (
          <Text style={{ color: colores.textoSecundario }}>
            Ingresá una fecha válida para consultar los horarios.
          </Text>
        )}

        <Pressable
          onPress={pedirTurno}
          style={[styles.botonTurno, { backgroundColor: colores.acento }]}
        >
          <Text style={[styles.textoBotonTurno, { color: colores.tarjeta }]}>
            Confirmar turno
          </Text>
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
  avisoDemo: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13,
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