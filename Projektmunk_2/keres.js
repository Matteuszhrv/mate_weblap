const TEAMS = [
  { id: 1, name: 'Borsosgyőri ISE', time: "13:00", league: 'megye',  category: 'Férfi', city: 'Pápa-Borsosgyőr', rating: 4.2 , logo: "Borsosgyőri ISE.jpg"},
  { id: 2, name: 'Frutti Drink–Perutz FC', time: "9:00", league: 'orszagos', category: 'u19', city: 'Pápa', rating: 4.6, logo: "Frutti-Drink Perutz FC.png"},
  { id: 3, name: 'Vanyola SE', time: "18:00", league: 'u19', category: 'Női', city: 'Vanyola', rating: 3.9, logo: "Vanyola SE.jpg"},
  { id: 4, name: 'Ugod SE', time: "13:00" ,league: 'megye', category: 'Női', city: 'Ugod', rating: 1.1, logo:"Ugod SE.jpg" },
  { id: 5, name: 'Csót SE', time: "21:00" ,league: 'megye', category: 'Férfi', city: 'Csót', rating: 2.7, logo: "Csót SE.png" },
  { id: 6, name: 'Adászteveli SE', time: "9:00" ,league: 'megye', category: 'Férfi', city: 'Adásztevel', rating: 2.9, logo: "Adászteveli SE.png" },
  { id: 7, name: 'Bakonytamási TC', time: "9:00" ,league: 'u19', category: 'Női', city: 'Bakonytamási', rating: 3.7, logo: "Bakonytamási TC.png" },
  { id: 8, name: 'Kéttornyúlak SE', time: "21:00" ,league: 'megye', category: 'Férfi', city: 'Pápa-Kéttornyúlak', rating: 1.8, logo: "Kéttornyúlak SE.jpg" },
  { id: 9, name: 'Úrkút SE', time: "21:00" ,league: 'orszagos', category: 'Férfi', city: 'Úrkút', rating: 4.1, logo: "Úrkút SE.png" },
  { id: 10, name: 'Nemesgörzsönyi SE', time: "18:00" ,league: 'orszagos', category: 'Női', city: 'Nemesgörzsöny', rating: 2.1, logo: "Nemesgörzsönyi SE.jpg" },
  { id: 11, name: 'Mezőlak SE', time: "13:00" ,league: 'megye', category: 'Férfi', city: 'Mezőlak', rating: 2.5, logo: "Mezőlak SE.jpg" },
  { id: 12, name: 'Devecser SE', time: "13:00" ,league: 'megye', category: 'Női', city: 'Devecser', rating: 4.3, logo: "Devecser SE.png" },
  { id: 13, name: 'Marcalgergelyi SE', time: "21:00" ,league: 'megye', category: 'Férfi', city: 'Marcalgergelyi', rating: 2.9, logo: "Marcalgergelyi SE.jpg" },
  { id: 14, name: 'Lovászpatona SE', time: "13:00" ,league: 'orszagos', category: 'Férfi', city: 'Lovászpatona', rating: 3.3, logo: "Lovászpatona SE.jpg" },
  { id: 15, name: 'Balatonalmádi SE', time: "18:00" ,league: 'orszagos', category: 'u19', city: 'Balatonalmádi', rating: 4.1, logo: "Balatonalmádi SE.jpg" },
  { id: 16, name: 'Várpalotai BSK', time: "9:00" ,league: 'orszagos', category: 'u19', city: 'Várpalota', rating: 4.5, logo: "Várpalotai BSK.jpg" },
  { id: 17, name: 'Tapolcafői SE', time: "9:00" ,league: 'megye', category: 'Férfi', city: 'Pápa-Tapolcafő', rating: 2.5, logo: "Tapolcafői SE.png" },
  { id: 18, name: 'Takácsi SE', time: "18:00" ,league: 'megye', category: 'Férfi', city: 'Takácsi', rating: 2.1, logo:"Takácsi SE.jpg" },
  { id: 19, name: 'Hárskút SE', time: "13:00" ,league: 'orszagos', category: 'Férfi', city: 'Hárskút', rating: 1.1, logo:"Hárskút SE.jpg" },
  { id: 20, name: 'Nagytevel SE', time: "21:00" ,league: 'megye', category: 'Férfi', city: 'Nagytevel', rating: 2.6, logo:"Nagytevel SE.jpg" },
  { id: 21, name: 'Adorjánháza SE', time: "13:00" ,league: 'megye', category: 'Női', city: 'Adorjánháza', rating: 1.2, logo:"Adorjánháza SE.jpg" }
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
