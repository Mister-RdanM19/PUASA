// scripts.js - digital clock, jadwal sholat (sample), dan amalan list
function updateClock(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('digitalClock').textContent = `${hh}:${mm}:${ss}`;
}

// Sample fixed jadwal sesuai screenshot (ubah sesuai lokasi/waktu nyata jika ingin dynamic)
const jadwal = {
  subuh: '04:43',
  dzuhur: '11:59',
  ashar: '15:25',
  maghrib: '18:13',
  isya: '19:15'
};

function renderJadwal(){
  document.getElementById('subuh').textContent = jadwal.subuh;
  document.getElementById('dzuhur').textContent = jadwal.dzuhur;
  document.getElementById('ashar').textContent = jadwal.ashar;
  document.getElementById('maghrib').textContent = jadwal.maghrib;
  document.getElementById('isya').textContent = jadwal.isya;
}

// Amalan setelah sholat (contoh isi berdasarkan screenshot)
const amalan = [
  {
    title: 'Dzikir Subuh',
    arab: 'اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري',
    latin: "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basa>ri",
    arti: 'Ya Allah, anugerahkanlah kesehatan pada tubuhku, pendengaranku, dan penglihatanku.'
  },
  {
    title: 'Dzikir Dzuhur',
    arab: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَر',
    latin: 'Subḥānallāh wal-ḥamdu lillāh wa lā ilāha illallāh wa Allāhu Akbar',
    arti: 'Mahasuci Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah, dan Allah Maha Besar.'
  },
  {
    title: 'Dzikir Ashar',
    arab: 'اللهم إني أسألك خير هذا اليوم وخير مافيه، وأعوذ بك من شره وشر مافيه',
    latin: "Allahumma innî as'aluka khayra hādhā al-yawm wa khayra mā fihi, wa na'udhu bika min sharrihi wa sharri mā fihi",
    arti: 'Ya Allah, aku mohon kebaikan hari ini dan segala kebaikan yang ada padanya, serta berlindung dari keburukan hari ini dan keburukannya.'
  }
];

function renderAmalan(){
  const ul = document.getElementById('amalanList');
  ul.innerHTML = '';
  amalan.forEach(item =>{
    const li = document.createElement('li');
    li.innerHTML = `\n      <strong>• ${item.title}:</strong> <span class="arabic">${item.arab}</span>\n      <span class="latin">Latin: ${item.latin}</span>\n      <span class="arti">Artinya: ${item.arti}</span>`;
    ul.appendChild(li);
  });
}

// init
renderJadwal();
renderAmalan();
updateClock();
setInterval(updateClock,1000);
