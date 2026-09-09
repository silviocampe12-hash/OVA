
/*============================================================================
██████████ JAVASCRIPT -- CONTADOR DE VISITAS — cambiá esto por algo único de tu negocio,
   para que no se mezcle con el contador de otro sitio
  ===========================================================================*/
const CONTADOR_NAMESPACE = "dulces-suenos-blanqueria-8823";

function registrarVisita(){
  fetch(`https://api.countapi.xyz/hit/${CONTADOR_NAMESPACE}/visitas`)
    .then(res => res.json())
    .then(data => {
      if (new URLSearchParams(window.location.search).get('visitas') === '1'){
        const badge = document.createElement('div');
        badge.textContent = `👁️ Visitas totales: ${data.value}`;
        badge.style.cssText = `
          position:fixed; bottom:14px; right:14px; z-index:200;
          background:var(--ink); color:#fff; padding:8px 14px;
          border-radius:999px; font-family:'Averia Serif Libre', serif;
          font-size:13px; box-shadow:0 6px 16px rgba(0,0,0,.25);
        `;
        document.body.appendChild(badge);
      }
    })
    .catch(() => {}); // si el servicio falla, no rompe nada del catálogo
}
registrarVisita();

/*============================================================================
		██████████--JAVASCRIPT--██████████
   CARTEL DE EVENTOS ESPECIALES — completá esto para cada fecha que quieras
   festejar (Día del Maestro, Amigo, Navidad, lo que sea). Server para todo,
   solo cambiás estos valores:

   · activo        → true muestra el cartel, false lo apaga manualmente
                      en cualquier momento (sin borrar nada).
   · imagen        → link o nombre de archivo de una foto (opcional).
                      Dejalo "" (vacío) si no querés mostrar imagen.
   · titulo        → el título grande del cartel.
   · mensaje       → el texto de abajo.
   · fechaLimite   → formato "AAAA-MM-DD". El cartel deja de aparecer
                      SOLO a partir del día siguiente a esta fecha.
                      Dejalo "" si no querés que se apague nunca solo.
   · confeti       → true tira animación de confeti, false no.
   · emojisConfeti → los que quieras usar de confeti.██████████
   ===========================================================================*/
  const EVENTO_ESPECIAL = {
    activo: true,
    imagen: "",
    titulo: "¡Feliz Día del Maestro!",
    mensaje: "Gracias por acompañarnos. Este es un mensaje de ejemplo.",
    fechaLimite: "2026-09-11",
    confeti: true,
    emojisConfeti: ["🎉", "🌸", "✨"]
tipoEfecto: "formas",   // "formas" (cuadraditos/círculos de colores) o "emoji"
coloresConfeti: ["#B8935A", "#C97B84", "#F7E9E6", "#3B2A2E"], // solo se usa si tipoEfecto es "formas"
textoBotonContinuar: "Continuar",
retrasoBotones: 3,          // ████ segundos que tarda en aparecer el botón
promoActivo: false,          // ████ true si este evento tiene ofertas/promos
promoCategoria: "",          //████ nombre EXACTO de una categoría de tu planilla (ej: "Ofertas")
textoBotonPromo: "Ver promociones",
  };

  function mostrarEventoSiCorresponde(){
    if (!EVENTO_ESPECIAL.activo) return;
    if (EVENTO_ESPECIAL.fechaLimite){
      const limite = new Date(EVENTO_ESPECIAL.fechaLimite + 'T23:59:59');
      if (new Date() > limite) return;
    }
    if (sessionStorage.getItem('eventoCerrado')) return; // no lo repite si ya lo cerró en esta visita

    const img = document.getElementById('eventoImg');
    if (EVENTO_ESPECIAL.imagen){ img.src = EVENTO_ESPECIAL.imagen; img.style.display = 'block'; }
    document.getElementById('eventoTitulo').textContent = EVENTO_ESPECIAL.titulo || '';
    document.getElementById('eventoMensaje').textContent = EVENTO_ESPECIAL.mensaje || '';
    document.getElementById('eventoOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (EVENTO_ESPECIAL.confeti) lanzarConfeti();
  }

  function cerrarEvento(){
    document.getElementById('eventoOverlay').classList.remove('open');
    document.body.style.overflow = '';
    sessionStorage.setItem('eventoCerrado', '1');
  }

  function lanzarConfeti(){
  const cont = document.getElementById('eventoConfeti');
  for (let i = 0; i < 50; i++){
    const span = document.createElement('span');
    if (EVENTO_ESPECIAL.tipoEfecto === 'formas'){ /*████Con tipoEfecto:"formas" tirás cuadraditos/círculos de colores (más "gráfico"); con "emoji" sigue funcionando como antes con los emojis que elegiste.████*/
      span.className = 'confeti-forma';
      const colores = EVENTO_ESPECIAL.coloresConfeti.length ? EVENTO_ESPECIAL.coloresConfeti : ['#B8935A'];
      span.style.background = colores[Math.floor(Math.random() * colores.length)];
      span.style.borderRadius = ['50%', '4px', '0'][Math.floor(Math.random() * 3)];
      const tam = 8 + Math.random() * 10;
      span.style.width = tam + 'px';
      span.style.height = tam + 'px';
    } else {
      span.className = 'confeti-pieza';
      const emojis = EVENTO_ESPECIAL.emojisConfeti.length ? EVENTO_ESPECIAL.emojisConfeti : ['🎉'];
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.fontSize = (16 + Math.random() * 14) + 'px';
    }
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    span.style.animationDelay = (Math.random() * 1.5) + 's';
    cont.appendChild(span);
  }
  setTimeout(() => { cont.innerHTML = ''; }, 5000);
}

  function mostrarEventoSiCorresponde(){
  if (!EVENTO_ESPECIAL.activo) return;
  if (EVENTO_ESPECIAL.fechaLimite){
    const limite = new Date(EVENTO_ESPECIAL.fechaLimite + 'T23:59:59');
    if (new Date() > limite) return;
  }
  if (sessionStorage.getItem('eventoCerrado')) return;

  const img = document.getElementById('eventoImg');
  if (EVENTO_ESPECIAL.imagen){ img.src = EVENTO_ESPECIAL.imagen; img.style.display = 'block'; }
  document.getElementById('eventoTitulo').textContent = EVENTO_ESPECIAL.titulo || '';
  document.getElementById('eventoMensaje').textContent = EVENTO_ESPECIAL.mensaje || '';
  document.getElementById('eventoOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (EVENTO_ESPECIAL.confeti) lanzarConfeti();

  // Botones: aparecen recién después de "retrasoBotones" segundos
  const botones = document.getElementById('eventoBotones');
  const btnContinuar = document.getElementById('eventoBtnContinuar');
  const btnPromo = document.getElementById('eventoBtnPromo');
  btnContinuar.textContent = EVENTO_ESPECIAL.textoBotonContinuar || 'Continuar';

  if (EVENTO_ESPECIAL.promoActivo && EVENTO_ESPECIAL.promoCategoria){
    btnPromo.textContent = EVENTO_ESPECIAL.textoBotonPromo || 'Ver promociones';
    btnPromo.style.display = 'flex';
    btnPromo.onclick = (e) => {
      e.preventDefault();
      cerrarEvento();
      activeFilter = EVENTO_ESPECIAL.promoCategoria; //█████ Con promoCategoria le decís qué categoría de tu planilla mostrar al tocar ese botón (tiene que escribirse igual que en la columna Categoria). Si promoActivo queda en false, ese botón directamente no aparece.
      renderGrid();
      renderChips(allCategories);
    };
  } else {
    btnPromo.style.display = 'none';
  }

  setTimeout(() => { botones.style.display = 'flex'; }, EVENTO_ESPECIAL.retrasoBotones * 1000);
}
/*===================================================================
		██████████FIN██████████
  ===================================================================*/



/* =====================================================================
   9) CONFIGURACIÓN GENERAL — LO QUE MÁS VAS A EDITAR
   =====================================================================
   Acá abajo poné los datos reales del emprendimiento y el link de
   tu planilla de Google Sheets. NO hace falta tocar nada de lo que
   está más abajo en el archivo, salvo que quieras cambiar el
   comportamiento del catálogo.
   ===================================================================== */

// ██████████ EDITAR ACÁ: LINK DE TU GOOGLE SHEETS ██████████
// 1) Abrí tu planilla en Google Sheets.
// 2) Arriba a la derecha, botón "Compartir" -> "Cualquier persona
//    con el enlace" -> rol "Lector". Copiá el link de la barra de
//    direcciones (el que empieza con https://docs.google.com/...).
// 3) Pegalo entre las comillas de ID_DE_TU_PLANILLA (solo la parte
//    del ID, que está entre /d/ y /edit en la URL).
const ID_PLANILLA = "1Zb3aLxARdDLp-4M5Nq8MKSYhVPN610REY78e-EIdYMs";
const GID_HOJA = "0"; // el número que aparece después de "gid=" en el link de tu planilla

// ██████████ EDITAR ACÁ: DATOS DE CONTACTO DEL PIE DE PÁGINA ██████████
// Completá cada dato. Si dejás un campo vacío (""), ese ícono
// directamente no se muestra en el pie de página.
const CONFIG_CONTACTO = {
  ciudadProvincia: "Marcos Juárez, Córdoba",  // Ej: "Rosario, Santa Fe"
  whatsappNumero: "5493472620577",            // Solo números, con código de país y área, sin +, sin espacios, sin guiones
  instagramUsuario: "ova.perfumeria",         // Sin la @ (ver nota abajo sobre el acento)
  facebookUsuario: "",                        // Nombre de tu página de Facebook (deja vacío si no tenés)
  twitterUsuario: "",                         // Sin la @ (deja vacío si no tenés)
  email: ""                                   // Tu email de contacto (deja vacío si no tenés)
};

/* =====================================================================
  ████ A partir de acá es el funcionamiento del catálogo. No hace falta
   tocar nada de lo de abajo salvo que quieras cambiar cómo trabaja.████
   ===================================================================== */

let PRODUCTOS = [];

function normalizar(texto){
  return (texto || "").toString().trim();
}

// Arma el pie de página con los íconos de contacto
function armarFooter(){
  document.getElementById("footer-ciudad").textContent = CONFIG_CONTACTO.ciudadProvincia || "";

  const contenedor = document.getElementById("footer-datos");
  contenedor.innerHTML = "";

  const iconos = {
    whatsapp: `<svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.55 3.7-8.24 8.25-8.24m-4.53 4.7c-.17 0-.44.06-.67.32-.23.25-.87.86-.87 2.09 0 1.22.9 2.4 1.02 2.57.12.17 1.75 2.67 4.25 3.73.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.28-.25-.13-1.47-.72-1.7-.8-.22-.08-.4-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.24-.4.08-.17.04-.32-.02-.44-.06-.13-.56-1.36-.78-1.86-.2-.48-.4-.42-.56-.43z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38C1.35 2.67.94 3.34.63 4.13c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84m0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4m6.41-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.2 8.2L23.3 22H16.7l-5.2-6.8L5.6 22H2.5l7.7-8.8L1.7 2h6.8l4.7 6.2zm-1.1 18h1.7L7.3 4H5.5z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m1.4 2 8.6 6.4L20.6 6zM3 18h18V7.1l-9 6.7-9-6.7z"/></svg>`
  };

  const items = [];

  if (CONFIG_CONTACTO.whatsappNumero){
    items.push({href: `https://wa.me/${CONFIG_CONTACTO.whatsappNumero}`, icono: iconos.whatsapp, texto: CONFIG_CONTACTO.whatsappNumero});
  }
  if (CONFIG_CONTACTO.instagramUsuario){
    items.push({href: `https://instagram.com/${CONFIG_CONTACTO.instagramUsuario}`, icono: iconos.instagram, texto: `@${CONFIG_CONTACTO.instagramUsuario}`});
  }
  if (CONFIG_CONTACTO.facebookUsuario){
    items.push({href: `https://facebook.com/${CONFIG_CONTACTO.facebookUsuario}`, icono: iconos.facebook, texto: CONFIG_CONTACTO.facebookUsuario});
  }
  if (CONFIG_CONTACTO.twitterUsuario){
    items.push({href: `https://x.com/${CONFIG_CONTACTO.twitterUsuario}`, icono: iconos.twitter, texto: `@${CONFIG_CONTACTO.twitterUsuario}`});
  }
  if (CONFIG_CONTACTO.email){
    items.push({href: `mailto:${CONFIG_CONTACTO.email}`, icono: iconos.email, texto: CONFIG_CONTACTO.email});
  }

  items.forEach(it => {
    const a = document.createElement("a");
    a.href = it.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "dato-contacto";
    a.innerHTML = `${it.icono}<span>${it.texto}</span>`;
    contenedor.appendChild(a);
  });
}

// Formatea precios como moneda argentina
function formatearPrecio(valor){
  const num = parseFloat(valor);
  if (isNaN(num) || num <= 0) return "A consultar";
  return "$" + num.toLocaleString("es-AR");
}

// Carga los productos desde Google Sheets usando JSONP (evita
// problemas de CORS cuando el catálogo está subido a Netlify)
function cargarProductos(){
  const url = `https://docs.google.com/spreadsheets/d/${ID_PLANILLA}/gviz/tq?tqx=out:json&gid=${GID_HOJA}`;
  const script = document.createElement("script");
  script.src = url;
  script.onerror = function(){
    document.getElementById("grilla-productos").innerHTML =
      '<div class="mensaje-vacio">No pudimos conectar con la planilla. Revisá el ID_DE_TU_PLANILLA y que esté compartida como "Cualquier persona con el enlace: Lector".</div>';
  };
  document.body.appendChild(script);
}

// Google devuelve la respuesta envuelta en esta función. Google
// Sheets llama automáticamente a la función que se llama
// "google.visualization.Query.setResponse", así que la definimos acá.
window.google = { visualization: { Query: { setResponse: procesarRespuestaSheets } } };

function procesarRespuestaSheets(data){
  try{
    const filas = data.table.rows;
    PRODUCTOS = filas.map((fila, idx) => {
      const c = fila.c;
      const val = i => (c[i] && c[i].v !== null && c[i].v !== undefined) ? c[i].v : "";
      const imagenes = [val(4), val(5), val(6)].map(normalizar).filter(x => x !== "");
      return {
        id: idx,
        marca: normalizar(val(0)),
        linea: normalizar(val(1)),
        categoria: normalizar(val(2)),
        nuevo: normalizar(val(3)).toLowerCase().startsWith("s"),
        imagenes: imagenes,
        descripcion: normalizar(val(7)),
        precioContado: val(8),
        precioTarjeta: val(9),
        cuotas: normalizar(val(10))
      };
    }).filter(p => p.marca !== "");
    renderizarProductos();
  }catch(e){
    document.getElementById("grilla-productos").innerHTML =
      '<div class="mensaje-vacio">Hubo un problema leyendo la planilla. Revisá que las columnas estén en el orden esperado.</div>';
  }
}

function renderizarProductos(){
  const grilla = document.getElementById("grilla-productos");
  const categoriaSeleccionada = document.getElementById("select-categoria").value;
  const busqueda = document.getElementById("buscador").value.trim().toLowerCase();

  let lista = PRODUCTOS.filter(p => {
    const coincideCategoria =
      categoriaSeleccionada === "todos" ? true :
      categoriaSeleccionada === "nuevos" ? p.nuevo :
      p.categoria === categoriaSeleccionada;
    const coincideBusqueda =
      busqueda === "" ||
      p.marca.toLowerCase().includes(busqueda) ||
      p.linea.toLowerCase().includes(busqueda);
    return coincideCategoria && coincideBusqueda;
  });

  if (lista.length === 0){
    grilla.innerHTML = '<div class="mensaje-vacio">No encontramos perfumes para esta búsqueda.</div>';
    return;
  }

  grilla.innerHTML = "";
  lista.forEach(p => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
      <div class="tarjeta-imagen">
        ${p.nuevo ? '<div class="etiqueta-nuevo">Nuevo ingreso</div>' : ''}
        <img src="${p.imagenes[0] || ''}" alt="${p.marca} ${p.linea}" loading="lazy">
      </div>
      <div class="tarjeta-info">
        <div class="tarjeta-marca">${p.marca}</div>
        <div class="tarjeta-linea">${p.linea}</div>
        <div class="tarjeta-categoria">${p.categoria}</div>
      </div>
    `;
    tarjeta.addEventListener("click", () => abrirModal(p));
    grilla.appendChild(tarjeta);
  });
}

let galeriaActual = [];

function abrirModal(p){
  document.getElementById("modal-marca").textContent = p.marca;
  document.getElementById("modal-linea").textContent = p.linea;
  document.getElementById("modal-categoria").textContent = p.categoria;
  document.getElementById("modal-descripcion").textContent = p.descripcion;
  document.getElementById("modal-precio-contado").textContent = formatearPrecio(p.precioContado);
  document.getElementById("modal-precio-tarjeta").textContent = formatearPrecio(p.precioTarjeta);
  document.getElementById("modal-cuotas").textContent = p.cuotas ? p.cuotas : "";

  galeriaActual = p.imagenes.length ? p.imagenes : [""];
  mostrarImagenGaleria(0);

  const miniaturas = document.getElementById("miniaturas-galeria");
  miniaturas.innerHTML = "";
  if (galeriaActual.length > 1){
    galeriaActual.forEach((img, i) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.className = i === 0 ? "activa" : "";
      thumb.addEventListener("click", () => mostrarImagenGaleria(i));
      miniaturas.appendChild(thumb);
    });
  }

  // Arma el mensaje pregrabado de WhatsApp con los datos del perfume
  const mensaje =
    `Buen día! Quería consultar por este perfume:\n` +
    `${p.marca} - ${p.linea}\n` +
    `Categoría: ${p.categoria}\n` +
    `Precio contado: ${formatearPrecio(p.precioContado)}`;
  const linkWhatsapp = `https://wa.me/${CONFIG_CONTACTO.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
  document.getElementById("modal-boton-whatsapp").href = linkWhatsapp;

  document.getElementById("modal-fondo").classList.add("activo");
  document.body.style.overflow = "hidden";
}

function mostrarImagenGaleria(indice){
  document.getElementById("modal-imagen-principal").src = galeriaActual[indice] || "";
  document.querySelectorAll(".miniaturas-galeria img").forEach((el, i) => {
    el.classList.toggle("activa", i === indice);
  });
}

function cerrarModal(){
  document.getElementById("modal-fondo").classList.remove("activo");
  document.body.style.overflow = "";
}

document.getElementById("modal-cerrar").addEventListener("click", cerrarModal);
document.getElementById("modal-fondo").addEventListener("click", (e) => {
  if (e.target.id === "modal-fondo") cerrarModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

document.getElementById("select-categoria").addEventListener("change", renderizarProductos);
document.getElementById("buscador").addEventListener("input", renderizarProductos);

document.getElementById("anio-actual").textContent = new Date().getFullYear();

armarFooter();
cargarProductos();
