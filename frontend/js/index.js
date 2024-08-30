function countdown() {
    const weddingDate = new Date('2025-12-06T00:00:00');
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
  
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  });

  
  document.addEventListener("DOMContentLoaded", function() {
    console.log("ENTREI AQUI");
    fetch('presentes.json')
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

document.getElementById('rsvpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const attendance = document.getElementById('attendance').value;

  if (name && email && attendance) {
      const responseMessage = document.getElementById('responseMessage');

      if (attendance === 'sim') {
          responseMessage.textContent = `Obrigado por confirmar sua presença, ${name}! Estamos ansiosos para vê-lo(a).`;
          responseMessage.style.color = "green";
      } else {
          responseMessage.textContent = `Lamentamos que você não possa comparecer, ${name}.`;
          responseMessage.style.color = "red";
      }

      document.getElementById('rsvpForm').reset();
  }
});

