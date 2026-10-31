import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import ProfesionalCard from "../components/ProfesionalCard";
import { useTema } from "../components/TemaContext";
import { API_URL } from "../config/api";

const imagenesProfesionales: { [key: number]: any } = {
  1: require("../../assets/images/profesionales/marina.jpg"),
  2: require("../../assets/images/profesionales/ezequiel.jpg"),
  3: require("../../assets/images/profesionales/sofia.jpg"),
  4: require("../../assets/images/profesionales/nicolas.jpg"),
};

type Profesional = {
  idProfesional: number;
  nombreProfesional: string;
  telefono: number;
  direccion: string;
  correo: string;
  idEspecialidad: number;
  especialidad: string;
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

export default function Index() {
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modoDemo, setModoDemo] = useState(false);
  const { oscuro, cambiarTema, colores } = useTema();

  useEffect(() => {
    const obtenerProfesionales = async () => {
      try {
        if (!API_URL) {
          throw new Error("API no configurada");
        }

        const respuesta = await fetch(`${API_URL}/profesionales`);

        if (!respuesta.ok) {
          throw new Error("Error al consultar la API");
        }

        const datos: Profesional[] = await respuesta.json();
        setProfesionales(datos);
      } catch {
        setProfesionales(profesionalesDemo);
        setModoDemo(true);
      } finally {
        setCargando(false);
      }
    };

    obtenerProfesionales();
  }, []);

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

        <Link href="/mis-turnos" style={[styles.botonTurnos, { backgroundColor: colores.acento }]}>
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoBotonTurnos}>Mis turnos</Text>
        </Link>

        <Link href="/perfil" style={[styles.botonTurnos, { backgroundColor: colores.acento }]}>
          <Ionicons name="person-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoBotonTurnos}>Mi perfil</Text>
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cargando && (
          <Text style={{ color: colores.texto }}>Cargando profesionales...</Text>
        )}

        {!cargando && profesionales.map((profesional) => (
          <Link
            key={profesional.idProfesional}
            href={`/profesional/${profesional.idProfesional}`}
          >
            <ProfesionalCard
              nombre={profesional.nombreProfesional}
              especialidad={profesional.especialidad}
              imagen={imagenesProfesionales[profesional.idProfesional]}
            />
          </Link>
        ))}
      </ScrollView>
    </View>
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
  botonTurnos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  textoBotonTurnos: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 15,
  },
});