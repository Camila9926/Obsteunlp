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
      const opcion = prompt(
        `Seleccioná estado para "${materia.nombre}":\n1. ✅ Regular\n2. 📚 Aprobada con final\n3. 🎖️ Promocionada\n4. 📝 Primer parcial\n5. ❌ Cancelar`
      );

      if (opcion === "1") {
        estado[materia.nombre] = "regular";
        btn.className = "materia regular";
        btn.textContent = `✅ ${materia.nombre}`;
      } else if (opcion === "2") {
        estado[materia.nombre] = "final";
        btn.className = "materia final";
        btn.textContent = `📚 ${materia.nombre}`;
      } else if (opcion === "3") {
        estado[materia.nombre] = "promocionada";
        btn.className = "materia promocionada";
        btn.textContent = `🎖️ ${materia.nombre}`;
      } else if (opcion === "4") {
        estado[materia.nombre] = "parcial";
        btn.className = "materia parcial";
        btn.textContent = `📝 ${materia.nombre}`;
      } else {
        return;
      }

      mensaje.textContent = `Estado actualizado: ${materia.nombre}`;
      actualizarProgreso();
    };

    contenedor.appendChild(btn);
  });
});

function actualizarProgreso() {
  const total = Object.keys(estado).length;
  const completadas = Object.values(estado).filter(v => v === "regular" || v === "final" || v === "promocionada").length;
  const progreso = Math.round((completadas / total) * 100);
  barra.value = progreso;
  porcentaje.textContent = `${progreso}%`;
}
