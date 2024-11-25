document.addEventListener("DOMContentLoaded", function () {
    let presentesData = {};

    fetch('luizadealencar/wedding/frontend/presentes.json')
        .then(response => response.json())
        .then(data => {
            presentesData = data;
            renderizarPresentes(data);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));

    function renderizarPresentes(data) {
        const listaDePresentes = document.getElementById('lista-de-presentes');
        listaDePresentes.innerHTML = '';

        for (const categoria in data) {
            const titulo = document.createElement('h4');
            titulo.textContent = `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:`;
            listaDePresentes.appendChild(titulo);

            const ul = document.createElement('ul');
            data[categoria].forEach(presente => {
                const li = document.createElement('li');

                const link = document.createElement('a');
                link.href = presente.link;
                link.target = "_blank";

                const img = document.createElement('img');
                img.src = presente.imagem;
                img.alt = presente.nome;
                img.style.width = "100px";
                img.style.height = "100px";

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
    }

    function aplicarFiltro() {
        const nomeFiltro = document.getElementById('filtro-nome').value.toLowerCase();
        const precoMin = parseFloat(document.getElementById('filtro-preco-min').value) || 0;
        const precoMax = parseFloat(document.getElementById('filtro-preco-max').value) || Infinity;
        const ordenarPorPreco = document.querySelector('input[name="ordenar-preco"]:checked')?.value;

        const presentesFiltrados = {};
        for (const categoria in presentesData) {
            presentesFiltrados[categoria] = presentesData[categoria].filter(presente => {
                const nomeValido = presente.nome.toLowerCase().includes(nomeFiltro);
                const precoNumber = parseFloat(presente.preco.replace('R$', '').replace(',', '.'));
                const precoValido = precoNumber >= precoMin && precoNumber <= precoMax;
                return nomeValido && precoValido;
            });

            if (ordenarPorPreco === 'menor') {
                presentesFiltrados[categoria].sort((a, b) =>
                    parseFloat(a.preco.replace('R$', '').replace(',', '.')) - parseFloat(b.preco.replace('R$', '').replace(',', '.'))
                );
            } else if (ordenarPorPreco === 'maior') {
                presentesFiltrados[categoria].sort((a, b) =>
                    parseFloat(b.preco.replace('R$', '').replace(',', '.')) - parseFloat(a.preco.replace('R$', '').replace(',', '.'))
                );
            }
        }

        renderizarPresentes(presentesFiltrados);
    }

    document.getElementById('filtro-nome').addEventListener('input', aplicarFiltro);
    document.getElementById('filtro-preco-min').addEventListener('input', aplicarFiltro);
    document.getElementById('filtro-preco-max').addEventListener('input', aplicarFiltro);

    document.querySelectorAll('input[name="ordenar-preco"]').forEach(radio => {
        radio.addEventListener('change', aplicarFiltro);
    });

    document.getElementById("filtrar-btn").addEventListener("click", filtrarPresentes);
    document.getElementById("filtro-nome").addEventListener("input", filtrarPresentes);
    document.getElementById("filtro-preco-min").addEventListener("input", filtrarPresentes);
    document.getElementById("filtro-preco-max").addEventListener("input", filtrarPresentes);
    document.getElementById("filtro-area").addEventListener("change", filtrarPresentes);

    function filtrarPresentes() {
        const nomeFiltro = document.getElementById("filtro-nome").value.toLowerCase();
        const precoMin = parseFloat(document.getElementById("filtro-preco-min").value) || 0;
        const precoMax = parseFloat(document.getElementById("filtro-preco-max").value) || Infinity;
        const areaFiltro = document.getElementById("filtro-area").value;
        const ordenarPor = document.querySelector('input[name="ordenar-preco"]:checked')?.value;

        let presentesFiltrados = listaDePresentes.filter(presente => {
            const matchNome = presente.nome.toLowerCase().includes(nomeFiltro);
            const matchPreco = presente.preco >= precoMin && presente.preco <= precoMax;
            const matchArea = areaFiltro ? presente.area === areaFiltro : true;

            return matchNome && matchPreco && matchArea;
        });

        if (ordenarPor === "menor") {
            presentesFiltrados.sort((a, b) => a.preco - b.preco);
        } else if (ordenarPor === "maior") {
            presentesFiltrados.sort((a, b) => b.preco - a.preco);
        }

        exibirPresentes(presentesFiltrados);
    }
});
