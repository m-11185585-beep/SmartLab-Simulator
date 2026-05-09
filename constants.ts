
import { Experiment, FormLevel, Quiz, Translation } from './types';

export const LABELS: Translation = {
  welcome: { en: "Welcome to SmartLab", ms: "Selamat Datang ke SmartLab" },
  enterName: { en: "Enter your name", ms: "Masukkan nama anda" },
  start: { en: "Start Learning", ms: "Mula Belajar" },
  form: { en: "Form", ms: "Tingkatan" },
  quiz: { en: "Quiz", ms: "Kuiz" },
  achievements: { en: "Achievements", ms: "Pencapaian" },
  library: { en: "Library", ms: "Perpustakaan" },
  profile: { en: "Profile", ms: "Profil" },
  settings: { en: "Settings", ms: "Tetapan" },
  biology: { en: "Biology", ms: "Biologi" },
  physics: { en: "Physics", ms: "Fizik" },
  chemistry: { en: "Chemistry", ms: "Kimia" },
  manipulated: { en: "Manipulated Variable", ms: "Pembolehubah Dimanipulasi" },
  responding: { en: "Responding Variable", ms: "Pembolehubah Bergerak Balas" },
  controlled: { en: "Controlled Variable", ms: "Pembolehubah Dimalarkan" },
  tryAgain: { en: "Reset Simulation", ms: "Tetapkan Semula" },
  nextExp: { en: "Finish Experiment", ms: "Selesai Eksperimen" },
  objective: { en: "Objective", ms: "Objektif" },
  conclusion: { en: "Conclusion", ms: "Kesimpulan" },
  steps: { en: "Procedures", ms: "Prosedur" },
  xp: { en: "XP", ms: "XP" },
  level: { en: "Level", ms: "Tahap" },
  selectSubject: { en: "Select Subject", ms: "Pilih Subjek" },
  back: { en: "Back", ms: "Kembali" }
};

