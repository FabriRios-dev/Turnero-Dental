import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTema } from "../components/TemaContext";
import { API_URL } from "../config/api";

type Turno = {
    idTurno: number;
    fecha: string;
    hora: string;
    estado: string;
    profesional: string;
    especialidad: string;
};

const turnosDemo: Turno[] = [
    {
        idTurno: 1,
        fecha: "2026-11-05",
        hora: "09:00:00",
        estado: "Confirmado",
        profesional: "Marina López",
        especialidad: "Odontología general",
    },
    {
        idTurno: 2,
        fecha: "2026-11-12",
        hora: "10:30:00",
        estado: "Pendiente",
        profesional: "Ezequiel Torres",
        especialidad: "Ortodoncia",
    },
];

export default function MisTurnos() {
    const { oscuro, colores } = useTema();
    const router = useRouter();

    const {
        data,
        isLoading,
    } = useQuery<Turno[]>({
        queryKey: ["turnos", 1],
        queryFn: async () => {
            if (!API_URL) {
                throw new Error("No se configuró la URL de la API.");
            }

            const respuesta = await fetch(
                `${API_URL}/turnos/paciente/1`
            );

            if (!respuesta.ok) {
                throw new Error("No se pudieron consultar los turnos.");
            }

            return respuesta.json();
        },
    });

    const modoDemo = data === undefined;
    const turnos = data ?? turnosDemo;

    const turnosOrdenados = [...turnos].sort((a, b) => {
        const fechaA = `${a.fecha.slice(0, 10)}T${a.hora}`;
        const fechaB = `${b.fecha.slice(0, 10)}T${b.hora}`;

        return fechaA.localeCompare(fechaB);
    });

    const formatearFecha = (fecha: string) => {
        const [anio, mes, dia] = fecha.slice(0, 10).split("-");
        return `${dia}/${mes}/${anio}`;
    };

    return (
        <View style={[styles.container, { backgroundColor: colores.fondo }]}>
            <StatusBar barStyle={oscuro ? "light-content" : "dark-content"} />

            <View style={styles.header}>
                <Pressable
                    onPress={() => router.replace("/")}
                    style={styles.botonVolver}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={colores.acento}
                    />
                    <Text style={[styles.textoVolver, { color: colores.texto }]}>
                        Volver al inicio
                    </Text>
                </Pressable>

                <Text style={[styles.titulo, { color: colores.texto }]}>
                    Mis turnos
                </Text>

                <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>
                    Consultá tus citas odontológicas
                </Text>
            </View>

            {isLoading ? (
                <View style={styles.mensaje}>
                    <ActivityIndicator size="large" color={colores.acento} />
                    <Text style={{ color: colores.texto, marginTop: 12 }}>
                        Cargando tus turnos...
                    </Text>
                </View>
            ) : (
                <>

                    {turnosOrdenados.length === 0 ? (
                        <View style={styles.mensaje}>
                            <Ionicons
                                name="calendar-outline"
                                size={48}
                                color={colores.textoSecundario}
                            />
                            <Text style={[styles.vacio, { color: colores.texto }]}>
                                Todavía no tenés turnos registrados.
                            </Text>
                        </View>
                    ) : (
                        <ScrollView contentContainerStyle={styles.lista}>
                            {turnosOrdenados.map((turno) => {
                                const cancelado =
                                    turno.estado.toLowerCase() === "cancelado";

                                return (
                                    <View
                                        key={turno.idTurno}
                                        style={[
                                            styles.tarjeta,
                                            { backgroundColor: colores.tarjeta },
                                        ]}
                                    >
                                        <View style={styles.fila}>
                                            <Text style={[styles.profesional, { color: colores.texto }]}>
                                                {turno.profesional}
                                            </Text>

                                            <View
                                                style={[
                                                    styles.estado,
                                                    {
                                                        backgroundColor: cancelado ? "#FDE8E7" : "#E1F4E8",
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={{
                                                        color: cancelado ? "#B42318" : "#187A40",
                                                        fontSize: 12,
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {turno.estado}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text
                                            style={[
                                                styles.especialidad,
                                                { color: colores.textoSecundario },
                                            ]}
                                        >
                                            {turno.especialidad}
                                        </Text>

                                        <View style={styles.datos}>
                                            <View style={styles.dato}>
                                                <Ionicons
                                                    name="calendar-outline"
                                                    size={18}
                                                    color={colores.acento}
                                                />
                                                <Text style={[styles.textoDato, { color: colores.texto }]}>
                                                    {formatearFecha(turno.fecha)}
                                                </Text>
                                            </View>

                                            <View style={styles.dato}>
                                                <Ionicons
                                                    name="time-outline"
                                                    size={18}
                                                    color={colores.acento}
                                                />
                                                <Text style={[styles.textoDato, { color: colores.texto }]}>
                                                    {turno.hora.slice(0, 5)} hs
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )}
                </>
            )}
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
        paddingBottom: 20,
    },
    botonVolver: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },
    textoVolver: {
        fontSize: 14,
        marginLeft: 6,
    },
    titulo: {
        fontSize: 26,
        fontWeight: "bold",
    },
    subtitulo: {
        fontSize: 14,
        marginTop: 4,
    },
    avisoDemo: {
        textAlign: "center",
        marginBottom: 12,
        fontSize: 13,
    },
    lista: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    tarjeta: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
        elevation: 2,
    },
    fila: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profesional: {
        fontSize: 17,
        fontWeight: "bold",
        flex: 1,
        marginRight: 8,
    },
    estado: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    especialidad: {
        fontSize: 14,
        marginTop: 5,
    },
    datos: {
        flexDirection: "row",
        marginTop: 16,
        gap: 20,
    },
    dato: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    textoDato: {
        fontSize: 14,
    },
    mensaje: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    vacio: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 12,
    },
});