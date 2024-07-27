document.addEventListener("DOMContentLoaded", function() {
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

                    // const preco = document.createElement('p');
                    // preco.textContent = presente.preco;

                    link.appendChild(img);
                    li.appendChild(link);
                    li.appendChild(nome);
                    // li.appendChild(preco);
                    ul.appendChild(li);
                });
                listaDePresentes.appendChild(ul);
            }
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});