export const EXPERIMENTS: Experiment[] = [
  // --- FORM 1 ---
  {
    id: 'f1-cells',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Cell Structure", ms: "Struktur Sel" },
    objective: { en: "To compare plant and animal cells.", ms: "Membandingkan sel tumbuhan dan sel haiwan." },
    variables: {
      manipulated: { en: "Type of Cell", ms: "Jenis Sel" },
      responding: { en: "Presence of Cell Wall/Chloroplast", ms: "Kehadiran Dinding Sel/Kloroplas" },
      controlled: { en: "Magnification power", ms: "Kuasa pembesaran" }
    },
    steps: { 
      en: ["Select 'Animal' or 'Plant' cell.", "Observe the shape and organelles.", "Identify unique features."], 
      ms: ["Pilih sel 'Haiwan' atau 'Tumbuhan'.", "Perhatikan bentuk dan organel.", "Kenal pasti ciri-ciri unik."] 
    },
    conclusion: { 
      en: "Plant cells have a fixed shape, cell wall, and chloroplasts. Animal cells do not.", 
      ms: "Sel tumbuhan mempunyai bentuk tetap, dinding sel, dan kloroplas. Sel haiwan tidak." 
    },
    simulation: {
      type: 'cell',
      defaultValues: { type: 1 }, // 0: Animal, 1: Plant
      labels: { type: "Cell Type (0=Animal, 1=Plant)" },
      minMax: { type: [0, 1] }
    }
  },
  {
    id: 'f1-photo-basic',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Photosynthesis Requirements", ms: "Keperluan Fotosintesis" },
    objective: { en: "To investigate the factors needed for photosynthesis.", ms: "Mengkaji faktor yang diperlukan untuk fotosintesis." },
    variables: {
      manipulated: { en: "Light Intensity & CO2", ms: "Keamatan Cahaya & CO2" },
      responding: { en: "Oxygen production", ms: "Penghasilan Oksigen" },
      controlled: { en: "Type of plant", ms: "Jenis tumbuhan" }
    },
    steps: { 
      en: ["Adjust light intensity and CO2 levels.", "Observe the rate of bubbles produced."], 
      ms: ["Laraskan keamatan cahaya dan tahap CO2.", "Perhatikan kadar gelembung yang terhasil."] 
    },
    conclusion: { 
      en: "Photosynthesis requires both light and Carbon Dioxide to produce Oxygen.", 
      ms: "Fotosintesis memerlukan cahaya dan Karbon Dioksida untuk menghasilkan Oksigen." 
    },
    simulation: {
      type: 'growth',
      defaultValues: { light: 50, co2: 50 },
      labels: { light: "Light Intensity", co2: "CO2 Level" },
      minMax: { light: [0, 100], co2: [0, 100] }
    }
  },
  {
    id: 'f1-states',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "States of Matter", ms: "Keadaan Jirim" },
    objective: { en: "To observe the physical changes of water.", ms: "Memerhati perubahan fizikal air." },
    variables: {
      manipulated: { en: "Temperature", ms: "Suhu" },
      responding: { en: "State of Matter (Solid/Liquid/Gas)", ms: "Keadaan Jirim (Pepejal/Cecair/Gas)" },
      controlled: { en: "Amount of water", ms: "Jumlah air" }
    },
    steps: { 
      en: ["Increase the temperature slider.", "Observe the arrangement and movement of particles."], 
      ms: ["Tingkatkan peluncur suhu.", "Perhatikan susunan dan pergerakan zarah."] 
    },
    conclusion: { 
      en: "Heat causes particles to move faster, changing state from Solid to Liquid to Gas.", 
      ms: "Haba menyebabkan zarah bergerak lebih pantas, mengubah keadaan dari Pepejal ke Cecair ke Gas." 
    },
    simulation: {
      type: 'states',
      defaultValues: { temp: -10 },
      labels: { temp: "Temperature (°C)" },
      minMax: { temp: [-20, 120] }
    }
  },
  {
    id: 'f1-density-basic',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Density of Objects", ms: "Ketumpatan Objek" },
    objective: { en: "To determine why objects float or sink.", ms: "Menentukan mengapa objek terapung atau tenggelam." },
    variables: {
      manipulated: { en: "Density of Object", ms: "Ketumpatan Objek" },
      responding: { en: "Position in water", ms: "Kedudukan dalam air" },
      controlled: { en: "Density of water (1 g/cm³)", ms: "Ketumpatan air (1 g/cm³)" }
    },
    steps: { 
      en: ["Change the density of the block.", "Observe if it floats or sinks."], 
      ms: ["Ubah ketumpatan blok.", "Perhatikan jika ia terapung atau tenggelam."] 
    },
    conclusion: { 
      en: "Objects denser than water sink; less dense objects float.", 
      ms: "Objek lebih tumpat dari air akan tenggelam; kurang tumpat akan terapung." 
    },
    simulation: {
      type: 'density',
      defaultValues: { objDensity: 0.8 },
      labels: { objDensity: "Density (g/cm³)" },
      minMax: { objDensity: [0.1, 3.0] }
    }
  },
  {
    id: 'f1-circuit',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Basic Electric Circuit", ms: "Litar Elektrik Asas" },
    objective: { en: "To study the flow of current in a complete circuit.", ms: "Mengkaji aliran arus dalam litar lengkap." },
    variables: {
      manipulated: { en: "Switch State / Voltage", ms: "Keadaan Suis / Voltan" },
      responding: { en: "Brightness of Bulb", ms: "Kecerahan Mentol" },
      controlled: { en: "Type of Bulb", ms: "Jenis Mentol" }
    },
    steps: { 
      en: ["Close the switch to complete the circuit.", "Add more batteries to increase voltage."], 
      ms: ["Tutup suis untuk melengkapkan litar.", "Tambah bateri untuk meningkatkan voltan."] 
    },
    conclusion: { 
      en: "Current flows in a complete circuit, lighting the bulb. Higher voltage increases brightness.", 
      ms: "Arus mengalir dalam litar lengkap, menyalakan mentol. Voltan lebih tinggi meningkatkan kecerahan." 
    },
    simulation: {
      type: 'circuit',
      defaultValues: { switch: 0, batteries: 1 },
      labels: { switch: "Switch (0=Off, 1=On)", batteries: "Batteries" },
      minMax: { switch: [0, 1], batteries: [1, 3] }
    }
  },
  {
    id: 'f1-shadow',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Light & Shadows", ms: "Cahaya & Bayang-bayang" },
    objective: { 
      en: "To study the relationship between object distance and shadow size.", 
      ms: "Mengkaji hubungan antara jarak objek dan saiz bayang-bayang." 
    },
    variables: {
      manipulated: { en: "Distance of object from light source", ms: "Jarak objek dari sumber cahaya" },
      responding: { en: "Size of shadow", ms: "Saiz bayang-bayang" },
      controlled: { en: "Size of object", ms: "Saiz objek" }
    },
    steps: {
      en: ["Turn on the light source.", "Move the object closer or further from the light.", "Observe the shadow height on the wall."],
      ms: ["Hidupkan sumber cahaya.", "Gerakkan objek mendekati atau menjauhi cahaya.", "Perhatikan ketinggian bayang-bayang di dinding."]
    },
    conclusion: {
      en: "The closer the object is to the light source, the larger the shadow.",
      ms: "Semakin dekat objek dengan sumber cahaya, semakin besar bayang-bayang."
    },
    simulation: {
      type: 'shadow',
      defaultValues: { distance: 50 },
      labels: { distance: "Distance (cm)" },
      minMax: { distance: [10, 90] }
    }
  },
  
  // --- FORM 2 ---
  {
    id: 'f2-food',
    form: FormLevel.Form2,
    subject: 'General',
    title: { en: "Food Tests", ms: "Ujian Makanan" },
    objective: { en: "To test for starch, glucose, protein, and fat.", ms: "Menguji kehadiran kanji, glukosa, protein, dan lemak." },
    variables: {
      manipulated: { en: "Food Sample & Reagent", ms: "Sampel Makanan & Reagen" },
      responding: { en: "Color Change", ms: "Perubahan Warna" },
      controlled: { en: "Volume of reagent", ms: "Isipadu reagen" }
    },
    steps: { 
      en: ["Select a food sample.", "Select a chemical reagent.", "Observe the final color."], 
      ms: ["Pilih sampel makanan.", "Pilih reagen kimia.", "Perhatikan warna akhir."] 
    },
    conclusion: { 
      en: "Iodine tests starch (Blue-Black), Benedict tests glucose (Brick Red), Millon tests protein (Red), Alcohol tests fat (Cloudy).", 
      ms: "Iodin menguji kanji (Biru-Hitam), Benedict menguji glukosa (Merah Bata), Millon menguji protein (Merah), Alkohol menguji lemak (Keruh)." 
    },
    simulation: {
      type: 'foodTest',
      defaultValues: { food: 0, reagent: 0 },
      labels: { 
        food: "Food (0:Bread, 1:Apple, 2:Egg, 3:Oil)", 
        reagent: "Reagent (0:Iodine, 1:Benedict, 2:Millon, 3:Ethanol)" 
      },
      minMax: { food: [0, 3], reagent: [0, 3] }
    }
  },
  {
    id: 'f2-diffusion',
    form: FormLevel.Form2,
    subject: 'General',
    title: { en: "Absorption (Visking Tubing)", ms: "Penyerapan (Tiub Visking)" },
    objective: { en: "To simulate absorption of digested food in the small intestine.", ms: "Mensimulasikan penyerapan makanan tercerna di usus kecil." },
    variables: {
      manipulated: { en: "Time", ms: "Masa" },
      responding: { en: "Movement of particles", ms: "Pergerakan zarah" },
      controlled: { en: "Pore size of membrane", ms: "Saiz liang membran" }
    },
    steps: { 
      en: ["Observe the Visking tubing containing starch (large) and glucose (small).", "Wait for time to pass.", "Observe which particles cross the membrane."], 
      ms: ["Perhatikan tiub Visking berisi kanji (besar) dan glukosa (kecil).", "Tunggu masa berlalu.", "Perhatikan zarah mana yang menembusi membran."] 
    },
    conclusion: { 
      en: "Small molecules (glucose) diffuse through the semi-permeable membrane, while large molecules (starch) cannot.", 
      ms: "Molekul kecil (glukosa) meresap melalui membran telap memilih, manakala molekul besar (kanji) tidak boleh." 
    },
    simulation: {
      type: 'diffusion',
      defaultValues: { time: 0 },
      labels: { time: "Time (mins)" },
      minMax: { time: [0, 60] }
    }
  },
  {
    id: 'f2-solubility',
    form: FormLevel.Form2,
    subject: 'General',
    title: { en: "Factors Affecting Solubility", ms: "Faktor Mempengaruhi Keterlarutan" },
    objective: { en: "To study how temperature and stirring affect dissolving rate.", ms: "Mengkaji bagaimana suhu dan adukan mempengaruhi kadar pelarutan." },
    variables: {
      manipulated: { en: "Temperature & Stirring Rate", ms: "Suhu & Kadar Adukan" },
      responding: { en: "Rate of dissolving", ms: "Kadar pelarutan" },
      controlled: { en: "Size of solute", ms: "Saiz zat terlarut" }
    },
    steps: { 
      en: ["Adjust water temperature.", "Increase stirring speed.", "Observe how fast the solute dissolves."], 
      ms: ["Laraskan suhu air.", "Tingkatkan kelajuan mengaduk.", "Perhatikan betapa cepat zat terlarut larut."] 
    },
    conclusion: { 
      en: "Higher temperature and faster stirring increase the rate of solubility.", 
      ms: "Suhu yang lebih tinggi dan adukan yang lebih pantas meningkatkan kadar keterlarutan." 
    },
    simulation: {
      type: 'solubility',
      defaultValues: { temp: 25, stir: 0 },
      labels: { temp: "Temperature (°C)", stir: "Stirring Speed" },
      minMax: { temp: [0, 100], stir: [0, 10] }
    }
  },
  {
    id: 'f2-electromagnet',
    form: FormLevel.Form2,
    subject: 'Physics',
    title: { en: "Electromagnetism", ms: "Elektromagnet" },
    objective: { en: "To study factors affecting the strength of an electromagnet.", ms: "Mengkaji faktor yang mempengaruhi kekuatan elektromagnet." },
    variables: {
      manipulated: { en: "Number of turns / Current", ms: "Bilangan lilitan / Arus" },
      responding: { en: "Number of paper clips attracted", ms: "Bilangan klip kertas ditarik" },
      controlled: { en: "Type of core", ms: "Jenis teras" }
    },
    steps: { 
      en: ["Increase the number of wire turns.", "Increase the battery voltage.", "Count how many paper clips are picked up."], 
      ms: ["Tambah bilangan lilitan wayar.", "Tingkatkan voltan bateri.", "Kira berapa banyak klip kertas yang ditarik."] 
    },
    conclusion: { 
      en: "The strength of the magnetic field increases with more turns of wire and higher current.", 
      ms: "Kekuatan medan magnet bertambah dengan bilangan lilitan wayar dan arus yang lebih tinggi." 
    },
    simulation: {
      type: 'electromagnet',
      defaultValues: { turns: 5, voltage: 1 },
      labels: { turns: "Wire Turns (N)", voltage: "Voltage (V)" },
      minMax: { turns: [5, 20], voltage: [1, 5] }
    }
  },
  {
    id: 'f2-acid',
    form: FormLevel.Form2,
    subject: 'General',
    title: { en: "Acids & Alkalis", ms: "Asid & Alkali" },
    objective: { en: "To determine pH value and color change.", ms: "Menentukan nilai pH dan perubahan warna." },
    variables: {
      manipulated: { en: "pH Value", ms: "Nilai pH" },
      responding: { en: "Color of indicator", ms: "Warna penunjuk" },
      controlled: { en: "Volume of solution", ms: "Isipadu larutan" }
    },
    steps: { en: ["Drag slider to change pH.", "Observe the color of the solution in the beaker."], ms: ["Laraskan peluncur untuk ubah pH.", "Perhatikan warna larutan di dalam bikar."] },
    conclusion: { en: "Acidic is red/orange, Neutral is green, Alkali is purple/blue.", ms: "Asid berwarna merah/oren, Neutral hijau, Alkali ungu/biru." },
    simulation: {
      type: 'ph',
      defaultValues: { ph: 7 },
      labels: { ph: "pH Level" },
      minMax: { ph: [0, 14] }
    }
  },

  // --- FORM 3 ---
  {
    id: 'f3-tropism',
    form: FormLevel.Form3,
    subject: 'Biology',
    title: { en: "Plant Tropism", ms: "Tropisme Tumbuhan" },
    objective: { en: "To study the response of shoots to light.", ms: "Mengkaji gerak balas pucuk terhadap cahaya." },
    variables: {
      manipulated: { en: "Direction of Light", ms: "Arah Cahaya" },
      responding: { en: "Growth direction of shoot", ms: "Arah pertumbuhan pucuk" },
      controlled: { en: "Type of seedlings", ms: "Jenis anak benih" }
    },
    steps: { 
      en: ["Move the light source to different angles.", "Observe the direction the plant bends."], 
      ms: ["Gerakkan sumber cahaya ke sudut berbeza.", "Perhatikan arah tumbuhan membengkok."] 
    },
    conclusion: { 
      en: "Shoots show positive phototropism by growing towards the light source.", 
      ms: "Pucuk menunjukkan fototropisme positif dengan tumbuh ke arah sumber cahaya." 
    },
    simulation: {
      type: 'tropism',
      defaultValues: { angle: 90 }, // 0=Left, 90=Top, 180=Right
      labels: { angle: "Light Angle (°)" },
      minMax: { angle: [20, 160] }
    }
  },
  {
    id: 'f3-respiration',
    form: FormLevel.Form3,
    subject: 'Biology',
    title: { en: "Respiration Model", ms: "Model Respirasi" },
    objective: { en: "To understand the mechanism of breathing using a Bell Jar model.", ms: "Memahami mekanisme pernafasan menggunakan model Balang Loceng." },
    variables: {
      manipulated: { en: "Diaphragm Position", ms: "Kedudukan Diafragma" },
      responding: { en: "Volume of Balloons (Lungs)", ms: "Isipadu Belon (Peparu)" },
      controlled: { en: "Size of Bell Jar", ms: "Saiz Balang Loceng" }
    },
    steps: { 
      en: ["Pull the rubber sheet (diaphragm) down.", "Observe the balloons inflating.", "Push the diaphragm up and observe."], 
      ms: ["Tarik kepingan getah (diafragma) ke bawah.", "Perhatikan belon mengembang.", "Tolak diafragma ke atas dan perhatikan."] 
    },
    conclusion: { 
      en: "When the diaphragm moves down, volume increases, pressure decreases, and air enters the lungs.", 
      ms: "Apabila diafragma bergerak ke bawah, isipadu bertambah, tekanan berkurang, dan udara masuk ke dalam peparu." 
    },
    simulation: {
      type: 'respiration',
      defaultValues: { diaphragm: 0 }, // 0=Relaxed, 1=Contracted (Down)
      labels: { diaphragm: "Diaphragm (Pull Down)" },
      minMax: { diaphragm: [0, 1] }
    }
  },
  {
    id: 'f3-transpiration',
    form: FormLevel.Form3,
    subject: 'Biology',
    title: { en: "Transpiration Rate", ms: "Kadar Transpirasi" },
    objective: { en: "To study factors affecting the rate of transpiration.", ms: "Mengkaji faktor yang mempengaruhi kadar transpirasi." },
    variables: {
      manipulated: { en: "Air Movement (Wind)", ms: "Pergerakan Udara (Angin)" },
      responding: { en: "Speed of air bubble movement", ms: "Kelajuan pergerakan gelembung udara" },
      controlled: { en: "Type of plant", ms: "Jenis tumbuhan" }
    },
    steps: { 
      en: ["Increase the wind speed.", "Observe how fast the air bubble moves in the capillary tube."], 
      ms: ["Tingkatkan kelajuan angin.", "Perhatikan betapa cepat gelembung udara bergerak dalam tiub kapilari."] 
    },
    conclusion: { 
      en: "Higher air movement (wind) increases the rate of transpiration.", 
      ms: "Pergerakan udara (angin) yang lebih tinggi meningkatkan kadar transpirasi." 
    },
    simulation: {
      type: 'transpiration',
      defaultValues: { wind: 0 },
      labels: { wind: "Wind Speed" },
      minMax: { wind: [0, 10] }
    }
  },
  {
    id: 'f3-heart',
    form: FormLevel.Form3,
    subject: 'Biology',
    title: { en: "Human Heart Beat", ms: "Denyutan Jantung Manusia" },
    objective: { en: "To observe the pumping action of the heart.", ms: "Memerhati tindakan pengepaman jantung." },
    variables: {
      manipulated: { en: "Physical Activity Level", ms: "Tahap Aktiviti Fizikal" },
      responding: { en: "Heart Rate (BPM)", ms: "Kadar Denyutan Jantung (BPM)" },
      controlled: { en: "Person", ms: "Orang" }
    },
    steps: { 
      en: ["Adjust activity level from resting to running.", "Observe the speed of the heart pumping."], 
      ms: ["Laraskan tahap aktiviti dari berehat ke berlari.", "Perhatikan kelajuan jantung mengepam."] 
    },
    conclusion: { 
      en: "The heart pumps faster during vigorous activity to supply more oxygen to the body.", 
      ms: "Jantung mengepam lebih cepat semasa aktiviti cergas untuk membekalkan lebih banyak oksigen ke badan." 
    },
    simulation: {
      type: 'heart',
      defaultValues: { activity: 0 }, // 0=Rest, 1=Run
      labels: { activity: "Activity Intensity" },
      minMax: { activity: [0, 10] }
    }
  },
  {
    id: 'f3-exoendo',
    form: FormLevel.Form3,
    subject: 'Chemistry',
    title: { en: "Exothermic & Endothermic", ms: "Eksotermik & Endotermik" },
    objective: { en: "To distinguish between exothermic and endothermic reactions.", ms: "Membezakan antara tindak balas eksotermik dan endotermik." },
    variables: {
      manipulated: { en: "Type of Chemical", ms: "Jenis Bahan Kimia" },
      responding: { en: "Change in Temperature", ms: "Perubahan Suhu" },
      controlled: { en: "Volume of Water", ms: "Isipadu Air" }
    },
    steps: { 
      en: ["Select a chemical.", "Observe the temperature reading on the thermometer.", "Determine if heat is released or absorbed."], 
      ms: ["Pilih bahan kimia.", "Perhatikan bacaan suhu pada termometer.", "Tentukan jika haba dibebaskan atau diserap."] 
    },
    conclusion: { 
      en: "Exothermic reactions release heat (temp rises), Endothermic reactions absorb heat (temp falls).", 
      ms: "Tindak balas eksotermik membebaskan haba (suhu naik), endotermik menyerap haba (suhu turun)." 
    },
    simulation: {
      type: 'exoEndo',
      defaultValues: { chemical: 0 }, // 0: NaOH (Exo), 1: NH4NO3 (Endo)
      labels: { chemical: "Chemical (0:NaOH, 1:NH4NO3)" },
      minMax: { chemical: [0, 1] }
    }
  },
  {
    id: 'f3-circuitsp',
    form: FormLevel.Form3,
    subject: 'Physics',
    title: { en: "Series vs Parallel", ms: "Siri vs Selari" },
    objective: { en: "To compare brightness of bulbs in series and parallel circuits.", ms: "Membandingkan kecerahan mentol dalam litar siri dan selari." },
    variables: {
      manipulated: { en: "Type of Circuit", ms: "Jenis Litar" },
      responding: { en: "Brightness of Bulbs", ms: "Kecerahan Mentol" },
      controlled: { en: "Voltage supply", ms: "Bekalan voltan" }
    },
    steps: { 
      en: ["Toggle between Series and Parallel circuit.", "Observe the brightness of the bulbs."], 
      ms: ["Tukar antara litar Siri dan Selari.", "Perhatikan kecerahan mentol."] 
    },
    conclusion: { 
      en: "Bulbs in parallel are brighter than bulbs in series because they receive the full voltage.", 
      ms: "Mentol dalam litar selari lebih cerah berbanding litar siri kerana menerima voltan penuh." 
    },
    simulation: {
      type: 'circuitSP',
      defaultValues: { type: 0 }, // 0: Series, 1: Parallel
      labels: { type: "Circuit Type (0:Series, 1:Parallel)" },
      minMax: { type: [0, 1] }
    }
  },
  {
    id: 'f3-transformer',
    form: FormLevel.Form3,
    subject: 'Physics',
    title: { en: "Transformer", ms: "Transformer" },
    objective: { en: "To study the relationship between number of turns and voltage.", ms: "Mengkaji hubungan antara bilangan lilitan dan voltan." },
    variables: {
      manipulated: { en: "Ratio of Turns (Secondary/Primary)", ms: "Nisbah Lilitan (Sekunder/Primer)" },
      responding: { en: "Output Voltage", ms: "Voltan Output" },
      controlled: { en: "Input Voltage", ms: "Voltan Input" }
    },
    steps: { 
      en: ["Adjust the number of turns in the secondary coil.", "Observe the change in the voltmeter reading."], 
      ms: ["Laraskan bilangan lilitan dalam gegelung sekunder.", "Perhatikan perubahan bacaan voltmeter."] 
    },
    conclusion: { 
      en: "If secondary turns > primary turns, voltage increases (Step-up). If less, voltage decreases (Step-down).", 
      ms: "Jika lilitan sekunder > lilitan primer, voltan meningkat (Injak Naik). Jika kurang, voltan menurun (Injak Turun)." 
    },
    simulation: {
      type: 'transformer',
      defaultValues: { turnsRatio: 1 },
      labels: { turnsRatio: "Sec. Turns Ratio (0.5x to 2x)" },
      minMax: { turnsRatio: [0.5, 2.0] }
    }
  },
  {
    id: 'f3-photo',
    form: FormLevel.Form3,
    subject: 'General',
    title: { en: "Photosynthesis Rate", ms: "Kadar Fotosintesis" },
    objective: { en: "To study effect of light intensity on photosynthesis.", ms: "Mengkaji kesan keamatan cahaya ke atas fotosintesis." },
    variables: {
      manipulated: { en: "Light Intensity", ms: "Keamatan Cahaya" },
      responding: { en: "Number of bubbles", ms: "Bilangan gelembung" },
      controlled: { en: "CO2 concentration", ms: "Kepekatan CO2" }
    },
    steps: { en: ["Increase light intensity.", "Count bubbles released by the plant."], ms: ["Tingkatkan keamatan cahaya.", "Kira gelembung yang dibebaskan oleh tumbuhan."] },
    conclusion: { en: "Higher light intensity increases the rate of photosynthesis.", ms: "Keamatan cahaya yang tinggi meningkatkan kadar fotosintesis." },
    simulation: {
      type: 'growth',
      defaultValues: { light: 20 },
      labels: { light: "Light Intensity (%)" },
      minMax: { light: [0, 100] }
    }
  },

  // --- FORM 4 PHYSICS ---
  {
    id: 'f4-refraction',
    form: FormLevel.Form4,
    subject: 'Physics',
    title: { en: "Refraction of Light", ms: "Pembiasan Cahaya" },
    objective: { en: "To observe bending of light through glass.", ms: "Memerhati pembengkokan cahaya melalui kaca." },
    variables: {
      manipulated: { en: "Angle of Incidence", ms: "Sudut Tuju" },
      responding: { en: "Angle of Refraction", ms: "Sudut Biasan" },
      controlled: { en: "Refractive index of block", ms: "Indeks biasan blok" }
    },
    steps: { en: ["Change the angle of the light ray.", "Observe how the ray bends inside the block."], ms: ["Ubah sudut sinar cahaya.", "Perhatikan bagaimana sinar membengkok di dalam blok."] },
    conclusion: { en: "Light bends towards the normal when entering a denser medium.", ms: "Cahaya membengkok mendekati garis normal apabila memasuki medium lebih tumpat." },
    simulation: {
      type: 'lens',
      defaultValues: { angle: 45, density: 1.5 },
      labels: { angle: "Incidence Angle (°)", density: "Refractive Index (n)" },
      minMax: { angle: [0, 80], density: [1.0, 2.5] }
    }
  },
  {
    id: 'f4-density',
    form: FormLevel.Form4,
    subject: 'Physics',
    title: { en: "Density & Flotation", ms: "Ketumpatan & Keapungan" },
    objective: { en: "To understand why objects float or sink.", ms: "Memahami mengapa objek terapung atau tenggelam." },
    variables: {
      manipulated: { en: "Density of Object", ms: "Ketumpatan Objek" },
      responding: { en: "Float/Sink Level", ms: "Tahap Apungan/Tenggelam" },
      controlled: { en: "Density of Liquid", ms: "Ketumpatan Cecair" }
    },
    steps: { en: ["Adjust object density.", "See if it floats or sinks in water (1 g/cm³)."], ms: ["Laraskan ketumpatan objek.", "Lihat jika ia terapung atau tenggelam dalam air (1 g/cm³)."] },
    conclusion: { en: "Objects with density < 1 float, > 1 sink.", ms: "Objek ketumpatan < 1 terapung, > 1 tenggelam." },
    simulation: {
      type: 'density',
      defaultValues: { objDensity: 0.5 },
      labels: { objDensity: "Object Density (g/cm³)" },
      minMax: { objDensity: [0.1, 3.0] }
    }
  },

  // --- FORM 4 BIOLOGY ---
  {
    id: 'f4-osmosis',
    form: FormLevel.Form4,
    subject: 'Biology',
    title: { en: "Osmosis in Plant Cells", ms: "Osmosis dalam Sel Tumbuhan" },
    objective: { en: "To study the effect of hypotonic, isotonic, and hypertonic solutions on plant cells.", ms: "Mengkaji kesan larutan hipotonik, isotonik, dan hipertonik ke atas sel tumbuhan." },
    variables: {
      manipulated: { en: "Concentration of Solution", ms: "Kepekatan Larutan" },
      responding: { en: "Condition of Cell (Turgid/Flaccid/Plasmolysed)", ms: "Keadaan Sel (Segah/Flasiid/Plasmolisis)" },
      controlled: { en: "Type of plant cell", ms: "Jenis sel tumbuhan" }
    },
    steps: { 
      en: ["Adjust solution concentration.", "Observe the size of the vacuole and cytoplasm."], 
      ms: ["Laraskan kepekatan larutan.", "Perhatikan saiz vakuol dan sitoplasma."] 
    },
    conclusion: { 
      en: "Hypotonic solution causes turgidity; Hypertonic solution causes plasmolysis.", 
      ms: "Larutan hipotonik menyebabkan kesegahan; Larutan hipertonik menyebabkan plasmolisis." 
    },
    simulation: {
      type: 'osmosis',
      defaultValues: { concentration: 0.5 }, // 0=Hypo (water), 0.5=Iso, 1=Hyper (Salt)
      labels: { concentration: "Sol. Conc. (Low=Hypo, High=Hyper)" },
      minMax: { concentration: [0, 1] }
    }
  },
  {
    id: 'f4-enzyme',
    form: FormLevel.Form4,
    subject: 'Biology',
    title: { en: "Enzyme Activity (Temperature)", ms: "Aktiviti Enzim (Suhu)" },
    objective: { en: "To study the effect of temperature on the rate of enzyme reaction.", ms: "Mengkaji kesan suhu ke atas kadar tindak balas enzim." },
    variables: {
      manipulated: { en: "Temperature", ms: "Suhu" },
      responding: { en: "Rate of Reaction", ms: "Kadar Tindak Balas" },
      controlled: { en: "pH and Enzyme Concentration", ms: "pH dan Kepekatan Enzim" }
    },
    steps: { 
      en: ["Change the temperature slider.", "Observe how fast the enzymes break down the substrate.", "Note what happens at very high temperatures."], 
      ms: ["Ubah peluncur suhu.", "Perhatikan betapa cepat enzim menguraikan substrat.", "Perhatikan apa yang berlaku pada suhu sangat tinggi."] 
    },
    conclusion: { 
      en: "Enzyme activity increases with temp until optimal (37°C), then decreases as enzymes denature.", 
      ms: "Aktiviti enzim meningkat dengan suhu sehingga optimum (37°C), kemudian menurun kerana enzim ternyahasli." 
    },
    simulation: {
      type: 'enzyme',
      defaultValues: { temp: 37 },
      labels: { temp: "Temperature (°C)" },
      minMax: { temp: [0, 70] }
    }
  },
  {
    id: 'f4-yeast',
    form: FormLevel.Form4,
    subject: 'Biology',
    title: { en: "Anaerobic Respiration (Yeast)", ms: "Respirasi Anaerob (Yis)" },
    objective: { en: "To study fermentation by yeast.", ms: "Mengkaji penapaian oleh yis." },
    variables: {
      manipulated: { en: "Glucose Concentration", ms: "Kepekatan Glukosa" },
      responding: { en: "Size of Balloon (CO2 produced)", ms: "Saiz Belon (CO2 terhasil)" },
      controlled: { en: "Volume of Yeast Suspension", ms: "Isipadu Ampaian Yis" }
    },
    steps: { 
      en: ["Add more glucose to the yeast mixture.", "Observe the rate of bubbles and balloon inflation."], 
      ms: ["Tambah lebih banyak glukosa ke dalam campuran yis.", "Perhatikan kadar gelembung dan pengembangan belon."] 
    },
    conclusion: { 
      en: "Yeast carries out anaerobic respiration to produce ethanol, carbon dioxide, and energy.", 
      ms: "Yis menjalankan respirasi anaerob untuk menghasilkan etanol, karbon dioksida, dan tenaga." 
    },
    simulation: {
      type: 'yeast',
      defaultValues: { glucose: 5 },
      labels: { glucose: "Glucose (%)" },
      minMax: { glucose: [0, 10] }
    }
  },
  {
    id: 'f4-calorimetry',
    form: FormLevel.Form4,
    subject: 'Biology',
    title: { en: "Energy Value of Food", ms: "Nilai Tenaga Makanan" },
    objective: { en: "To determine the energy value of different food samples.", ms: "Menentukan nilai tenaga bagi sampel makanan yang berbeza." },
    variables: {
      manipulated: { en: "Type of Food", ms: "Jenis Makanan" },
      responding: { en: "Temperature rise of water", ms: "Kenaikan suhu air" },
      controlled: { en: "Volume of water", ms: "Isipadu air" }
    },
    steps: { 
      en: ["Select a food sample (Peanut/Bread/Anchovy).", "Burn it under the test tube.", "Observe the final temperature rise."], 
      ms: ["Pilih sampel makanan (Kacang/Roti/Ikan Bilis).", "Bakar di bawah tabung uji.", "Perhatikan kenaikan suhu akhir."] 
    },
    conclusion: { 
      en: "Peanuts (lipids) contain more energy per gram compared to bread (carbohydrates).", 
      ms: "Kacang (lipid) mengandungi lebih banyak tenaga per gram berbanding roti (karbohidrat)." 
    },
    simulation: {
      type: 'calorimetry',
      defaultValues: { foodType: 0 }, // 0: Peanut, 1: Bread, 2: Anchovy
      labels: { foodType: "Food: 0=Peanut, 1=Bread, 2=Anchovy" },
      minMax: { foodType: [0, 2] }
    }
  },

  // --- FORM 4 CHEMISTRY ---
  {
    id: 'f4-neutralization',
    form: FormLevel.Form4,
    subject: 'Chemistry',
    title: { en: "Neutralization (Titration)", ms: "Peneutralan (Pentitratan)" },
    objective: { en: "To determine the endpoint of acid-base titration.", ms: "Menentukan takat akhir pentitratan asid-bes." },
    variables: {
      manipulated: { en: "Volume of Acid added", ms: "Isipadu Asid ditambah" },
      responding: { en: "Color of Phenolphthalein", ms: "Warna Fenolftalein" },
      controlled: { en: "Volume of Alkali", ms: "Isipadu Alkali" }
    },
    steps: { 
      en: ["Add acid from burette to the alkali with phenolphthalein.", "Observe color change from pink to colorless.", "Stop when color disappears."], 
      ms: ["Tambah asid dari buret ke dalam alkali yang mengandungi fenolftalein.", "Perhatikan perubahan warna dari merah jambu ke tanpa warna.", "Hentikan apabila warna hilang."] 
    },
    conclusion: { 
      en: "At the endpoint, all alkali is neutralized by acid, changing the indicator color.", 
      ms: "Pada takat akhir, semua alkali dineutralkan oleh asid, mengubah warna penunjuk." 
    },
    simulation: {
      type: 'titration',
      defaultValues: { vol: 0 },
      labels: { vol: "Volume Acid (ml)" },
      minMax: { vol: [0, 50] }
    }
  },
  {
    id: 'f4-electrolysis',
    form: FormLevel.Form4,
    subject: 'Chemistry',
    title: { en: "Electrolysis Molten PbBr2", ms: "Elektrolisis Leburan PbBr2" },
    objective: { en: "To study products at anode and cathode.", ms: "Mengkaji hasil pada anod dan katod." },
    variables: {
      manipulated: { en: "Switch State", ms: "Keadaan Suis" },
      responding: { en: "Products formed", ms: "Hasil terbentuk" },
      controlled: { en: "Electrolyte", ms: "Elektrolit" }
    },
    steps: { 
      en: ["Turn on the switch.", "Observe brown gas at Anode and grey solid at Cathode."], 
      ms: ["Hidupkan suis.", "Perhatikan gas perang di Anod dan pepejal kelabu di Katod."] 
    },
    conclusion: { 
      en: "Bromide ions discharge at Anode (Bromine gas). Lead ions discharge at Cathode (Lead metal).", 
      ms: "Ion bromida dinyahcas pada Anod (Gas Bromin). Ion plumbum dinyahcas pada Katod (Logam Plumbum)." 
    },
    simulation: {
      type: 'electrolysis',
      defaultValues: { switch: 0 },
      labels: { switch: "Switch (0=Off, 1=On)" },
      minMax: { switch: [0, 1] }
    }
  },
  {
    id: 'f4-rate-conc',
    form: FormLevel.Form4,
    subject: 'Chemistry',
    title: { en: "Rate of Reaction (Concentration)", ms: "Kadar Tindak Balas (Kepekatan)" },
    objective: { en: "To study effect of concentration on reaction rate (Sodium Thiosulphate + Acid).", ms: "Mengkaji kesan kepekatan ke atas kadar tindak balas (Natrium Tiosulfat + Asid)." },
    variables: {
      manipulated: { en: "Concentration of Thiosulphate", ms: "Kepekatan Tiosulfat" },
      responding: { en: "Time for 'X' to disappear", ms: "Masa untuk tanda 'X' hilang" },
      controlled: { en: "Temperature", ms: "Suhu" }
    },
    steps: { 
      en: ["Increase concentration.", "Observe how fast the solution turns cloudy (Sulfur precipitate)."], 
      ms: ["Tingkatkan kepekatan.", "Perhatikan betapa cepat larutan menjadi keruh (mendakan Sulfur)."] 
    },
    conclusion: { 
      en: "Higher concentration increases the number of particles per unit volume, increasing collision frequency and reaction rate.", 
      ms: "Kepekatan lebih tinggi meningkatkan bilangan zarah per unit isipadu, meningkatkan frekuensi perlanggaran dan kadar tindak balas." 
    },
    simulation: {
      type: 'rateConc',
      defaultValues: { conc: 0.1 },
      labels: { conc: "Concentration (mol/dm³)" },
      minMax: { conc: [0.05, 0.25] }
    }
  },
  {
    id: 'f4-latex',
    form: FormLevel.Form4,
    subject: 'Chemistry',
    title: { en: "Coagulation of Latex", ms: "Penggumpalan Lateks" },
    objective: { en: "To investigate the effect of acid and alkali on latex.", ms: "Mengkaji kesan asid dan alkali ke atas lateks." },
    variables: {
      manipulated: { en: "Substance Added", ms: "Bahan Ditambah" },
      responding: { en: "State of Latex (Liquid/Solid)", ms: "Keadaan Lateks (Cecair/Pepejal)" },
      controlled: { en: "Volume of Latex", ms: "Isipadu Lateks" }
    },
    steps: { 
      en: ["Add Acid to Latex -> Coagulates.", "Add Alkali to Latex -> Remains Liquid."], 
      ms: ["Tambah Asid ke Lateks -> Menggumpal.", "Tambah Alkali ke Lateks -> Kekal Cecair."] 
    },
    conclusion: { 
      en: "Acid neutralizes negative charges on rubber particles causing coagulation. Alkali prevents this.", 
      ms: "Asid meneutralkan cas negatif pada zarah getah menyebabkan penggumpalan. Alkali menghalangnya." 
    },
    simulation: {
      type: 'latex',
      defaultValues: { substance: 0 }, // 0: None, 1: Acid, 2: Alkali
      labels: { substance: "Add: 0=None, 1=Acid, 2=Alkali" },
      minMax: { substance: [0, 2] }
    }
  },

  // --- FORM 5 BIOLOGY ---
  {
    id: 'f5-bio-inheritance',
    form: FormLevel.Form5,
    subject: 'Biology',
    title: { en: "Inheritance (Monohybrid Cross)", ms: "Pewarisan (Kacukan Monohibrid)" },
    objective: { en: "To simulate Mendel's First Law using pea plants.", ms: "Mensimulasikan Hukum Mendel Pertama menggunakan pokok kacang pea." },
    variables: {
      manipulated: { en: "Parent Genotypes", ms: "Genotip Induk" },
      responding: { en: "Offspring Ratio", ms: "Nisbah Anak" },
      controlled: { en: "Species", ms: "Spesies" }
    },
    steps: { 
      en: ["Select genotype for Parent 1 and Parent 2.", "Observe the resulting phenotype ratio of the offspring."], 
      ms: ["Pilih genotip untuk Induk 1 dan Induk 2.", "Perhatikan nisbah fenotip anak yang terhasil."] 
    },
    conclusion: { 
      en: "Crossing two heterozygous (Tt) parents results in a 3:1 ratio of dominant to recessive phenotypes.", 
      ms: "Kacukan dua induk heterozigot (Tt) menghasilkan nisbah fenotip dominan kepada resesif 3:1." 
    },
    simulation: {
      type: 'inheritance',
      defaultValues: { p1: 1, p2: 1 }, // 0: TT, 1: Tt, 2: tt
      labels: { p1: "Parent 1 (0:TT, 1:Tt, 2:tt)", p2: "Parent 2 (0:TT, 1:Tt, 2:tt)" },
      minMax: { p1: [0, 2], p2: [0, 2] }
    }
  },
  {
    id: 'f5-bio-translocation',
    form: FormLevel.Form5,
    subject: 'Biology',
    title: { en: "Translocation (Bark Ringing)", ms: "Translokasi (Gelang Kulit)" },
    objective: { en: "To demonstrate the function of phloem.", ms: "Menunjukkan fungsi floem." },
    variables: {
      manipulated: { en: "Time elapsed", ms: "Masa berlalu" },
      responding: { en: "Swelling above ring", ms: "Pembengkakan di atas gelang" },
      controlled: { en: "Plant type", ms: "Jenis tumbuhan" }
    },
    steps: { 
      en: ["Observe the stem after the bark containing phloem is removed.", "Advance time to see accumulation of food."], 
      ms: ["Perhatikan batang selepas kulit yang mengandungi floem dibuang.", "Tingkatkan masa untuk melihat pengumpulan makanan."] 
    },
    conclusion: { 
      en: "Phloem transports organic substances downwards. Removing it causes swelling above the ring.", 
      ms: "Floem mengangkut bahan organik ke bawah. Membuangnya menyebabkan pembengkakan di atas gelang." 
    },
    simulation: {
      type: 'translocation',
      defaultValues: { time: 0 },
      labels: { time: "Time (Weeks)" },
      minMax: { time: [0, 4] }
    }
  },
  {
    id: 'f5-bio-pollution',
    form: FormLevel.Form5,
    subject: 'Biology',
    title: { en: "Water Pollution (B.O.D)", ms: "Pencemaran Air (B.O.D)" },
    objective: { en: "To study effect of sewage on dissolved oxygen.", ms: "Mengkaji kesan kumbahan ke atas oksigen terlarut." },
    variables: {
      manipulated: { en: "Sewage Concentration", ms: "Kepekatan Kumbahan" },
      responding: { en: "Biochemical Oxygen Demand (BOD)", ms: "Keperluan Oksigen Biokimia (BOD)" },
      controlled: { en: "Volume of water", ms: "Isipadu air" }
    },
    steps: { 
      en: ["Increase sewage level.", "Observe the algae growth and oxygen levels (fish survival)."], 
      ms: ["Tingkatkan tahap kumbahan.", "Perhatikan pertumbuhan alga dan tahap oksigen (kemandirian ikan)."] 
    },
    conclusion: { 
      en: "High sewage increases bacterial population, reducing dissolved oxygen (High BOD), killing aquatic life.", 
      ms: "Kumbahan tinggi meningkatkan populasi bakteria, mengurangkan oksigen terlarut (BOD Tinggi), membunuh hidupan akuatik." 
    },
    simulation: {
      type: 'pollution',
      defaultValues: { sewage: 0 },
      labels: { sewage: "Pollutant Level" },
      minMax: { sewage: [0, 10] }
    }
  },

  // --- FORM 5 PHYSICS ---
  {
    id: 'f5-phy-elasticity',
    form: FormLevel.Form5,
    subject: 'Physics',
    title: { en: "Elasticity (Hooke's Law)", ms: "Kekenyalan (Hukum Hooke)" },
    objective: { en: "To investigate the relationship between force and extension of a spring.", ms: "Mengkaji hubungan antara daya dan pemanjangan spring." },
    variables: {
      manipulated: { en: "Force (Mass)", ms: "Daya (Jisim)" },
      responding: { en: "Extension", ms: "Pemanjangan" },
      controlled: { en: "Spring Constant", ms: "Pemalar Spring" }
    },
    steps: { 
      en: ["Add mass to the spring.", "Measure the extension produced.", "Calculate the spring constant."], 
      ms: ["Tambah jisim pada spring.", "Ukur pemanjangan yang terhasil.", "Kira pemalar spring."] 
    },
    conclusion: { 
      en: "Extension is directly proportional to the applied force (F = kx), provided the elastic limit is not exceeded.", 
      ms: "Pemanjangan berkadar terus dengan daya yang dikenakan (F = kx), selagi had kenyal tidak dipatuhi." 
    },
    simulation: {
      type: 'elasticity',
      defaultValues: { mass: 0, k: 5 },
      labels: { mass: "Mass (kg)", k: "Spring Stiffness (k)" },
      minMax: { mass: [0, 10], k: [1, 10] }
    }
  },
  {
    id: 'f5-phy-pressure',
    form: FormLevel.Form5,
    subject: 'Physics',
    title: { en: "Liquid Pressure", ms: "Tekanan Cecair" },
    objective: { en: "To study the relationship between depth and liquid pressure.", ms: "Mengkaji hubungan antara kedalaman dan tekanan cecair." },
    variables: {
      manipulated: { en: "Depth", ms: "Kedalaman" },
      responding: { en: "Pressure (Water Jet Distance)", ms: "Tekanan (Jarak Pancutan Air)" },
      controlled: { en: "Density of Liquid", ms: "Ketumpatan Cecair" }
    },
    steps: { 
      en: ["Move the hole deeper into the tank.", "Observe the distance of the water spurt."], 
      ms: ["Gerakkan lubang lebih dalam ke dalam tangki.", "Perhatikan jarak pancutan air."] 
    },
    conclusion: { 
      en: "Pressure increases with depth (P = hρg), causing water to spurt further at greater depths.", 
      ms: "Tekanan meningkat dengan kedalaman (P = hρg), menyebabkan air memancut lebih jauh pada kedalaman lebih tinggi." 
    },
    simulation: {
      type: 'pressure',
      defaultValues: { depth: 10 },
      labels: { depth: "Depth (cm)" },
      minMax: { depth: [10, 90] }
    }
  },
  {
    id: 'f5-phy-decay',
    form: FormLevel.Form5,
    subject: 'Physics',
    title: { en: "Radioactive Decay", ms: "Reputan Radioaktif" },
    objective: { en: "To demonstrate the concept of half-life.", ms: "Menunjukkan konsep separuh hayat." },
    variables: {
      manipulated: { en: "Time", ms: "Masa" },
      responding: { en: "Remaining undecayed atoms", ms: "Atom belum reput yang tinggal" },
      controlled: { en: "Initial number of atoms", ms: "Bilangan atom awal" }
    },
    steps: { 
      en: ["Observe the decay of atoms over time.", "Note the time taken for half the atoms to decay."], 
      ms: ["Perhatikan reputan atom dari masa ke masa.", "Catat masa yang diambil untuk separuh atom mereput."] 
    },
    conclusion: { 
      en: "Radioactive decay is random. The time taken for activity to halve is constant (Half-life).", 
      ms: "Reputan radioaktif adalah rawak. Masa untuk aktiviti menjadi separuh adalah malar (Separuh hayat)." 
    },
    simulation: {
      type: 'decay',
      defaultValues: { halfLife: 5 },
      labels: { halfLife: "Half-Life (s)" },
      minMax: { halfLife: [1, 10] }
    }
  },

  // --- FORM 5 CHEMISTRY ---
  {
    id: 'f5-chem-redox',
    form: FormLevel.Form5,
    subject: 'Chemistry',
    title: { en: "Rusting of Iron", ms: "Pengaratan Besi" },
    objective: { en: "To investigate conditions for rusting.", ms: "Mengkaji syarat untuk pengaratan." },
    variables: {
      manipulated: { en: "Environment Conditions", ms: "Keadaan Persekitaran" },
      responding: { en: "Presence of Rust", ms: "Kehadiran Karat" },
      controlled: { en: "Iron Nail", ms: "Paku Besi" }
    },
    steps: { 
      en: ["Select condition (Air+Water, Dry Air, Boiled Water).", "Wait to see if rust forms."], 
      ms: ["Pilih keadaan (Udara+Air, Udara Kering, Air Didih).", "Tunggu untuk melihat jika karat terbentuk."] 
    },
    conclusion: { 
      en: "Rusting requires both oxygen and water. Salt speeds it up.", 
      ms: "Pengaratan memerlukan kedua-dua oksigen dan air. Garam mempercepatkannya." 
    },
    simulation: {
      type: 'rusting',
      defaultValues: { condition: 0 }, // 0:Normal, 1:Dry, 2:NoO2, 3:Salt
      labels: { condition: "Cond: 0=Tap, 1=Dry, 2=Boiled, 3=Salt" },
      minMax: { condition: [0, 3] }
    }
  },
  {
    id: 'f5-chem-soap',
    form: FormLevel.Form5,
    subject: 'Chemistry',
    title: { en: "Soap Cleansing Action", ms: "Tindakan Pencucian Sabun" },
    objective: { en: "To understand how soap removes grease.", ms: "Memahami bagaimana sabun menanggalkan gris." },
    variables: {
      manipulated: { en: "Presence of Soap", ms: "Kehadiran Sabun" },
      responding: { en: "Grease Removal", ms: "Penanggalan Gris" },
      controlled: { en: "Amount of Grease", ms: "Jumlah Gris" }
    },
    steps: { 
      en: ["Add soap to the water.", "Agitate the mixture.", "Observe the hydrophobic tails attaching to grease."], 
      ms: ["Tambah sabun ke dalam air.", "Goncang campuran.", "Perhatikan ekor hidrofobik melekat pada gris."] 
    },
    conclusion: { 
      en: "Soap molecules reduce surface tension. Hydrophobic tails attach to grease, lifting it into water.", 
      ms: "Molekul sabun mengurangkan ketegangan permukaan. Ekor hidrofobik melekat pada gris, mengangkatnya ke dalam air." 
    },
    simulation: {
      type: 'soap',
      defaultValues: { soap: 0 }, // 0:No, 1:Yes
      labels: { soap: "Add Soap (0=No, 1=Yes)" },
      minMax: { soap: [0, 1] }
    }
  },
  {
    id: 'f5-chem-ester',
    form: FormLevel.Form5,
    subject: 'Chemistry',
    title: { en: "Preparation of Ester", ms: "Penyediaan Ester" },
    objective: { en: "To synthesize ethyl ethanoate.", ms: "Mensintesis etil etanoat." },
    variables: {
      manipulated: { en: "Reactants", ms: "Bahan Tindak Balas" },
      responding: { en: "Smell produced", ms: "Bau terhasil" },
      controlled: { en: "Catalyst (Conc. H2SO4)", ms: "Mangkin (H2SO4 Pekat)" }
    },
    steps: { 
      en: ["Mix Ethanoic Acid and Ethanol.", "Add conc. H2SO4 and heat.", "Note the sweet fruity smell."], 
      ms: ["Campurkan Asid Etanoik dan Etanol.", "Tambah H2SO4 pekat dan panaskan.", "Catat bau buah yang manis."] 
    },
    conclusion: { 
      en: "Alcohol + Carboxylic Acid -> Ester + Water. Esters have sweet smells.", 
      ms: "Alkohol + Asid Karboksilik -> Ester + Air. Ester mempunyai bau manis." 
    },
    simulation: {
      type: 'ester',
      defaultValues: { heat: 0 },
      labels: { heat: "Heat Mixture" },
      minMax: { heat: [0, 10] }
    }
  }
];

