// scripts.js
// Versi rapi dan modular untuk: jam digital, ambil jadwal sholat (Aladhan), dan tampilkan amalan.

// Tunggu sampai DOM siap sebelum memanipulasi elemen
document.addEventListener('DOMContentLoaded', () => {
  startClock();
  getJadwalSholat(); // panggil sekarang (mengambil bulan & tahun sekarang secara default)
});

/* -------------------------
   Jam digital
   ------------------------- */
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const clockEl = document.getElementById('digitalClock');
  if (!clockEl) return; // aman jika elemen tidak ada
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

function startClock() {
  updateClock(); // tampilkan segera
  setInterval(updateClock, 1000);
}

/* -------------------------
   Ambil jadwal sholat (Aladhan API)
   - Default: Jakarta, ID
   - Jika year/month tidak disediakan, gunakan tanggal sekarang
   ------------------------- */
async function getJadwalSholat({ city = 'Jakarta', country = 'ID', year, month } = {}) {
  try {
    const now = new Date();
    const qYear = year || now.getFullYear();
    const qMonth = month || now.getMonth() + 1; // getMonth() 0-11

    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
      city
    )}&country=${encodeURIComponent(country)}&method=2&month=${qMonth}&year=${qYear}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.timings) {
      const timings = data.data.timings;
      setJadwalToDOM({
        subuh: timings.Fajr,
        dzuhur: timings.Dhuhr,
        ashar: timings.Asr,
        maghrib: timings.Maghrib,
        isya: timings.Isha,
      });
      displayAmalan();
    } else {
      throw new Error('Response dari API tidak berisi data jadwal yang valid.');
    }
  } catch (err) {
    console.error('Error fetching jadwal sholat:', err);
    setJadwalToDOM({
      subuh: '—',
      dzuhur: '—',
      ashar: '—',
      maghrib: '—',
      isya: '—',
    });
  }
}

function setJadwalToDOM({ subuh, dzuhur, ashar, maghrib, isya }) {
  const map = { subuh, dzuhur, ashar, maghrib, isya };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '—';
  });
}

/* -------------------------
   Tampilkan amalan setelah sholat
   - Dibangun dari array agar lebih rapi
   ------------------------- */
function displayAmalan() {
  const amalanList = document.getElementById('amalanList');
  if (!amalanList) return;

  const items = [
    {
      title: 'Dzikir Subuh',
      arabic: 'اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري',
      latin: "Allahumma 'afini fi badanī, Allahumma 'afini fi sam'ī, Allahumma 'afini fi baṣarī",
      meaning: 'Ya Allah, anugerahkanlah kesehatan pada tubuhku, pendengaranku, dan penglihatanku.',
    },
    {
      title: 'Dzikir Dzuhur',
      arabic: 'سبحان الله والحمد لله ولا إله إلا الله والله أكبر',
      latin: 'Subḥānallāh wal-ḥamdu lillāh wa lā ilāha illallāh wa Allāhu Akbar',
      meaning: 'Mahasuci Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah, dan Allah Maha Besar.',
    },
    {
      title: 'Dzikir Ashar',
      arabic: 'اللهم إني أسالك خير هذا اليوم وخير ما فيه، ونعوذ بك من شره وشر ما فيه',
      latin:
        "Allahumma innī as'aluka khayra hādhā al-yawm wa khayra mā fīhi, wa na'ūdhu bika min sharrihī wa sharri mā fīhi",
      meaning:
        'Ya Allah, aku mohon kebaikan hari ini dan segala kebaikan yang ada padanya, serta berlindung dari keburukan hari ini dan keburukannya.',
    },
    {
      title: 'Dzikir Maghrib',
      arabic: 'اللهم إني أسالك من فضلك ونعيمك',
      latin: 'Allahumma innī as\'aluka min faḍlik wa na\'īmik',
      meaning: 'Ya Allah, aku memohon kepada-Mu dari kemurahan-Mu dan kenikmatan-Mu.',
    },
    {
      title: 'Dzikir Isya',
      arabic:
        'اللهم إني أسالك خير ما في هذه الليلة وما بعدها، ونعوذ بك من شر هذه الليلة وما بعدها',
      latin:
        "Allahumma innī as'aluka khayra mā fī hādhihi al-laylah wamā ba'dahā, wa na'ūdhu bika min sharri hādhihi al-laylah wamā ba'dahā",
      meaning:
        'Ya Allah, aku mohon kebaikan malam ini dan yang akan datang, serta berlindung dari keburukan malam ini dan yang akan datang.',
    },
  ];

  // Bangun HTML sekali saja
  const html = items
    .map(
      (it) => `
      <li>
        <strong>${escapeHtml(it.title)}:</strong><br>
        <em>${escapeHtml(it.arabic)}</em><br>
        <small><b>Latin:</b> ${escapeHtml(it.latin)}</small><br>
        <small>${escapeHtml(it.meaning)}</small>
      </li>
    `
    )
    .join('\n');

  amalanList.innerHTML = html;
}

// Sedikit helper untuk menghindari injeksi pada teks (meskipun konten statis)
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
