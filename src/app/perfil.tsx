import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Alert,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTema } from "../components/TemaContext";

export default function Perfil() {
  const router = useRouter();
  const { colores } = useTema();

  const [foto, setFoto] = useState<string | null>(null);
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [permisoCamara, solicitarPermisoCamara] = useCameraPermissions();

  const camaraRef = useRef<CameraView>(null);

  const mostrarMensaje = (mensaje: string) => {
    if (Platform.OS === "web") {
      window.alert(mensaje);
    } else {
      Alert.alert("Mi perfil", mensaje);
    }
  };

  const abrirCamara = async () => {
    if (!permisoCamara?.granted) {
      const permiso = await solicitarPermisoCamara();

      if (!permiso.granted) {
        mostrarMensaje("Necesitamos permiso para utilizar la cámara.");
        return;
      }
    }

    setMostrarCamara(true);
  };

  const sacarFoto = async () => {
    try {
      const imagen = await camaraRef.current?.takePictureAsync();

      if (imagen) {
        setFoto(imagen.uri);
        setMostrarCamara(false);
      }
    } catch {
      mostrarMensaje("No se pudo sacar la foto.");
    }
  };

  const elegirGaleria = async () => {
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      mostrarMensaje("Necesitamos permiso para acceder a la galería.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colores.fondo }}
      contentContainerStyle={styles.container}
    >
      <Pressable onPress={() => router.back()} style={styles.volver}>
        <Ionicons name="arrow-back" size={22} color={colores.acento} />
        <Text style={{ color: colores.texto }}>Volver</Text>
      </Pressable>

      <Text style={[styles.titulo, { color: colores.texto }]}>
        Mi perfil
      </Text>

      {mostrarCamara ? (
        <View style={styles.contenedorCamara}>
          <CameraView ref={camaraRef} style={styles.camara} facing="front" />

          <Pressable
            onPress={sacarFoto}
            style={[styles.boton, { backgroundColor: colores.acento }]}
          >
            <Ionicons name="camera" size={22} color="#FFFFFF" />
            <Text style={styles.textoBoton}>Sacar foto</Text>
          </Pressable>

          <Pressable onPress={() => setMostrarCamara(false)}>
            <Text style={{ color: colores.texto, marginTop: 12 }}>
              Cancelar
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View
              style={[
                styles.fotoVacia,
                { backgroundColor: colores.tarjeta },
              ]}
            >
              <Ionicons
                name="person"
                size={80}
                color={colores.textoSecundario}
              />
            </View>
          )}

          <Text style={[styles.descripcion, { color: colores.textoSecundario }]}>
            Elegí una foto para tu perfil.
          </Text>

          <Pressable
            onPress={abrirCamara}
            style={[styles.boton, { backgroundColor: colores.acento }]}
          >
            <Ionicons name="camera-outline" size={22} color="#FFFFFF" />
            <Text style={styles.textoBoton}>Sacar una foto</Text>
          </Pressable>

          <Pressable
            onPress={elegirGaleria}
            style={[styles.boton, { backgroundColor: colores.acento }]}
          >
            <Ionicons name="images-outline" size={22} color="#FFFFFF" />
            <Text style={styles.textoBoton}>Elegir de la galería</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
  },
  volver: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 28,
  },
  foto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 18,
  },
  fotoVacia: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  descripcion: {
    fontSize: 15,
    marginBottom: 24,
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 12,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  contenedorCamara: {
    width: "100%",
    alignItems: "center",
  },
  camara: {
    width: "100%",
    height: 400,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
});