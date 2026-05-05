const listaIPs = [];
const btn = document.querySelector('#btnGetIp');
const input = document.querySelector('#inputIpAddress');
const tabela = document.querySelector('#ipTable');

btn.addEventListener('click', adicionarIP);
input.addEventListener('keypress', e => e.key === 'Enter' && adicionarIP());

function adicionarIP() {
  const ip = input.value.trim();

  if (!ip) {
    document.querySelector('#alert-info').innerHTML =
      `<div class="alert alert-warning">Digite um IP válido</div>`;
    return;
  }

  // evita duplicado
  if (listaIPs.some(item => item.ip === ip)) return;

  if (listaIPs.length === 0) {
    document.querySelector('.tabela').style.display = 'block';
    tabela.innerHTML = `
      <thead>
        <tr>
          <th>IP</th><th>Org</th><th>Country</th><th>City</th><th>Clear</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
  }

  fetch(`https://ipinfo.io/${ip}/json?token=ea38c5437881ca`)
    .then(r => r.json())
    .then(data => {
      const novo = {
        ip: data.ip || '-',
        org: data.org ? data.org.split(' ').slice(1).join(' ') : '-',
        country: data.country || '-',
        city: data.city || '-'
      };

      listaIPs.push(novo);
      atualizarTabela();
      input.value = '';
    });
}

function atualizarTabela() {
  const tbody = tabela.querySelector('tbody');

  tbody.innerHTML = listaIPs
    .map((item, i) => `
      <tr>
        <td>${item.ip}</td>
        <td>${item.org}</td>
        <td>${item.country}</td>
        <td>${item.city}</td>
        <td><button onclick="removerIP(${i})">✖</button></td>
      </tr>
    `)
    .join('');
}

function removerIP(index) {
  listaIPs.splice(index, 1);
  atualizarTabela();
}