export const QUIZZES: Quiz[] = [
  // --- FORM 1 (General) ---
  {
    id: 'quiz-f1-gen',
    form: FormLevel.Form1,
    subject: 'General',
    title: { en: "Form 1 Science Challenge", ms: "Cabaran Sains Tingkatan 1" },
    questions: [
      {
        id: 'q1-cell',
        question: { en: "Which part is present in plant cells but NOT in animal cells?", ms: "Bahagian manakah ada pada sel tumbuhan tetapi TIADA pada sel haiwan?" },
        options: [
          { en: "Nucleus", ms: "Nukleus" },
          { en: "Cell Membrane", ms: "Membran Sel" },
          { en: "Cell Wall", ms: "Dinding Sel" },
          { en: "Cytoplasm", ms: "Sitoplasma" }
        ],
        correctIndex: 2,
        explanation: { en: "Cell walls provide structure and are unique to plant cells.", ms: "Dinding sel memberikan struktur dan unik kepada sel tumbuhan." },
        xp: 10
      },
      {
        id: 'q1-density',
        question: { en: "If an object floats on water, its density is...", ms: "Jika objek terapung di air, ketumpatannya adalah..." },
        options: [
          { en: "Less than 1 g/cm³", ms: "Kurang daripada 1 g/cm³" },
          { en: "More than 1 g/cm³", ms: "Lebih daripada 1 g/cm³" },
          { en: "Equal to 1 g/cm³", ms: "Sama dengan 1 g/cm³" },
          { en: "Zero", ms: "Sifar" }
        ],
        correctIndex: 0,
        explanation: { en: "Objects less dense than the fluid will float.", ms: "Objek yang kurang tumpat daripada cecair akan terapung." },
        xp: 10
      },
      {
        id: 'q1-photo',
        question: { en: "What gas is produced during photosynthesis?", ms: "Apakah gas yang terhasil semasa fotosintesis?" },
        options: [
          { en: "Carbon Dioxide", ms: "Karbon Dioksida" },
          { en: "Oxygen", ms: "Oksigen" },
          { en: "Nitrogen", ms: "Nitrogen" },
          { en: "Hydrogen", ms: "Hidrogen" }
        ],
        correctIndex: 1,
        explanation: { en: "Plants release Oxygen as a byproduct.", ms: "Tumbuhan membebaskan Oksigen sebagai hasil sampingan." },
        xp: 10
      },
      {
        id: 'q1-matter',
        question: { en: "Which state of matter has particles that move freely and fill the container?", ms: "Keadaan jirim manakah mempunyai zarah yang bergerak bebas dan memenuhi bekas?" },
        options: [
          { en: "Solid", ms: "Pepejal" },
          { en: "Liquid", ms: "Cecair" },
          { en: "Gas", ms: "Gas" },
          { en: "Vacuum", ms: "Vakum" }
        ],
        correctIndex: 2,
        explanation: { en: "Gas particles are far apart and move rapidly.", ms: "Zarah gas berada jauh antara satu sama lain dan bergerak pantas." },
        xp: 10
      },
      {
        id: 'q1-light',
        question: { en: "What happens when light is blocked by an opaque object?", ms: "Apakah yang berlaku apabila cahaya dihalang oleh objek legap?" },
        options: [
          { en: "Rainbow forms", ms: "Pelangi terbentuk" },
          { en: "Shadow forms", ms: "Bayang-bayang terbentuk" },
          { en: "Light bends", ms: "Cahaya membengkok" },
          { en: "Nothing", ms: "Tiada apa-apa" }
        ],
        correctIndex: 1,
        explanation: { en: "Shadows are formed when light cannot pass through an object.", ms: "Bayang-bayang terbentuk apabila cahaya tidak dapat menembusi objek." },
        xp: 10
      }
    ]
  },
  
  // --- FORM 2 (General) ---
  {
    id: 'quiz-f2-gen',
    form: FormLevel.Form2,
    subject: 'General',
    title: { en: "Form 2 Science Challenge", ms: "Cabaran Sains Tingkatan 2" },
    questions: [
      {
        id: 'q2-ph',
        question: { en: "A solution with pH 13 is...", ms: "Larutan dengan pH 13 adalah..." },
        options: [
          { en: "Strong Acid", ms: "Asid Kuat" },
          { en: "Neutral", ms: "Neutral" },
          { en: "Strong Alkali", ms: "Alkali Kuat" },
          { en: "Weak Alkali", ms: "Alkali Lemah" }
        ],
        correctIndex: 2,
        explanation: { en: "pH 8-14 indicates alkalinity, with 14 being the strongest.", ms: "pH 8-14 menunjukkan kealkalian, dengan 14 paling kuat." },
        xp: 10
      },
      {
        id: 'q2-food',
        question: { en: "Which reagent tests for the presence of Starch?", ms: "Reagen manakah menguji kehadiran Kanji?" },
        options: [
          { en: "Benedict's Solution", ms: "Larutan Benedict" },
          { en: "Iodine Solution", ms: "Larutan Iodin" },
          { en: "Millon's Reagent", ms: "Reagen Millon" },
          { en: "Ethanol", ms: "Etanol" }
        ],
        correctIndex: 1,
        explanation: { en: "Iodine turns dark blue in the presence of starch.", ms: "Iodin bertukar biru gelap dengan kehadiran kanji." },
        xp: 10
      },
      {
        id: 'q2-force',
        question: { en: "Frictional force acts...", ms: "Daya geseran bertindak..." },
        options: [
          { en: "In the same direction as motion", ms: "Dalam arah sama dengan gerakan" },
          { en: "Opposite to the direction of motion", ms: "Bertentangan dengan arah gerakan" },
          { en: "Perpendicular to motion", ms: "Tegak lurus dengan gerakan" },
          { en: "Only on rough surfaces", ms: "Hanya pada permukaan kasar" }
        ],
        correctIndex: 1,
        explanation: { en: "Friction always opposes motion.", ms: "Geseran sentiasa menentang gerakan." },
        xp: 10
      },
      {
        id: 'q2-solubility',
        question: { en: "Which factor does NOT increase the rate of solubility?", ms: "Faktor manakah TIDAK meningkatkan kadar keterlarutan?" },
        options: [
          { en: "High temperature", ms: "Suhu tinggi" },
          { en: "Stirring", ms: "Mengaduk" },
          { en: "Smaller solute size", ms: "Saiz zat terlarut lebih kecil" },
          { en: "Using less solvent", ms: "Menggunakan kurang pelarut" }
        ],
        correctIndex: 3,
        explanation: { en: "Less solvent reduces capacity to dissolve, not speed up rate.", ms: "Kurang pelarut mengurangkan kapasiti melarut, bukan mempercepatkan kadar." },
        xp: 10
      },
      {
        id: 'q2-circuit',
        question: { en: "In a series circuit, if one bulb blows...", ms: "Dalam litar siri, jika satu mentol terbakar..." },
        options: [
          { en: "Others stay lit", ms: "Yang lain kekal menyala" },
          { en: "Others become brighter", ms: "Yang lain menjadi lebih cerah" },
          { en: "All bulbs go out", ms: "Semua mentol padam" },
          { en: "Battery explodes", ms: "Bateri meletup" }
        ],
        correctIndex: 2,
        explanation: { en: "A break in a series circuit stops current flow everywhere.", ms: "Kerosakan dalam litar siri menghentikan aliran arus di mana-mana." },
        xp: 10
      }
    ]
  },
  
  // --- FORM 3 (General) ---
  {
    id: 'quiz-f3-gen',
    form: FormLevel.Form3,
    subject: 'General',
    title: { en: "Form 3 Science Challenge", ms: "Cabaran Sains Tingkatan 3" },
    questions: [
      {
        id: 'q3-resp',
        question: { en: "During inhalation, the diaphragm...", ms: "Semasa menarik nafas, diafragma..." },
        options: [
          { en: "Relaxes and curves upwards", ms: "Mengendur dan melengkung ke atas" },
          { en: "Contracts and flattens", ms: "Mengecut dan mendatar" },
          { en: "Does not move", ms: "Tidak bergerak" },
          { en: "Vibrates", ms: "Bergetar" }
        ],
        correctIndex: 1,
        explanation: { en: "Contraction flattens the diaphragm, increasing chest volume.", ms: "Pengecutan mendatarkan diafragma, meningkatkan isipadu dada." },
        xp: 10
      },
      {
        id: 'q3-circ',
        question: { en: "Which blood vessel carries oxygenated blood from the lungs to the heart?", ms: "Saluran darah manakah membawa darah beroksigen dari peparu ke jantung?" },
        options: [
          { en: "Pulmonary Artery", ms: "Arteri Pulmonari" },
          { en: "Pulmonary Vein", ms: "Vena Pulmonari" },
          { en: "Aorta", ms: "Aorta" },
          { en: "Vena Cava", ms: "Vena Kava" }
        ],
        correctIndex: 1,
        explanation: { en: "Pulmonary Vein is the only vein carrying oxygenated blood.", ms: "Vena Pulmonari adalah satu-satunya vena membawa darah beroksigen." },
        xp: 10
      },
      {
        id: 'q3-chem',
        question: { en: "Which reaction releases heat to the surroundings?", ms: "Tindak balas manakah membebaskan haba ke persekitaran?" },
        options: [
          { en: "Endothermic", ms: "Endotermik" },
          { en: "Exothermic", ms: "Eksotermik" },
          { en: "Isothermic", ms: "Isotermik" },
          { en: "Hypothermic", ms: "Hipotermik" }
        ],
        correctIndex: 1,
        explanation: { en: "Exothermic reactions release energy as heat.", ms: "Tindak balas eksotermik membebaskan tenaga sebagai haba." },
        xp: 10
      },
      {
        id: 'q3-star',
        question: { en: "The birth of a star occurs in a...", ms: "Kelahiran bintang berlaku di..." },
        options: [
          { en: "Black Hole", ms: "Lubang Hitam" },
          { en: "Nebula", ms: "Nebula" },
          { en: "White Dwarf", ms: "Kerdil Putih" },
          { en: "Supernova", ms: "Supernova" }
        ],
        correctIndex: 1,
        explanation: { en: "Nebula is a giant cloud of dust and gas where stars form.", ms: "Nebula adalah awan debu dan gas raksasa di mana bintang terbentuk." },
        xp: 10
      },
      {
        id: 'q3-trans',
        question: { en: "A step-up transformer...", ms: "Transformer injak naik..." },
        options: [
          { en: "Increases voltage", ms: "Meningkatkan voltan" },
          { en: "Decreases voltage", ms: "Menurunkan voltan" },
          { en: "Increases current", ms: "Meningkatkan arus" },
          { en: "Maintains voltage", ms: "Mengekalkan voltan" }
        ],
        correctIndex: 0,
        explanation: { en: "Step-up transformers increase output voltage.", ms: "Transformer injak naik meningkatkan voltan output." },
        xp: 10
      }
    ]
  },

  // --- FORM 4 (Biology) ---
  {
    id: 'quiz-f4-bio',
    form: FormLevel.Form4,
    subject: 'Biology',
    title: { en: "Form 4 Biology Quiz", ms: "Kuiz Biologi Tingkatan 4" },
    questions: [
      {
        id: 'q4b-enzyme',
        question: { en: "Enzymes are made of...", ms: "Enzim diperbuat daripada..." },
        options: [
          { en: "Carbohydrates", ms: "Karbohidrat" },
          { en: "Proteins", ms: "Protein" },
          { en: "Lipids", ms: "Lipid" },
          { en: "Vitamins", ms: "Vitamin" }
        ],
        correctIndex: 1,
        explanation: { en: "Enzymes are biological catalysts made of protein.", ms: "Enzim adalah mangkin biologi yang diperbuat daripada protein." },
        xp: 15
      },
      {
        id: 'q4b-cell',
        question: { en: "The movement of water across a semi-permeable membrane is...", ms: "Pergerakan air merentas membran telap memilih ialah..." },
        options: [
          { en: "Diffusion", ms: "Resapan" },
          { en: "Active Transport", ms: "Pengangkutan Aktif" },
          { en: "Osmosis", ms: "Osmosis" },
          { en: "Facilitated Diffusion", ms: "Resapan Berbantu" }
        ],
        correctIndex: 2,
        explanation: { en: "Osmosis specifically refers to water movement.", ms: "Osmosis merujuk secara khusus kepada pergerakan air." },
        xp: 15
      },
      {
        id: 'q4b-resp',
        question: { en: "Anaerobic respiration in human muscles produces...", ms: "Respirasi anaerob dalam otot manusia menghasilkan..." },
        options: [
          { en: "Ethanol + CO2", ms: "Etanol + CO2" },
          { en: "Lactic Acid", ms: "Asid Laktik" },
          { en: "Glucose", ms: "Glukosa" },
          { en: "Oxygen", ms: "Oksigen" }
        ],
        correctIndex: 1,
        explanation: { en: "Lactic acid causes muscle fatigue.", ms: "Asid laktik menyebabkan kelelahan otot." },
        xp: 15
      }
    ]
  },

  // --- FORM 4 (Physics) ---
  {
    id: 'quiz-f4-phy',
    form: FormLevel.Form4,
    subject: 'Physics',
    title: { en: "Form 4 Physics Quiz", ms: "Kuiz Fizik Tingkatan 4" },
    questions: [
      {
        id: 'q4p-inertia',
        question: { en: "Inertia is directly related to an object's...", ms: "Inersia berkait secara langsung dengan..." },
        options: [
          { en: "Speed", ms: "Kelajuan" },
          { en: "Mass", ms: "Jisim" },
          { en: "Volume", ms: "Isipadu" },
          { en: "Force", ms: "Daya" }
        ],
        correctIndex: 1,
        explanation: { en: "Larger mass means larger inertia (resistance to change in motion).", ms: "Jisim lebih besar bermakna inersia lebih besar." },
        xp: 15
      },
      {
        id: 'q4p-light',
        question: { en: "When light travels from air to glass, it bends...", ms: "Apabila cahaya bergerak dari udara ke kaca, ia membengkok..." },
        options: [
          { en: "Towards the normal", ms: "Mendekati garis normal" },
          { en: "Away from the normal", ms: "Menjauhi garis normal" },
          { en: "Parallel to the normal", ms: "Selari dengan garis normal" },
          { en: "It reflects back", ms: "Ia memantul kembali" }
        ],
        correctIndex: 0,
        explanation: { en: "Entering a denser medium slows light down, bending it towards normal.", ms: "Memasuki medium lebih tumpat memperlahankan cahaya, membengkokkannya mendekati normal." },
        xp: 15
      }
    ]
  },
  
  // --- FORM 4 (Chemistry) ---
  {
    id: 'quiz-f4-chem',
    form: FormLevel.Form4,
    subject: 'Chemistry',
    title: { en: "Form 4 Chemistry Quiz", ms: "Kuiz Kimia Tingkatan 4" },
    questions: [
      {
        id: 'q4c-mole',
        question: { en: "What is the value of the Avogadro Constant?", ms: "Apakah nilai Pemalar Avogadro?" },
        options: [
          { en: "6.02 x 10^23", ms: "6.02 x 10^23" },
          { en: "3.142", ms: "3.142" },
          { en: "9.81", ms: "9.81" },
          { en: "100", ms: "100" }
        ],
        correctIndex: 0,
        explanation: { en: "One mole of any substance contains 6.02 x 10^23 particles.", ms: "Satu mol sebarang bahan mengandungi 6.02 x 10^23 zarah." },
        xp: 15
      },
      {
        id: 'q4c-bond',
        question: { en: "Ionic bonds are formed by the...", ms: "Ikatan ion terbentuk melalui..." },
        options: [
          { en: "Sharing of electrons", ms: "Perkongsian elektron" },
          { en: "Transfer of electrons", ms: "Pemindahan elektron" },
          { en: "Loss of protons", ms: "Kehilangan proton" },
          { en: "Gain of neutrons", ms: "Penerimaan neutron" }
        ],
        correctIndex: 1,
        explanation: { en: "Metal transfers electrons to non-metal.", ms: "Logam memindahkan elektron kepada bukan logam." },
        xp: 15
      }
    ]
  },

  // --- FORM 5 (Biology) ---
  {
    id: 'quiz-f5-bio',
    form: FormLevel.Form5,
    subject: 'Biology',
    title: { en: "Form 5 Biology Quiz", ms: "Kuiz Biologi Tingkatan 5" },
    questions: [
      {
        id: 'q5b-trans',
        question: { en: "Which tissue transports water in plants?", ms: "Tisu manakah mengangkut air dalam tumbuhan?" },
        options: [
          { en: "Phloem", ms: "Floem" },
          { en: "Xylem", ms: "Xilem" },
          { en: "Cambium", ms: "Kambium" },
          { en: "Epidermis", ms: "Epidermis" }
        ],
        correctIndex: 1,
        explanation: { en: "Xylem transports water and minerals up from roots.", ms: "Xilem mengangkut air dan mineral naik dari akar." },
        xp: 20
      },
      {
        id: 'q5b-inherit',
        question: { en: "What is the phenotypic ratio of a Monohybrid cross (Tt x Tt)?", ms: "Apakah nisbah fenotip kacukan Monohibrid (Tt x Tt)?" },
        options: [
          { en: "1:1", ms: "1:1" },
          { en: "3:1", ms: "3:1" },
          { en: "9:3:3:1", ms: "9:3:3:1" },
          { en: "1:2:1", ms: "1:2:1" }
        ],
        correctIndex: 1,
        explanation: { en: "3 Dominant : 1 Recessive.", ms: "3 Dominan : 1 Resesif." },
        xp: 20
      }
    ]
  },

  // --- FORM 5 (Physics) ---
  {
    id: 'quiz-f5-phy',
    form: FormLevel.Form5,
    subject: 'Physics',
    title: { en: "Form 5 Physics Quiz", ms: "Kuiz Fizik Tingkatan 5" },
    questions: [
      {
        id: 'q5p-pressure',
        question: { en: "Liquid pressure depends on...", ms: "Tekanan cecair bergantung kepada..." },
        options: [
          { en: "Surface Area", ms: "Luas Permukaan" },
          { en: "Depth and Density", ms: "Kedalaman dan Ketumpatan" },
          { en: "Container Shape", ms: "Bentuk Bekas" },
          { en: "Volume", ms: "Isipadu" }
        ],
        correctIndex: 1,
        explanation: { en: "Formula P = hρg.", ms: "Rumus P = hρg." },
        xp: 20
      },
      {
        id: 'q5p-rad',
        question: { en: "Which radiation has the highest penetrating power?", ms: "Sinaran manakah mempunyai kuasa penembusan paling tinggi?" },
        options: [
          { en: "Alpha", ms: "Alfa" },
          { en: "Beta", ms: "Beta" },
          { en: "Gamma", ms: "Gama" },
          { en: "X-ray", ms: "Sinar-X" }
        ],
        correctIndex: 2,
        explanation: { en: "Gamma rays are high energy electromagnetic waves.", ms: "Sinar gama adalah gelombang elektromagnet bertenaga tinggi." },
        xp: 20
      }
    ]
  },

  // --- FORM 5 (Chemistry) ---
  {
    id: 'quiz-f5-chem',
    form: FormLevel.Form5,
    subject: 'Chemistry',
    title: { en: "Form 5 Chemistry Quiz", ms: "Kuiz Kimia Tingkatan 5" },
    questions: [
      {
        id: 'q5c-rust',
        question: { en: "Iron rusts in the presence of...", ms: "Besi berkarat dengan kehadiran..." },
        options: [
          { en: "Water only", ms: "Air sahaja" },
          { en: "Oxygen only", ms: "Oksigen sahaja" },
          { en: "Water and Oxygen", ms: "Air dan Oksigen" },
          { en: "Nitrogen", ms: "Nitrogen" }
        ],
        correctIndex: 2,
        explanation: { en: "Both are required for oxidation of iron.", ms: "Kedua-duanya diperlukan untuk pengoksidaan besi." },
        xp: 20
      },
      {
        id: 'q5c-ester',
        question: { en: "Esters are produced by reacting alcohol with...", ms: "Ester dihasilkan dengan menindakbalaskan alkohol dengan..." },
        options: [
          { en: "Alkali", ms: "Alkali" },
          { en: "Carboxylic Acid", ms: "Asid Karboksilik" },
          { en: "Water", ms: "Air" },
          { en: "Metal", ms: "Logam" }
        ],
        correctIndex: 1,
        explanation: { en: "Process is called Esterification.", ms: "Proses dipanggil Pengesteran." },
        xp: 20
      }
    ]
  }
];
