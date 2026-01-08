// Fungsi untuk menampilkan jam digital
function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    
    var clock = document.getElementById('digitalClock');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update jam digital setiap detik
setInterval(updateClock, 1000);
updateClock(); // Panggil sekali di awal untuk menampilkan waktu segera

// Fungsi untuk mengambil Jadwal Sholat menggunakan API Aladhan
async function getJadwalSholat() {
    const city = 'Jakarta';  // Ganti dengan kota yang kamu inginkan
    const country = 'ID';    // ID untuk Indonesia
    const year = 2026;       // Tahun yang ingin diambil jadwalnya
    const month = 3;         // Bulan (contoh: Maret, bisa diubah sesuai kebutuhan)

    // URL API Aladhan untuk Jadwal Sholat
    const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&month=${month}&year=${year}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 200) {
            const timings = data.data.timings;
            // Menampilkan jadwal sholat di halaman
            document.getElementById('subuh').textContent = timings.Fajr;
            document.getElementById('dzuhur').textContent = timings.Dhuhr;
            document.getElementById('ashar').textContent = timings.Asr;
            document.getElementById('maghrib').textContent = timings.Maghrib;
            document.getElementById('isya').textContent = timings.Isha;

            // Menampilkan Amalan Setelah Sholat
            displayAmalan();
        }
    } catch (error) {
        console.error('Error fetching jadwal sholat:', error);
    }
}

// Fungsi untuk menampilkan amalan setelah sholat
function displayAmalan() {
    const amalanList = document.getElementById('amalanList');
    amalanList.innerHTML = ""; // Clear previous list

    // Amalan setelah sholat subuh
    amalanList.innerHTML += `
        <li>Dzikir Subuh: 
            <em>اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري</em><br>
<br>          <b>  <small>Latin: Allahumma 'afini fi badanī, Allahumma 'afini fi sam'ī, Allahumma 'afini fi baṣarī</small><br>
<br></b>
            <small>Artinya: Ya Allah, anugerahkanlah kesehatan pada tubuhku, pendengaranku, dan penglihatanku.</small>
        </li>
    `;

    // Amalan setelah sholat dzuhur
    amalanList.innerHTML += `
        <li>Dzikir Dzuhur: 
            <em>سبحان الله والحمد لله ولا إله إلا الله والله أكبر</em><br>
      <b>    <br>  <small>Latin: Subḥānallāh wal-ḥamdu lillāh wa lā ilāha illallāh wa Allāhu Akbar</small><br>
<br></b>
            <small>Artinya: Mahasuci Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah, dan Allah Maha Besar.</small>
        </li>
    `;

    // Amalan setelah sholat ashar
    amalanList.innerHTML += `
        <li>Dzikir Ashar: 
            <em>اللهم إني أسالك خير هذا اليوم وخير ما فيه، ونعوذ بك من شره وشر ما فيه</em><br>
<br> 
          <b>  <small>Latin: Allahumma innī as'aluka khayra hādhā al-yawm wa khayra mā fīhi, wa na'ūdhu bika min sharrihī wa sharri mā fīhi</small><br>
<br></b>
            <small>Artinya: Ya Allah, aku mohon kebaikan hari ini dan segala kebaikan yang ada padanya, serta berlindung dari keburukan hari ini dan keburukannya.</small>
        </li>
    `;

    // Amalan setelah sholat maghrib
    amalanList.innerHTML += `
        <li>Dzikir Maghrib: 
            <em>اللهم إني أسالك من فضلك ونعيمك</em><br>
<br>      <b>      <small>Latin: Allahumma innī as'aluka min faḍlik wa na'īmik</small><br>
<br></b>
            <small>Artinya: Ya Allah, aku memohon kepada-Mu dari kemurahan-Mu dan kenikmatan-Mu.</small>
        </li>
    `;

    // Amalan setelah sholat isya
    amalanList.innerHTML += `
        <li>Dzikir Isya: 
            <em>اللهم إني أسالك خير ما في هذه الليلة وما بعدها، ونعوذ بك من شر هذه الليلة وما بعدها</em><br>
          <b>  <br><small>Latin: Allahumma innī as'aluka khayra mā fī hādhihi al-laylah wamā ba'dahā, wa na'ūdhu bika min sharri hādhihi al-laylah wamā ba'dahā</small><br>
<br></b>
			<small>Artinya: Ya Allah, aku mohon kebaikan malam ini dan yang akan datang, serta berlindung dari keburukan malam ini dan yang akan datang.</small>
        </li>
    `;
}

// Panggil fungsi untuk mengambil Jadwal Sholat dan Jam Digital
getJadwalSholat();
