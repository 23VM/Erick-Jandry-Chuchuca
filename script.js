document.addEventListener("DOMContentLoaded", () => {
    
    // PARTÍCULAS (Estilo chispas tecnológicas/cancha sintética)
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#22c55e", "#3b82f6", "#ffffff"] },
            "shape": { "type": "edge" }, // Cuadrados pequeños tipo píxeles o chispas
            "opacity": { "value": 0.5, "anim": { "enable": true, "speed": 2, "opacity_min": 0.1 } },
            "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 4, "size_min": 1 } },
            "line_linked": { "enable": true, "distance": 120, "color": "#334155", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "out_mode": "out" }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false } },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
        },
        "retina_detect": true
    });

    // NAVEGACIÓN
    const btnComenzar = document.getElementById("btn-comenzar");
    const btnVolver = document.getElementById("btn-volver");
    const sectionCaratula = document.getElementById("section-caratula");
    const sectionDetalles = document.getElementById("section-detalles");

    btnComenzar.addEventListener("click", () => {
        sectionCaratula.classList.remove("active-page");
        sectionCaratula.classList.add("hidden-page");
        setTimeout(() => {
            sectionDetalles.classList.remove("hidden-page");
            sectionDetalles.classList.add("active-page");
        }, 400); 
    });

    btnVolver.addEventListener("click", () => {
        sectionDetalles.classList.remove("active-page");
        sectionDetalles.classList.add("hidden-page");
        setTimeout(() => {
            sectionCaratula.classList.remove("hidden-page");
            sectionCaratula.classList.add("active-page");
        }, 400);
    });

    // =================================================================
    // DATOS DE LOS INTEGRANTES (Pon el nombre de tus imágenes aquí)
    // =================================================================
    const players = [
        { 
            name: "Erick Samartín", 
            photo: "foto_erick.jpg",   
            qr: "qr_erick.png"         
        },
        { 
            name: "Snnider Chuchuca", 
            photo: "foto_snnider.jpg",   
            qr: "qr_snnider.png"         
        },
        { 
            name: "Jandry Davila", 
            photo: "foto_jandry.jpg", 
            qr: "qr_jandry.png"       
        }
    ];

    const playerBtns = document.querySelectorAll(".player-btn");
    const playerCard = document.getElementById("player-card");
    
    const cardNameEl = document.getElementById("card-name");
    const cardPhotoEl = document.getElementById("card-photo");
    const cardQrEl = document.getElementById("card-qr");

    // LÓGICA DE TRANSICIÓN TIPO BALÓN PATEADO
    playerBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.classList.contains("active-player")) return; // Evita animar si ya está seleccionado

            // Marcar botón activo
            playerBtns.forEach(b => b.classList.remove("active-player"));
            btn.classList.add("active-player");

            // 1. Iniciar animación de "Patada afuera"
            playerCard.classList.remove("kick-in");
            playerCard.classList.add("kick-out");

            // 2. Esperar a que salga la tarjeta volando para cambiar datos
            setTimeout(() => {
                const index = btn.getAttribute("data-index");
                const data = players[index];

                cardNameEl.textContent = data.name;
                
                cardPhotoEl.src = data.photo;
                cardPhotoEl.setAttribute("data-caption", `Perfil: ${data.name}`);
                
                cardQrEl.src = data.qr;
                cardQrEl.setAttribute("data-caption", `QR de ${data.name}`);

                // 3. Quitar animación de salida y poner la de "Patada de entrada"
                playerCard.classList.remove("kick-out");
                playerCard.classList.add("kick-in");

                // 4. Limpiar la clase de entrada después de que termine
                setTimeout(() => {
                    playerCard.classList.remove("kick-in");
                }, 600); // 600ms es lo que dura kickBallIn en CSS

            }, 450); // 450ms (un poco menos de lo que dura kickBallOut para no dejar huecos)
        });
    });

    // MODAL DE ZOOM DEPORTIVO
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("imagen-ampliada");
    const captionText = document.getElementById("caption");
    
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("zoom-trigger")) {
            modal.classList.add("show");
            modalImg.src = e.target.src;
            captionText.innerText = e.target.getAttribute("data-caption");
        }
    });

    document.querySelector(".close-modal").addEventListener("click", () => modal.classList.remove("show"));
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("show"); });
});