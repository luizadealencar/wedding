function countdown() {
  const weddingDate = new Date('2025-11-26T00:00:00');
  const currentDate = new Date();

  const totalSeconds = (weddingDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  document.getElementById('countdown').innerHTML = `
      <div>${days} Dias</div>
      <div>${hours} Horas</div>
      <div>${minutes} Minutos</div>
      <div>${seconds} Segundos</div>
    `;
}

countdown();
setInterval(countdown, 1000);

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
  });
}

// Next slide
function nextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}

// Previous slide
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalSlides - 1;
  }
  showSlide(currentIndex);
}

// Automatic slide change
setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

});


document.addEventListener("DOMContentLoaded", function () {
  console.log("ENTREI AQUI");
  fetch('../json/presentes.json')
    .then(response => {
      console.log("response", response);
      return response.json();
    })
    .then(data => {
      console.log("data", data);
      const listaDePresentes = document.getElementById('lista-de-presentes');
      for (const categoria in data) {
        const titulo = document.createElement('h4');
        titulo.textContent = `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:`;
        listaDePresentes.appendChild(titulo);

        const ul = document.createElement('ul');
        data[categoria].forEach(presente => {
          const li = document.createElement('li');

          const link = document.createElement('a');
          link.href = presente.link;
          link.target = "_blank"; // Para abrir o link em uma nova aba

          const img = document.createElement('img');
          img.src = presente.imagem;
          img.alt = presente.nome;
          img.style.width = "100px"; // Ajuste conforme necessário
          img.style.height = "100px"; // Ajuste conforme necessário

          const nome = document.createElement('p');
          nome.textContent = presente.nome;

          const preco = document.createElement('p');
          preco.textContent = presente.preco;

          link.appendChild(img);
          li.appendChild(link);
          li.appendChild(nome);
          li.appendChild(preco);
          ul.appendChild(li);
        });
        listaDePresentes.appendChild(ul);
      }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
});

document.getElementById("rsvpForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const attendance = document.getElementById("attendance").value;

  if (name && email && attendance) {
    const message = `Obrigada, ${name}! Sua resposta (${attendance}) foi registrada.`;
    document.getElementById("responseMessage").textContent = message;
  } else {
    document.getElementById("responseMessage").textContent = "Por favor, preencha todos os campos.";
  }
});

function toggleGuestInput() {
  const bringGuests = document.getElementById("bringGuests").value;
  const guestNamesInput = document.getElementById("guestNamesInput");

  if (bringGuests === "sim") {
    guestNamesInput.style.display = "flex";
    guestNamesInput.style.flexDirection = "column";
  } else {
    guestNamesInput.style.display = "none";
  }
}

function enviarConfirmacao() {
  const nome = document.getElementById("name").value;
  const bringGuests = document.getElementById("bringGuests").value;
  const guestNamesInput = document.getElementById("guestNames").value;
  const attendance = document.getElementById("attendance").value;
  let mensagem = "";

  if (attendance === "sim") {
    let guestMessage = "";

    if (bringGuests === "sim" && guestNamesInput) {
      const guestNames = guestNamesInput.split(',').map(name => name.trim()).filter(name => name !== "");
      if (guestNames.length > 0) {
        guestMessage = ` Estarei acompanhado(a) de ${guestNames.join(", ")}.`;
      }
    }

    mensagem = `Olá, sou ${nome} e confirmo minha presença no casamento!${guestMessage}`;
  } else if (attendance === "nao") {
    mensagem = `Olá, sou ${nome}, infelizmente não poderei comparecer ao casamento.`;
  }

  const encodedMessage = encodeURIComponent(mensagem);
  const whatsappUrl = `https://wa.me/27999335530?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  document.getElementById("responseMessage").innerHTML = "Obrigado por confirmar!";
}

// Lógica para deslizar o carrossel
let carousel = document.querySelector('.carousel');
let index = 0;
let totalItems = document.querySelectorAll('.carousel-item').length;

function slideCarousel() {
  // A cada 3 segundos, mover uma imagem para a esquerda
  carousel.style.transform = `translateX(-${index * 100}%)`;
  index = (index + 1) % totalItems;
}

// Iniciar o carrossel
setInterval(slideCarousel, 3000); // 3 segundos de intervalo

