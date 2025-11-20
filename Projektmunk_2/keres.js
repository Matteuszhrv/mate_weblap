const TEAMS = [
  { id: 1, name: 'Borsosgyőri ISE', time: "13:00", league: 'megye',  category: 'Férfi', city: 'Borsosgyőr', rating: 4.2 , logo: "Borsosgyőri ISE.jpg"},
  { id: 2, name: 'Frutti Drink–Perutz FC', time: "9:00", league: 'orszagos', category: 'u19', city: 'Sopron', rating: 4.6, logo: "Frutti-Drink Perutz FC.png"},
  { id: 3, name: 'Vanyola SE', time: "18:00", league: 'u19', category: 'Női', city: 'Vanyola', rating: 3.9, logo: "Vanyola SE.jpg"},
  { id: 4, name: 'Ugod SE', time: "13:00" ,league: 'megye', category: 'Női', city: 'Ugod', rating: 1.1, logo:"Ugod SE.jpg" },
  { id: 5, name: 'Csót SE', time: "21:00" ,league: 'megye', category: 'Férfi', city: 'Pécs', rating: 2.7, logo: "Csót SE.png" }
];


let sortType = 'relevance';

function renderTeams() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const league = document.getElementById('leagueSelect').value;
  const category = document.getElementById('categorySelect').value;
  const ido=document.getElementById('idopont').value;

  let results = TEAMS.filter(t => {
    return (
      (!query || t.name.toLowerCase().includes(query) || t.city.toLowerCase().includes(query)) &&
      (!league || t.league === league) &&
      (!category || t.category === category) &&
      (!ido || t.time===ido)
    );
  });

  if (sortType === 'rating') results.sort((a,b) => b.rating - a.rating);
  if (sortType === 'name') results.sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById('count').textContent = `Találatok: ${results.length}`;

  const div = document.getElementById('results');
  div.innerHTML = '';

  if (results.length === 0) {
    div.innerHTML = '<p>Nincs találat.</p>';
    return;
  }

  results.forEach(t => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class=team-logo><img src="${t.logo}" alt="${t.nev} logó"></div>
      <div>
        <strong>${t.name}</strong><br>
        <span>${t.city} • ${t.time} • ${t.league} • ${t.category}</span>
      </div>
      <div style="margin-left:auto;">${t.rating}★</div>
    `;
    div.appendChild(card);
  });
}

function setSort(type) {
  sortType = type;
  renderTeams();
}

document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', renderTeams));
renderTeams();
