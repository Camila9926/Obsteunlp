const materiasPorAnio = {
  anio1: [
    { nombre: "Biología celular y genética" },
    { nombre: "Ciencias sociales y obstetricia" },
    { nombre: "Psicología" },
    { nombre: "Anatomia, Histologia y Embriologia" },
    { nombre: "Obstetricia Normal" }
  ],
  anio2: [
    { nombre: "Epidemiología" },
    { nombre: "Educación para la salud reproductiva" },
    { nombre: "La salud materno infantil" },
    { nombre: "Farmacología general" },
    { nombre: "Microbiologia y parasitologia" },
    { nombre: "Obstetricia patologica" },
    { nombre: "Fisiología humana" }
  ],
  anio3: [
    { nombre: "Investigación en salud" },
    { nombre: "Salud pública" },
    { nombre: "Terapéutica bases farmacológicas" },
    { nombre: "Clinica obstetrica normal y patológica" },
    { nombre: "Neonatología normal y patológica" }
  ],
  anio4: [
    { nombre: "Inglés técnico" },
    { nombre: "Informática aplicada a las ciencias de la salud" },
    { nombre: "Enfermedades infecciosas" },
    { nombre: "Ética, deontología y obstetricia" },
    { nombre: "PFO" },
    { nombre: "Tesina" }
  ]
};

const estado = {};
const estadosVisuales = ["regular", "final", "promocionada", "parcial", null];
const emojis = {
  regular: "✅",
  final: "📚",
  promocionada: "🎖️",
  parcial: "📝"
};

const mensaje = document.getElementById("mensaje");
const barra = document.getElementById("barra-progreso");
const porcentaje = document.getElementById("porcentaje");

Object.entries(materiasPorAnio).forEach(([anioId, materias]) => {
  const contenedor = document.querySelector(`#${anioId} .materias-container`);
  materias.forEach((materia) => {
    const btn = document.createElement("div");
    btn.textContent = materia.nombre;
    btn.className = "materia";
    estado[materia.nombre] = null;

    btn.onclick = () => {
      const actual = estado[materia.nombre];
      const indice = estadosVisuales.indexOf(actual);
      const siguiente = estadosVisuales[(indice + 1) % estadosVisuales.length];
      estado[materia.nombre] = siguiente;

      btn.className = "materia";
      if (siguiente) btn.classList.add(siguiente);
      btn.textContent = siguiente ? `${emojis[siguiente] || ""} ${materia.nombre}` : materia.nombre;

      mensaje.textContent = siguiente
        ? `Estado actualizado: ${materia.nombre}`
        : `Estado borrado: ${materia.nombre}`;

      actualizarProgreso();
    };

    contenedor.appendChild(btn);
  });
});

function actualizarProgreso() {
  const total = Object.keys(estado).length;
  const completadas = Object.values(estado).filter(v =>
    v === "regular" || v === "final" || v === "promocionada"
  ).length;
  const progreso = Math.round((completadas / total) * 100);
  barra.value = progreso;
  porcentaje.textContent = `${progreso}%`;
        }
